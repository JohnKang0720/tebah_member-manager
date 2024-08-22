const express = require('express');
const router = express.Router();
const date = new Date()
// const sql = require('mysql2');
const db = require('../db')

db.connect((err) => {
    console.log("Connected")
})

//TODO
//Inserts data
router.post("/", (req, res) => {
    // const { offering_num, korean, english_name, gender, title, birthdate, age, baptism, baptism_date, email, mobile, suite, street, city, province, postal_code, country, marital_status, hobby, volunteer, consent, registered, last, f_code, p_code_1, p_code_2 } = req.body;
    // db.query(`INSERT INTO mytable (offering_num,korean,english_name,gender,title,birthdate,age,baptism,baptism_date,email,mobile,suite,street,city,province,postal_code,country,marital_status,hobby,volunteer,consent,registered,last_updated,f_code,p_code_1,p_code_2) VALUES ('${offering_num}',
    //      '${korean}', '${english_name}', '${gender}', '${title}', '${birthdate}',  '${age}', '${baptism}', '${baptism_date}', '${email}', '${mobile}', '${suite}', '${street}', '${city}', '${province}', '${postal_code}', '${country}', '${marital_status}', '${hobby}', '${volunteer}', '${consent}',  '${registered}', '${last}', '${f_code}', ${p_code_1}, ${p_code_2});`, (err, result) => {
    //     if (err) throw err;
    //     res.status(200).send("member added!");
    // })
    const {data} = req.body
    for(let i = 0; i < data.length; i++) {
        console.log(data[i])
    }
})

// //edit main data
router.put("/", (req, res) => {
    const { id, column, content } = req.body;
    let query = "";
    if (content !== "") query = `UPDATE mytable SET ${column}='${content}' WHERE id=${id}`

    db.query(query, (err, result) => {
        if (err) throw err;
    })
    res.status(200).send("member updated!");
})

// //view main data
router.get("/", (req, res) => {
    let { cols } = req.query
    db.query(`SELECT id, korean, email, level FROM mytable ORDER BY id WHERE (status is null or status != 'archive')`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

// //delete data in maindata
router.delete("/:name", (req, res) => {
    const { name } = req.params;
    db.query(`DELETE FROM mytable WHERE english_name='${name}' OR korean='${name}'`, (err, result) => {
        if (err) throw err;
    });
    res.status(200).send("deleted");
})

// //view youth data
router.get("/youth", (req, res) => {
    let { cols } = req.query

    db.query(`WITH youths AS (SELECT * FROM mytable WHERE level='유스') SELECT 
    c.korean AS child_name,
    m.korean AS parent1_name,
    m2.korean AS parent2_name,
    c.mobile AS child_mobile,
    c.email AS child_email,
    m.mobile AS parent1_mobile,
    m.email AS parent1_email,
    m.suite AS parent1_suite,
    m.street AS parent1_street,
    m2.email AS parent2_email,
    m2.suite AS parent2_suite,
    m2.street AS parent2_street
    FROM 
    youths c
    JOIN 
    mytable m ON m.id = c.p_code_1
    JOIN 
    mytable m2 ON m2.id = c.p_code_2
    WHERE (c.status is null or c.status != 'archive');`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

// //view secondary data
router.get("/secondary", (req, res) => {
    let { cols } = req.query
    db.query(`SELECT ${cols} FROM mytable WHERE level='청년' AND (status is null or status != 'archive')`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

// //view children data
router.get("/children", (req, res) => {
    db.query("SELECT * FROM mytable WHERE level='아동부' AND (status is null or status != 'archive')", (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

//pastor data
router.get("/pastors", (req, res) => {
    let { cols } = req.query
    db.query(`SELECT ${cols} FROM mytable WHERE level='교역자' AND (status is null or status != 'archive')`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})


// //view finance data
router.get("/finance", (req, res) => {
    let { cols } = req.query
    db.query(`SELECT ${cols} FROM mytable ORDER BY offering_num AND (status is null or status != 'archive')`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

// //edit finance data
// //TODO: make sure it edits in the contact tables as well
router.put("/finance/:id/:num", (req, res) => {
    const { id, num } = req.params;
    db.query(`UPDATE mytable SET offering_num=${num} WHERE id=${id}`, (err, result) => {
        if (err) throw err;
        console.log("edited (offering number)");
        res.status(200).send(result);
    });
})


module.exports = router;