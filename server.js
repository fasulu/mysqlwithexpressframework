const express = require('express');
const mysql = require('mysql');
const db = require('./config.js')

const app = express();
const port = db.port;

// Create connection

const conn = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
})

// Connect

conn.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected")
});

// Create db - http://localhost:9001/createdb
// This is to create new database,
// If no database exist, uncomment this part of code
// app.get('/createdb', (req, res) => {
//     let sql = 'create database mysql_node';
//     conn.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result)
//         res.send("Database created")

//     });
// });

// Create table - http://localhost:9001/createpoststable
// This is to create new table,
// If no table exist in database, uncomment this part of code
// app.get('/createpoststable', (req, res) => {
//     let sql = 'create table posts(id int auto_increment, title varchar(255), body varchar(255), primary key(id))';
//     conn.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Posts table created...');
//     });
// });

// Insert post data1 in posts table - http://localhost:9001/adddata1

app.get('/adddata1', (req, res) => {
    let data1 = { title: 'Data one', body: 'Data 1 body' };
    let sql = 'insert into posts set ?';
    conn.query(sql, data1, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts data one added...');
    });
});

// Fetch data from table - http://localhost:9001/getdatas

app.get('/getdatas', (req, res) => {
    let sql = 'select * from posts';
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('Data fetched');
    })
})

// Fetch 1 data from table - http://localhost:9001/getdata/1

app.get('/getdata/:id', (req, res) => {
    let sql = `select * from posts where id=${req.params.id}`;
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Data fetched');
    })
})

// Update data in table - http://localhost:9001/updatedata/15

app.get('/updatedata/:id', (req, res) => {
    let updateTitle = 'Updated new titles for 15'
    let sql = `update posts set title='${updateTitle}' where id=${req.params.id}`;
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result.message);
        res.send('Data updated');
    })
})

// Delete data in table - http://localhost:9001/deletedata/1

app.get('/deletedata/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id=${req.params.id}`;
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        console.log(`Record ID ${req.params.id} deleted`);
        res.send('Data deleted');
    })
})

app.listen(port, () => {
    console.log(`Server started in port ${port}`)
});