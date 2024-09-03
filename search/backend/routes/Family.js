const express = require('express');
const router = express.Router();
const db = require('../db')

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
    db.query("SELECT  c.korean AS 한글이름, c.english_name AS 영문이름, m.korean AS 부모이름1, m2.korean AS 부모이름2, c.mobile AS 전화번호, c.email AS 이메일, CONCAT( m.suite, ' - ', m.street, ', ', m.city, ', ', m.province, ' ', m.postal_code) AS 주소, m.mobile AS 전화번호_부모, m.email AS 이메일_부모 FROM  mytable c JOIN  mytable m ON m.id = c.p_code_1 JOIN  mytable m2 ON m2.id = c.p_code_2 WHERE (c.status is null or c.status != 'archive');", (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

router.get('/consent', (req,res) => {

    db.query("SELECT korean AS 한글이름, consent AS 동의 FROM mytable;", (err, result) => {
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