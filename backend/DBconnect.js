const mysql = require('mysql')

const myDB = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"carrentalservice"
})

myDB.connect(function(err){
    if (err) console.log("Error connecting to MySql"+err);
    else console.log("Successfully connected to MySql...")
})

module.exports = myDB