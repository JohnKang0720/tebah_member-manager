const express = require('express');
const router = express.Router();
const sql = require('mysql2');

const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gyojin1000**',
    database: "my_db"
});

//get contacts information
router.get('/:group', (req, res) => {
    const { group } = req.params;
    let table = null;
    if (group === "youth") {
        table = "contact_a";
    } else if (group === "admin") {
        table = "contact_b";
    }
    
    db.query(`SELECT * FROM ${table} WHERE category='${group}'`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

//search family information
router.post('/:group', (req, res) => {
    const { group } = req.params;
    const { code } = req.body;

    db.query(`SELECT * FROM contact_a WHERE family_code=${code} UNION ALL SELECT * FROM contact_b WHERE family_code=${code}`, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.status(200).send(result)
    })

})

module.exports = router;