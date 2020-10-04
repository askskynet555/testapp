const express = require('express');
const app = express();
const sql = require("mssql");
let conn = require("./connection/connect")();
let htmlTagMap = require("./helper/inputmap");

app.set('views', './pages');
app.set('view engine', 'ejs'); 
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

async function getSQLData(sqlQuery){
    console.log("inside getSQLData");
    try{    
        console.log("Intializing connection");
        await conn.connect();
        let req = new sql.Request(conn);
        console.log("Connected");
        let resultData = await req.query(sqlQuery);
        console.log("Query Ran Successfully");
        //console.table(resultData.recordset);
        //console.log(resultData.recordset);
        conn.close();
        console.log("Closed SQL Connection");
        return resultData;
    } catch (err){
        console.log(err);
        throw err;
    }        
}

app.get('/favicon.ico', function (req, res){ res.status(204).end()});

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
            c.name as ColumnName, c.column_id, t.user_type_id, t.name as DataType, c.max_length, c.precision, c.scale 
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
        //console.table(resultData.recordset.columns);
    })
    .then(function(value){
        getSQLData(sqlQueryMetadata)
        .then(function(value){
            resultMetadata = value;
            resultMetadata.recordset.forEach(function(rows){
                //Add html input type
                for (var key in rows){
                    if (rows.hasOwnProperty(key)){
                      var val = rows[key];
                      if(key == "user_type_id"){
                        rows.html_input_type = htmlTagMap[parseInt(val,10)]["html_input_type"];
                      }
                    }
                }
            });
            console.table(resultMetadata.recordset);
            console.log("render table edit form");
            res.render("table", {tableName : tableName, tableData : resultData.recordset, tableMetadata : resultMetadata.recordset});
        }).catch(function(error){
            console.log(error);
        })
    }).catch(function(error){
        console.log(error);
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
            if(req.body[attributename] == 'null'){
                sqlUpdate = sqlUpdate + ` [` + attributename + `] = null where `;
            }else{
                sqlUpdate = sqlUpdate + ` [` + attributename + `] = '` + req.body[attributename] + `' where `;
            }
        }
        else {
            if(req.body[attributename] == 'null'){
                sqlUpdate = sqlUpdate + ` [` + attributename + `] = null ,`;
            }else{
                sqlUpdate = sqlUpdate + ` [` + attributename + `] = '` + req.body[attributename] + `' ,`;
            }
        }
        itrCount += 1;
    }
    let itrCountForWhere = 1;
    for(let attributename in intialValue){
        //console.log(attributename + ": " + intialValue[attributename]);
        if(itrCountForWhere == attributeCount) {
            console.log(intialValue[attributename]);
            if(intialValue[attributename] == null){
                sqlUpdate = sqlUpdate + ` [` + attributename + `] is null;`;
            }else{
                sqlUpdate = sqlUpdate + ` [` + attributename + `] = '` + intialValue[attributename] + `';`;
            }
        }
        else {
            if(intialValue[attributename] == null){
                sqlUpdate = sqlUpdate + ` [` + attributename + `] is null and`;
            }else{
                sqlUpdate = sqlUpdate + ` [` + attributename + `] = '` + intialValue[attributename] + `' and`;
            }
        }        
        itrCountForWhere += 1;
    }
    console.log(sqlUpdate);
    getSQLData(sqlUpdate).then(function(value){
        console.log(value);
        console.log("redirect to table edit form");
        res.redirect("/" + tableName);
    }).catch(function(error){
        console.log(error);
    })
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
            if(intialValue[attributename] == null){
                sqlDelete = sqlDelete + ` [` + attributename + `] is null ;`;
            }else{
                sqlDelete = sqlDelete + ` [` + attributename + `] = '` + intialValue[attributename] + `';`;
            }
        }
        else {
            if(intialValue[attributename] == null){
                sqlDelete = sqlDelete + ` [` + attributename + `] is null and`;
            }else{
                sqlDelete = sqlDelete + ` [` + attributename + `] = '` + intialValue[attributename] + `' and`;
            }
        }        
        itrCount += 1;
    }
    console.log(sqlDelete);
    getSQLData(sqlDelete).then(function(value){
        console.log(value);
        res.redirect("/" + tableName);
    }).catch(function(error){
        console.log(error);
    })
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
    }).catch(function(error){
        console.log(error);
    })
});

app.listen(3000);