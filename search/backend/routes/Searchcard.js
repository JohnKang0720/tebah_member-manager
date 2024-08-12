const express = require('express');
const router = express.Router();
const db = require('../db')

router.get("/:query", (req, res) => {
    let {query} = req.params
    db.query(`SELECT * FROM mytable WHERE korean='${query}'`
    , (err, result) => {
        if(err) return err
        res.status(200).send(result)
    })
})

// do it or fake it
router.get("/:q/:fcode", (req, res) => {
    let {q, fcode} = req.params
    db.query(`SELECT * FROM mytable m WHERE m.f_code = '${fcode}' AND m.korean != '${q}'`
    , (err, result) => {
        if(err) return err
        res.status(200).send(result)
    })
})

module.exports = router