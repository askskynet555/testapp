const express = require('express');
const app = express();
const sql = require("mssql");
let conn = require("./connection/connect")();

app.set('views', './pages');
app.set('view engine', 'ejs'); 
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

function getSQLData(sqlQuery){
    console.log("inside getSQLData");
    return new Promise(function(resolve){
            console.log("Intializing connection");
            conn.connect().then(function(){
                let req = new sql.Request(conn);
                console.log("Connected");
                req.query(sqlQuery).then(function(resultData){
                    console.log("Query Ran Successfully");
                    //console.table(resultData.recordset);
                    //console.log(resultData.recordset);
                    conn.close();
                    console.log("Closed SQL Connection");
                    resolve(resultData);
                })
            })
    });
}

app.get('/', function (req, res) {
    console.log("home tableList");
    let sqlQueryTableList = 
    `   select 
            c.name as tableName
        from 
            sys.tables c 
    `;
    let resultTableList;
    getSQLData(sqlQueryTableList).then(function(value){
            resultTableList = value;
            console.table(resultTableList.recordset);
            console.log("render home");
            res.render("home", {tableData : resultTableList.recordset});
    })
});

app.get('/:tableName', function (req, res) {
        let tableName = req.params.tableName;
        console.log("table edit form");
        let sqlQuery = "select * from " + tableName;
        let sqlQueryMetadata = 
        `   select 
                c.name as ColumnName, c.column_id, t.name as DataType, c.max_length, c.precision, c.scale 
            from 
                sys.columns c 
                left join sys.types t on c.user_type_id = t.user_type_id
            where 
                c.object_id = object_id('`+ tableName + `');
        `;
        let resultData;
        let resultMetadata;
        getSQLData(sqlQuery)
        .then(function(value){
            resultData = value;
            console.table(resultData.recordset);
        })
        .then(function(value){
            getSQLData(sqlQueryMetadata)
            .then(function(value){
                resultMetadata = value;
                console.table(resultMetadata.recordset);
                console.log("render table edit form");
                res.render("table", {tableName : tableName, tableData : resultData.recordset, tableMetadata : resultMetadata.recordset});
            })
        })
});

app.post('/:tableName/Update', function (req, res) {
    let tableName = req.params.tableName;
    let sqlUpdate = "update " + tableName + " set ";
    //res.send(req.body);
    let intialValue = JSON.parse(req.body["IntialValue"]);
    //console.log(intialValue);
    delete  req.body["IntialValue"];
    let attributeCount = Object.keys(req.body).length;
    let itrCount = 1;
    for(let attributename in req.body){
        //console.log(attributename + ": " + req.body[attributename]);
        if(itrCount == attributeCount) {
            sqlUpdate = sqlUpdate + ` [` + attributename + `] = '` + req.body[attributename] + `' where `;
        }
        else {
            sqlUpdate = sqlUpdate + ` [` + attributename + `] = '` + req.body[attributename] + `' ,`;
        }
        itrCount += 1;
    }
    let itrCountForWhere = 1;
    for(let attributename in intialValue){
        //console.log(attributename + ": " + intialValue[attributename]);
        if(itrCountForWhere == attributeCount) {
            sqlUpdate = sqlUpdate + ` [` + attributename + `] = '` + intialValue[attributename] + `';`;
        }
        else {
            sqlUpdate = sqlUpdate + ` [` + attributename + `] = '` + intialValue[attributename] + `' and`;
        }        
        itrCountForWhere += 1;
    }
    console.log(sqlUpdate);
    getSQLData(sqlUpdate).then(function(value){
        console.log(value);
        console.log("redirect to table edit form");
        res.redirect("/" + tableName);
````})
});

app.post('/:tableName/Delete', function (req, res) {
    let tableName = req.params.tableName;
    let sqlDelete = "delete from " + tableName + " where ";
    //res.send(req.body);
    let intialValue = JSON.parse(req.body["IntialValue"]);    
    console.log(intialValue);
    delete  req.body["IntialValue"];
    //let attributeCount = Object.keys(req.body).length;
    let attributeCount = Object.keys(intialValue).length;
    let itrCount = 1;
    for(let attributename in intialValue){
        //console.log(attributename + ": " + intialValue[attributename]);
        if(itrCount == attributeCount) {
            sqlDelete = sqlDelete + ` [` + attributename + `] = '` + intialValue[attributename] + `';`;
        }
        else {
            sqlDelete = sqlDelete + ` [` + attributename + `] = '` + intialValue[attributename] + `' and`;
        }        
        itrCount += 1;
    }
    console.log(sqlDelete);
    getSQLData(sqlDelete).then(function(value){
        console.log(value);
        res.redirect("/" + tableName);
````})
});


app.post('/:tableName/Insert', function (req, res) {
    let tableName = req.params.tableName;
    let sqlInsert = "insert into " + tableName + " ( ";
    //res.send(req.body);
    let attributeCount = Object.keys(req.body).length;
    let itrCountList = 1;
    for(let attributename in req.body){
        if(itrCountList == attributeCount) {
            sqlInsert = sqlInsert + ` [` + attributename + `]) values (`;
        }
        else {
            sqlInsert = sqlInsert + ` [` + attributename + `] ,`;
        }        
        itrCountList += 1;
    }
    let itrCount = 1;
    for(let attributename in req.body){
        //console.log(attributename + ": " + req.body[attributename]);
        if(itrCount == attributeCount) {
            sqlInsert = sqlInsert + ` '` + req.body[attributename] + `');`;
        }
        else {
            sqlInsert = sqlInsert + ` '` + req.body[attributename] + `' ,`;
        }        
        itrCount += 1;
    }
    console.log(sqlInsert);
    getSQLData(sqlInsert).then(function(value){
        console.log(value);
        res.redirect("/" + tableName);
````})
});

app.listen(3000);