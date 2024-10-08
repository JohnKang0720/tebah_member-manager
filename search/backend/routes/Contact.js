const express = require('express');
const router = express.Router();

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
    db.query(`SELECT ${cols} FROM mytable WHERE level='${returnCat(group)}' AND (status is null or status != 'archive')`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

//search family information
router.post('/:group', (req, res) => {
    const { code } = req.body;
    db.query(`SELECT * FROM mytable WHERE f_code='${code}' AND (status is null or status != 'archive')`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)
    })

})

module.exports = router;