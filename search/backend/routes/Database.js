const express = require('express');
const router = express.Router();
const db = require('../db')

// function concatAlias(cols, alias) {
//     final_cols=[]
//     for(let i = 0; i <= cols.length; i++) {
//         final_cols.push(cols[i]+" AS "+alias[i])
//     }
//     return final_cols
// }

router.get("/:type", (req, res) => {
    let { cols } = req.query
    let { type } = req.params

    if (type === "all") {
        db.query(`SELECT id, korean AS 한국이름, english_name AS 영문이름, email AS 이메일, CONCAT( suite, ' ', street, ' ', city, ', ', province, ' ', postal_code) AS 주소 FROM mytable ORDER BY id`, (err, result) => {
            if (err) throw err
            res.status(200).send(result)
        })
    } else {
        db.query(`SELECT id, korean AS 한국이름, english_name AS 영문이름, email AS 이메일, CONCAT( suite, ' ', street, ' ', city, ', ', province, ' ', postal_code) AS 주소 FROM mytable WHERE status='${type}' ORDER BY id`, (err, result) => {
            if (err) throw err
            res.status(200).send(result)
        })
    }
})

module.exports = router