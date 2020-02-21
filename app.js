const express = require('express');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'sweeter'
});

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySql connected");
});

const app = express();

//Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE sweeter';
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send("Database has been created...");
    });
});

//Create User Table
app.get('/createusertable', (req, res) => {
    let sql = 'CREATE TABLE usertable(userid INT, name VARCHAR(255), email VARCHAR(50))';
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send("Table has been created...");
    });
});


app.listen(3000, () => {
    console.log("Server started at port 3000");
});