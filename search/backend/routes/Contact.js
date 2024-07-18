const express = require('express');
const router = express.Router();
// const sql = require('mysql2');

const { Pool } = require('pg')
require('dotenv').config()

const db = new Pool({
  connectionString: "postgres://default:LgnO1f8UPHDI@ep-crimson-paper-a45txdup-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
})

const returnCat = (group) => {
    console.log(group)
    if (group == "pastors") {
        return "교역자"
    } else if (group == "adults") {
        return "장년"
    }
}
//get contacts information
router.get('/:group', (req, res) => {
    const { group } = req.params;
    db.query(`SELECT * FROM mytable WHERE category='${returnCat(group)}'`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

//TODO: make it so that i can only access ids that are within the contact tab;e
//search family information
router.post('/:group', (req, res) => {
    const { group } = req.params;
    const { code } = req.body;
    db.query(`SELECT * FROM mytable WHERE f_code='${code}' AND category='${returnCat(group)}'`, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.status(200).send(result)
    })

})

module.exports = router;