const express = require('express');
const router = express.Router();
// const sql = require('mysql2');

const { Pool } = require('pg')
require('dotenv').config()

const db = new Pool({
  connectionString: "postgres://default:LgnO1f8UPHDI@ep-crimson-paper-a45txdup-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
})

//get contacts information
router.get('/:group', (req, res) => {
    const { group } = req.params;
    g=""
    if (group == "admin") {
        g = "교역자"
    } else {
        g = "유스"
    }
    db.query(`SELECT * FROM mytable WHERE category='${g}'`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

//search family information
router.post('/:group', (req, res) => {
    const { group } = req.params;
    const { code } = req.body;
    console.log(code)
    db.query(`SELECT * FROM mytable WHERE f_code=${code}`, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.status(200).send(result)
    })

})

module.exports = router;