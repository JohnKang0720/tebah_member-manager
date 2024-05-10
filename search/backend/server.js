const express = require('express');
const cors = require('cors');
const sql = require('mysql2');

const db = sql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Gyojin1000**',
    database: "tebah_db"
});

db.connect((err) => {
    if (err) {
        console.log("error")
        throw err
    }
    console.log("connected...")
})

const app = express();
app.use(express.json())
app.use(cors())

//create db
app.get("/", (req, res) => {
    let sql = "CREATE DATABASE tebah_db";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).send("created!");
    })
})

app.use("/main", require("./routes/Main")); 
app.use("/contacts", require("./routes/Contact"));
app.use("/tebah-family", require("./routes/Family"));

app.listen(5000, () => {
    console.log("server starting...")
})