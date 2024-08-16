const express = require('express');
const router = express.Router();
const db = require('../db')

//TODO
router.get("/:type", (req, res) => {
    let { cols } = req.query
    let { type } = req.params

    if (type === "all") {
        db.query(`SELECT ${cols} FROM mytable`, (err, result) => {
            if (err) throw err
            res.status(200).send(result)
        })
    } else {
        db.query(`SELECT ${cols} FROM mytable WHERE status='${type}'`, (err, result) => {
            if (err) throw err
            res.status(200).send(result)
        })
    }
})

module.exports = router