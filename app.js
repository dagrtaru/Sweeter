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

//Create Tweet Table
app.get('/createsweettable', (req, res) => {
    let sql = 'CREATE TABLE sweettable(userid INT, title VARCHAR(50), body VARCHAR(140))';
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        res.send("Table has been created...")
    });
});

//Create Follower Table
app.get('/createfollowtable', (req, res) => {
    let sql = 'CREATE TABLE followtable(userid INT REFERENCES usertable(userid), followerid INT REFERENCES usertable(userid))';
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        res.send("Table has been created...")
    });
});

//Insert User 1
app.get('/createuser1', (req, res) => {
    let sql = `INSERT INTO usertable VALUES('1', 'Richard', 'abc@xyz.com')`;
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send("User Account Created...");
    })
});

//Insert User 2
app.get('/createuser2', (req, res) => {
    let sql = `INSERT INTO usertable VALUES('2', 'John', 'def@xyz.com')`;
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send("User Account Created...");
    })
});

//Insert User 3
app.get('/createuser3', (req, res) => {
    let sql = `INSERT INTO usertable VALUES('3', 'Paul', 'ghi@xyz.com')`;
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send("User Account Created...");
    })
});

//Make User1 a follower of User2
app.get('/createfollower', (req, res) => {
    let sql = `INSERT INTO followtable VALUES('2', '1')`;
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send("User 1 is now following User 2");
    });
});

//Make User3 a follower of User1 and User2
app.get('/createfollower3', (req, res) => {
    let sql1 = `INSERT INTO followtable VALUES('1', '3')`;
    let sql2 = `INSERT INTO followtable VALUES('2', '3')`;
    db.query(sql1, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
    db.query(sql2, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("User3 is now following User1 and User2");
    });
});

//Make user1 no longer a follower of user2
app.get('/unfollow', (req, res) => {
    let sql =  `DELETE FROM followtable WHERE followerid = '1'`;
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send("User 1 is no longer following User 2");
    });
});

app.listen(3000, () => {
    console.log("Server started at port 3000");
});
