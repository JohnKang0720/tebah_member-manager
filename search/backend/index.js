const express = require('express');
const cors = require('cors');
const sql = require('mysql2');

const db = sql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Gyojin1000**',
    database: "tebah_db",
    port: '3306'
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
    res.send("connected")
})

app.get("/testing", (req,res) => {
    res.send("testing")
})

app.use("/main", require("./routes/Main")); 
app.use("/contacts", require("./routes/Contact"));
app.use("/tebah-family", require("./routes/Family"));

app.listen(5000, () => {
    console.log("server starting...")
})