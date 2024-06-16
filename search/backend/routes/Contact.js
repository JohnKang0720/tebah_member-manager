const express = require('express');
const router = express.Router();
const sql = require('mysql2');

const db = sql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Gyojin1000**',
    database: "tebah_db"
});

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

    db.query(`SELECT * FROM mytable WHERE f_code=${code}`, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.status(200).send(result)
    })

})

module.exports = router;