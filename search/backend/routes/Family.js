const express = require('express');
const router = express.Router();
const sql = require('mysql2');

const db = sql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Gyojin1000**',
    database: "tebah_db",
    connectionLimit: 10
});

const query = `
    WITH children_node AS (
        SELECT * FROM mytable
        WHERE p_code_1 IS NOT NULL OR p_code_2 IS NOT NULL
    ) 
        SELECT c.ID AS child_id, c.english_name AS child_name, c.gender AS child_gender, c.age AS child_age, c.title AS child_title, c.f_code AS family_code,
        m.english_name AS parent_1_name, m.gender AS parent_1_gender, m.age AS parent_1_age, m.title AS parent_1_title,
        m2.english_name AS parent_2_name, m2.gender AS parent_2_gender, m2.age AS parent_2_age, m2.title AS parent_2_title
        FROM children_node c
        JOIN mytable m 
        ON m.ID = c.p_code_1
        JOIN mytable m2
        ON m2.ID = c.p_code_2;`

router.get('/', (req, res) => {
    db.query(query, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

//finding parents of a single child & displaying family tables
router.post('/', (req, res) => {
    const { search_id } = req.body;
    let q = query.replace(";", `\n WHERE c.ID = ${search_id};`)

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

module.exports = router;