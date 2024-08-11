const express = require('express');
const router = express.Router();
const db = require('../db')

//Get information based on name
//try join
//if it doesnt work, Get family information using family code (instead of join) 
router.get("/:query", (req, res) => {
    let {query} = req.params
    db.query(`SELECT * FROM mytable c` +"\n"+
        `WHERE c.korean = '${query}'` +"\n"+
        "UNION" + "\n" +
        `SELECT * FROM mytable m WHERE m.f_code IN (SELECT f_code FROM mytable WHERE korean='${query}')`
    , (err, result) => {
        if(err) return err
        res.status(200).send(result)
    })
})

module.exports = router