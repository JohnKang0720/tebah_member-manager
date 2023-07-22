const express = require('express');
const router = express.Router();
const sql = require('mysql2');

const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gyojin1000**',
    database: "my_db"
});

router.get('/', (req, res) => {
    const columns = "contact_a.eng_name AS Children, contact_b.eng_name AS Parent1, cb2.eng_name AS Parent2, contact_a.family_code"
    const query = `SELECT ${columns} FROM contact_a JOIN contact_b ON contact_b.id = contact_a.parent_id_2 LEFT JOIN contact_b cb2 ON cb2.id = contact_a.parent_id_1;`

    db.query(query, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result)
    })
})

//finding parents of a single child & displaying family tables
router.post('/', (req, res) => {
    const { search_id } = req.body;
    const columns = "contact_a.eng_name AS Children, contact_b.eng_name AS Parent1, cb2.eng_name AS Parent2, contact_a.family_code"
    let query = `SELECT ${columns} FROM contact_a INNER JOIN contact_b ON contact_b.id = contact_a.parent_id_2 INNER JOIN contact_b cb2 ON cb2.id = contact_a.parent_id_1 WHERE contact_a.id = ${search_id};`;
    
    db.query(query, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result)
    })
})

module.exports = router;