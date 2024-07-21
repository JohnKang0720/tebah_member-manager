const express = require('express');
const router = express.Router();
// const sql = require('mysql2');

const { Pool } = require('pg')
require('dotenv').config()

const db = new Pool({
    connectionString: "postgres://default:LgnO1f8UPHDI@ep-crimson-paper-a45txdup-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
})
let query = `WITH children_node AS (
        SELECT * FROM mytable
        WHERE p_code_1 IS NOT NULL OR p_code_2 IS NOT NULL
    )`

const columns = [
    "id",
    "offering_num",
    "korean",
    "english_name",
    "gender",
    "title",
    "birthdate",
    "age",
    "baptism",
    "baptism_date",
    "email",
    "mobile",
    "suite",
    "street",
    "city",
    "province",
    "postal_code",
    "country",
    "marital_status",
    "hobby",
    "volunteer",
    "consent",
    "registered",
    "last_updated",
    "f_code",
    "p_code_1",
    "p_code_2"
]


query += "SELECT" + "\n"
query += columns.map(col => `c.${col}`).join(',\n') + ',\n';
query += columns.map(col => `m.${col} AS p1_${col}`).join(',\n') + '\n';
query += ","
query += columns.map(col => `m2.${col} AS p2_${col}`).join(',\n') + '\n';
query += "FROM children_node c" + "\n"
query += "JOIN mytable m ON m.ID = c.p_code_1" + "\n"
query += 'JOIN mytable m2 ON m2.ID = c.p_code_2;'

router.get('/', (req, res) => {
    db.query(query, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

//finding parents of a single child & displaying family tables
router.post('/', (req, res) => {
    const { search_name } = req.body;
    let q = query.replace(";", `\n WHERE c.korean = ${search_name} OR m.korean = ${search_name} OR m2.korean = ${search_name};`)

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

module.exports = router;