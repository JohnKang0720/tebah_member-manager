const express = require('express');
const router = express.Router();
// const sql = require('mysql2');
const { Pool } = require('pg')
require('dotenv').config()

const db = new Pool({
  connectionString: "postgres://default:LgnO1f8UPHDI@ep-crimson-paper-a45txdup-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
})

db.connect((err) => {
    console.log("Connected")
})

//add to main data
//update the contact tables 
router.post("/", (req, res) => {
    const { ID,korean_name,english_name,gender,title,married,age,baptism,baptism_date,email,telephone,address,job,volunteering,f_code,p_code_1,p_code_2,agreement,offering_num } = req.body;
    db.query("SET FOREIGN_KEY_CHECKS=0;", (err, result) => {
        if (err) throw err;
    })
    db.query("SET SQL_SAFE_UPDATES = 0;", (err, result) => {
        if (err) throw err;
    })
    db.query(`INSERT INTO mytable (ID,korean_name,english_name,gender,title,married,age,baptism,baptism_date,email,telephone,address,job,volunteering,f_code,p_code_1,p_code_2,agreement,offering_num) VALUES ("${ID}", "${korean_name}", "${english_name}", "${gender}", ${title}, ${married}, '${age}', ${baptism}, '${baptism_date}', '${email}', '${telephone}', '${address}', '${job}', ${volunteering}, ${f_code}, ${p_code_1}, ${p_code_2}, '${agreement}', ${offering_num});`, (err, result) => {
        if (err) throw err;
        res.status(200).send("member added!");
    })
})

// //edit main data
router.put("/", (req, res) => {
    const { id, column, content } = req.body;
    let query = "";
    if(content !== "") query = `UPDATE church_table SET ${column}='${content}'  WHERE ID=${id}`

    db.query(query, (err, result) => {
        if (err) throw err;
    })
    res.status(200).send("member updated!");
})

// router.put("/", (req, res) => {
//     const { id, new_offering } = req.body;
//     db.query(`UPDATE church_table SET offering_num=${new_offering} WHERE id=${id}`, (err, result) => {
//         if (err) throw err;
//         console.log("edited (offering number)");
//         res.status(200).send(result);
//     });
// })


// const proc_command = (c) =>  { return `CALL SelectGroup('${c}')` }
// //view main data
router.get("/", (req, res) => {
    
    db.query("SELECT * FROM mytable", (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

// //delete data in maindata
router.delete("/:name", (req, res) => {
    const { name } = req.params;
    db.query(`DELETE FROM mytable WHERE english_name="${name}" OR korean_name="${name}"`, (err, result) => {
        if (err) throw err;
    });
    res.status(200).send("deleted");
})

// //view youth data
router.get("/youth", (req, res) => {
    db.query("SELECT * FROM mytable WHERE category='유스'", (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

// //view secondary data
router.get("/secondary", (req, res) => {
    db.query("SELECT * FROM mytable WHERE category='청년'", (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

// //view children data
router.get("/children", (req, res) => {
    db.query("SELECT * FROM mytable WHERE category='아동부'", (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})


// //view finance data
router.get("/finance", (req, res) => {
    db.query("SELECT * FROM mytable ORDER BY offering_num", (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

// //edit finance data
// //TODO: make sure it edits in the contact tables as well
router.put("/finance/:id/:num", (req, res) => {
    const { id, num } = req.params;
    db.query(`UPDATE mytable SET offering_num=${num} WHERE ID=${id}`, (err, result) => {
        if (err) throw err;
        console.log("edited (offering number)");
        res.status(200).send(result);
    });
})


module.exports = router;