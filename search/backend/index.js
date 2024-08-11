const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db')

app.use(express.json())
app.use(cors())
app.use("/main", require("./routes/Main"));
app.use("/contacts", require("./routes/Contact"));
app.use("/tebah-family", require("./routes/Family"));
app.use("/search-card", require("./routes/Searchcard"))

//create db
app.get("/", (req, res) => {
    res.send("connected")
})

app.get("/testing", (req, res) => {
    res.send("testing")
})

app.post("/registered", (req, res) => {
    let { email, telephone, level } = req.body
    db.query(`INSERT INTO registered (email, telephone, level) 
        SELECT '${email}', '${telephone}', '${level}'
        WHERE NOT EXISTS (SELECT 1 FROM registered WHERE email = '${email}');`, (err, result) => {
        if (err) throw err
        res.status(200).send("member registered")
    })
})

app.get("/registered", (req, res) => {
    db.query("SELECT email FROM registered", (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

app.listen(5001, () => {
    console.log("server starting...")
})