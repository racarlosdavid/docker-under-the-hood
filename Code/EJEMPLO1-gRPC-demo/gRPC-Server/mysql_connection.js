var mysql      = require('mysql');
var mysqlConnection = mysql.createConnection({
  host     : '20.9.14.99',
  user     : 'root',
  password : 'databasepass',
  database : 'so1_ejemplo'
});

mysqlConnection.connect(function (err){
    if(err){
        console.log(' Error al conectarse a la base de datos ',err);
    } else {
        console.log(' Conexión a la base de datos exitosa ');
    }
});

module.exports = mysqlConnection;