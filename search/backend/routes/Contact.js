const express = require('express');
const router = express.Router();
// const sql = require('mysql2');

const db = require('../db')

const returnCat = (group) => {
    if (group == "children") {
        return "아동부"
    } else if (group == "adults") {
        return "장년"
    }
}
//get contacts information
router.get('/:group', (req, res) => {
    const { group } = req.params;
    const { cols } = req.query
    db.query(`SELECT ${cols} FROM mytable WHERE level='${returnCat(group)}'`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

//TODO: make it so that i can only access ids that are within the contact tab;e
//search family information
router.post('/:group', (req, res) => {
    const { code } = req.body;
    db.query(`SELECT * FROM mytable WHERE f_code='${code}'`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)
    })

})

module.exports = router;