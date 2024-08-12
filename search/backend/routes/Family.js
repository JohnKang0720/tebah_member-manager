const express = require('express');
const router = express.Router();
// const sql = require('mysql2');
const db = require('../db')

//USE CTE FOR active, visitors, inactive

const get_data = (start_query, cols, cat) => {
    query = start_query
    query += "SELECT" + "\n"
    query += cols.map(col => `c.${col}`).join(',\n') + ',\n';
    query += cols.map(col => `m.${col} AS p1_${col}`).join(',\n') + '\n';
    query += ","
    query += cols.map(col => `m2.${col} AS p2_${col}`).join(',\n') + '\n';
    query += "FROM mytable c" + "\n"
    query += `JOIN mytable m ON m.ID = c.p_code_1` + "\n"
    query += `JOIN mytable m2 ON m2.ID = c.p_code_2`

    return query
}
router.get('/', (req, res) => {
    let {cols, c} = req.query
    let query = `WITH children_node AS (
        SELECT * FROM mytable
    )`
    db.query(get_data(query, cols , c), (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

router.get('/consent', (req,res) => {

    db.query("SELECT id, korean, consent FROM mytable;", (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

//finding parents of a single child & displaying family tables
router.post('/', (req, res) => {
    const { search_name } = req.body;
    let q = query.replace(";", `\n WHERE c.korean = '${search_name}' OR m.korean =' ${search_name}' OR m2.korean = '${search_name}';`)

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

module.exports = router;