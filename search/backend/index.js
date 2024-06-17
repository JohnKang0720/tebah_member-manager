const express = require('express');
const cors = require('cors');
const sql = require('mysql2');
const app = express();

const db = sql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Gyojin1000**',
    database: "tebah_db",
    connectionLimit: 10
});

app.use("/main", require("./routes/Main")); 
app.use("/contacts", require("./routes/Contact"));
app.use("/tebah-family", require("./routes/Family"));

// db.connect((err) => {
//     if (err) {
//         console.log("error")
//         throw err
//     }
//     console.log("connected...")
// })

app.use(express.json())
app.use(cors())

//create db
app.get("/", (req, res) => {
    res.send("connected")
})

app.get("/testing", (req,res) => {
    res.send("testing")
})

app.listen(5000, () => {
    console.log("server starting...")
})