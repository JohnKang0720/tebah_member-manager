const express = require('express');
const router = express.Router();
const sql = require('mysql2');

const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gyojin1000**',
    database: "my_db"
});

//add to main data
//update the contact tables 
router.post("/", (req, res) => {
    const { eng_name, kor_name, gender, category, married, age, baptism, baptism_year, email, telephone, address, hobby, vol_exp, offering, f_code, p_id1, p_id2, agreement} = req.body;
    let query_a = `INSERT INTO contact_a (eng_name, kor_name, gender, category, married, age, baptism, baptism_year, email, telephone, address, hobby, vol_exp, offering, family_code, parent_id_1, parent_id_2, agreement, reg_num, reg_date) VALUES ("${eng_name}", "${kor_name}", "${gender}", "${category}", ${married}, ${age}, '${baptism}', ${baptism_year}, '${email}', '${telephone}', '${address}', '${hobby}', '${vol_exp}', ${0}, ${f_code}, ${p_id1}, ${p_id2}, '${agreement}', ${0}, "2023-07-21"); `;
    let query_b = `INSERT INTO contact_b (eng_name, kor_name, gender, category, married, age, baptism, baptism_year, email, telephone, address, hobby, vol_exp, offering, family_code, parent_id_1, parent_id_2, agreement, reg_num, reg_date) VALUES ("${eng_name}", "${kor_name}", "${gender}", "${category}", ${married}, ${age}, '${baptism}', ${baptism_year}, '${email}', '${telephone}', '${address}', '${hobby}', '${vol_exp}', ${0}, ${f_code}, ${p_id1}, ${p_id2}, '${agreement}', ${0}, "2023-07-21"); `;
    //let query_c = `INSERT INTO cont_c (eng_name, kor_name, gender, category, married, age, baptism, baptism_year, email, telephone, address, hobby, vol_exp, offering, family_code, agreement, reg_num, reg_date) VALUES ("${eng_name}", "${kor_name}", "${gender}", "${category}", ${married}, ${age}, '${baptism}', ${baptism_year}, '${email}', '${telephone}', '${address}', '${hobby}', '${vol_exp}', ${offering}, ${f_code}, "", 0, '2023-07-16'); `;
    db.query("SET FOREIGN_KEY_CHECKS=0;", (err, result) => {
        if (err) throw err;
    })
    db.query("SET SQL_SAFE_UPDATES = 0;", (err, result) => {
        if (err) throw err;
    })
    db.query(`INSERT INTO church_table (eng_name, kor_name, gender, category, married, age, baptism, baptism_year, email, telephone, address, hobby, vol_exp, offering, f_code, parent_id_1, parent_id_2, agreement, reg_num, reg_date) VALUES ("${eng_name}", "${kor_name}", "${gender}", "${category}", ${married}, ${age}, '${baptism}', ${baptism_year}, '${email}', '${telephone}', '${address}', '${hobby}', '${vol_exp}', ${0}, ${f_code}, ${p_id1}, ${p_id2}, '${agreement}', ${0}, "2023-07-21");`, (err, result) => {
        if (err) throw err;
        console.log(result);
        if (category === "youth") {
            db.query(query_a, (err, result) => {
                if (err) throw err;
            })
        } else if (category === "admin" || category === "regular") {
            db.query(query_b, (err, result) => {
                if (err) throw err;
            })
        }
        // db.query(query_c, (err, result) => {
        //     if (err) throw err;
        // })
        res.status(200).send("member added!");
    })
})

//edit main data
router.put("/", (req, res) => {
    const { id, column, content } = req.body;
    let query = "";
    let query_a = "";
    let query_b = "";
    if (isNaN(parseInt(content))) {
        query = `UPDATE church_table SET ${column}='${content}'  WHERE id=${id}`
        query_a = `UPDATE contact_a SET ${column}='${content}'  WHERE id=${id}`
        query_b = `UPDATE contact_b SET ${column}='${content}'  WHERE id=${id}`
    } else {
        query = `UPDATE church_table SET ${column}=${content}  WHERE id=${id}`
        query_a = `UPDATE contact_a SET ${column}=${content}  WHERE id=${id}`
        query_b = `UPDATE contact_b SET ${column}=${content}  WHERE id=${id}`
    }
    db.query(query, (err, result) => {
        if (err) throw err;
    })
    db.query(query_a, (err, result) => {
        if (err) throw err;
    })
    db.query(query_b, (err, result) => {
        if (err) throw err;
    })
    res.status(200).send("member updated!");
})

router.put("/", (req, res) => {
    const { id, new_offering } = req.body;
    db.query(`UPDATE church_table SET offering=${new_offering} WHERE id=${id}`, (err, result) => {
        if (err) throw err;
        console.log("edited (offering number)");
        res.status(200).send(result);
    });
})

//view main data
router.get("/", (req, res) => {
    db.query("SELECT * FROM church_table WHERE eng_name IS NOT NULL", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    })
})

//delete data in maindata
router.delete("/:name", (req, res) => {
    const { name } = req.params;
    db.query(`DELETE FROM church_table WHERE eng_name="${name}" OR kor_name="${name}"`, (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    db.query(`DELETE FROM contact_a WHERE eng_name="${name}" OR kor_name="${name}"`, (err, result) => {
        if (err) throw err;
    })
    db.query(`DELETE FROM contact_b WHERE eng_name="${name}" OR kor_name="${name}"`, (err, result) => {
        if (err) throw err;
    })
    // db.query(`DELETE FROM cont_c WHERE eng_name="${name}" OR kor_name="${name}"`, (err, result) => {
    //     if (err) throw err;
    // })
    res.status(200).send("deleted");
})

//view youth data
router.get("/youth", (req, res) => {
    db.query("SELECT * FROM church_table WHERE eng_name IS NOT NULL AND category = 'youth'", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    })
})

//view secondary data
router.get("/secondary", (req, res) => {
    db.query("SELECT * FROM church_table WHERE eng_name IS NOT NULL AND category = 'secondary'", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    })
})

//view children data
router.get("/children", (req, res) => {
    db.query("SELECT * FROM church_table WHERE eng_name IS NOT NULL AND category = 'children'", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    })
})


//view finance data
router.get("/finance", (req, res) => {
    db.query("SELECT * FROM church_table WHERE eng_name IS NOT NULL ORDER BY offering", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    })
})

//edit finance data
//TODO: make sure it edits in the contact tables as well
router.put("/finance/:id/:num", (req, res) => {
    const { id, num } = req.params;
    db.query(`UPDATE church_table SET offering=${num} WHERE id=${id}`, (err, result) => {
        if (err) throw err;
        console.log("edited (offering number)");
        res.status(200).send(result);
    });
})


module.exports = router;