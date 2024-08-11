const express = require('express');
const router = express.Router();
const date = new Date()
// const sql = require('mysql2');
const db = require('../db')

db.connect((err) => {
    console.log("Connected")
})

//add to main data
//update the contact tables 
router.post("/", (req, res) => {
    const { offering_num, korean,english_name,gender,title,birthdate, age,baptism,baptism_date,email,mobile,suite,street, city, province, postal_code, country, marital_status , hobby,volunteer, consent, registered, last, f_code,p_code_1,p_code_2} = req.body;
    db.query(`INSERT INTO mytable (offering_num,korean,english_name,gender,title,birthdate,age,baptism,baptism_date,email,mobile,suite,street,city,province,postal_code,country,marital_status,hobby,volunteer,consent,registered,last_updated,f_code,p_code_1,p_code_2) VALUES ('${offering_num}',
         '${korean}', '${english_name}', '${gender}', '${title}', '${birthdate}',  '${age}', '${baptism}', '${baptism_date}', '${email}', '${mobile}', '${suite}', '${street}', '${city}', '${province}', '${postal_code}', '${country}', '${marital_status}', '${hobby}', '${volunteer}', '${consent}',  '${registered}', '${last}', '${f_code}', ${p_code_1}, ${p_code_2});`, (err, result) => {
            if (err) throw err;
        res.status(200).send("member added!");
    })
})

// //edit main data
router.put("/", (req, res) => {
    const { id, column, content } = req.body;
    let query = "";
    if(content !== "") query = `UPDATE mytable SET ${column}='${content}'  WHERE id=${id}`

    db.query(query, (err, result) => {
        if (err) throw err;
    })
    res.status(200).send("member updated!");
})

// //view main data
router.get("/", (req, res) => {
    let {cols} = req.query
    db.query(`SELECT id, korean, email, level FROM mytable ORDER BY id`, (err, result) => {
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
    db.query("SELECT * FROM mytable WHERE level='유스'", (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

// //view secondary data
router.get("/secondary", (req, res) => {
    let {cols} = req.query
    db.query(`SELECT ${cols} FROM mytable WHERE level='청년'`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

// //view children data
router.get("/children", (req, res) => {
    db.query("SELECT * FROM mytable WHERE level='아동부'", (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

//pastor data
router.get("/pastors", (req, res) => {
    let {cols} = req.query
    db.query(`SELECT ${cols} FROM mytable WHERE level='교역자'`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})


// //view finance data
router.get("/finance", (req, res) => {
    let {cols} = req.query
    db.query(`SELECT ${cols} FROM mytable ORDER BY offering_num`, (err, result) => {
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