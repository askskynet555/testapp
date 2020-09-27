const express = require('express');
const app = express();
const sql = require("mssql");
let conn = require("./connection/connect")();
let tableName = "Employee";

app.set('views', './pages');
app.set('view engine', 'ejs'); 
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

function getSQLData(sqlQuery){
    return new Promise(function(resolve,reject){
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
            }).catch(function(err){
                conn.close();
                res.status(400).send(err);    
            });
        }).catch(function(err){
            conn.close();
            res.status(400).send(err);
        });
    })
};

app.get('/', function (req, res) {
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
                res.render("home", {tableName : tableName, tableData : resultData.recordset, tableMetadata : resultMetadata.recordset});
            })
        })        
});

app.post('/' + tableName + '/Update', function (req, res) {
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
            sqlUpdate = sqlUpdate + ` ` + attributename + ` = '` + req.body[attributename] + `' where `;
        }
        else {
            sqlUpdate = sqlUpdate + ` ` + attributename + ` = '` + req.body[attributename] + `' ,`;
        }
        itrCount += 1;
    }
    let itrCountForWhere = 1;
    for(let attributename in intialValue){
        //console.log(attributename + ": " + intialValue[attributename]);
        if(itrCountForWhere == attributeCount) {
            sqlUpdate = sqlUpdate + ` ` + attributename + ` = '` + intialValue[attributename] + `';`;
        }
        else {
            sqlUpdate = sqlUpdate + ` ` + attributename + ` = '` + intialValue[attributename] + `' and`;
        }        
        itrCountForWhere += 1;
    }
    console.log(sqlUpdate);
    console.log("Update : Intializing connection");
    conn.connect().then(function(){
        let sqlQuery = sqlUpdate;
        let req = new sql.Request(conn);
        console.log("Update : Connected");
        req.query(sqlQuery).then(function(result){
            console.log("Update : Query Ran Successfully");
            console.log(result);
            conn.close();
            console.log("Update : Closed SQL Connection");
        }).catch(function(err){
            conn.close();
            console.log("Update : Error Running Query");
            res.status(400).send(err);    
        });
    }).catch(function(err){
        conn.close();
        console.log("Update : Error Connecting To SQL Server");
        res.status(400).send(err);
    });
    res.redirect("/");
});

app.post('/' + tableName + '/Delete', function (req, res) {
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
            sqlDelete = sqlDelete + ` ` + attributename + ` = '` + intialValue[attributename] + `';`;
        }
        else {
            sqlDelete = sqlDelete + ` ` + attributename + ` = '` + intialValue[attributename] + `' and`;
        }        
        itrCount += 1;
    }
    console.log(sqlDelete);
    console.log("Delete : Intializing connection");
    conn.connect().then(function(){
        let sqlQuery = sqlDelete;
        let req = new sql.Request(conn);
        console.log("Delete : Connected");
        req.query(sqlQuery).then(function(result){
            console.log("Delete : Query Ran Successfully");
            console.log(result);
            conn.close();
            console.log("Delete : Closed SQL Connection");
        }).catch(function(err){
            conn.close();
            console.log("Delete : Error Running Query");
            res.status(400).send(err);    
        });
    }).catch(function(err){
        conn.close();
        console.log("Delete : Error Connecting To SQL Server");
        res.status(400).send(err);
    });
    res.redirect("/");
});


app.post('/' + tableName + '/Insert', function (req, res) {
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
    console.log("sqlInsert : Intializing connection");
    conn.connect().then(function(){
        let sqlQuery = sqlInsert;
        let req = new sql.Request(conn);
        console.log("Insert : Connected");
        req.query(sqlQuery).then(function(result){
            console.log("Insert : Query Ran Successfully");
            console.log(result);
            conn.close();
            console.log("Insert : Closed SQL Connection");
        }).catch(function(err){
            conn.close();
            console.log("Insert : Error Running Query");
            res.status(400).send(err);    
        });
    }).catch(function(err){
        conn.close();
        console.log("Insert : Error Connecting To SQL Server");
        res.status(400).send(err);
    });
    res.redirect("/");
});

app.listen(3000);