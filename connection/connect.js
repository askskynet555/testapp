const sql = require("mssql");

let connect = function()
{
    let conn = new sql.ConnectionPool({
        user: 'sa',
        password: 'sa',
        server : 'PRASANNA-PC',
        database: 'Analysis',
        port : 1433,
        options: {
            encrypt: false, // Use this if you're on Windows Azure 
            instanceName: "SQLEXPRESS"
        }
    });
 
    return conn;
};

module.exports = connect;

/*const sql = require('mssql');

const config = {
    user : "sa",
    password : "sa",
    server : "PRASANNA-PC",
    database : "Analysis",
    port : 1433,
    options: {
        encrypt: false, // Use this if you're on Windows Azure 
        instanceName: "SQLEXPRESS"
    }
};
sql.connect(config, function(err){

    if(err) console.log(err);

    let sqlRequest = new sql.Request();

    let sqlQuery = "select * from Persons";

    sqlRequest.query(sqlQuery, function(err, data){
        
        if(err) console.log(err);
        
        console.table(data.recordset);

    });

    sql.close();

});
*/