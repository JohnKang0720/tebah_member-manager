const express = require('express');
const cors = require('cors');
const sql = require('mysql2');

const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gyojin1000**',
    database: "my_db"
});

db.connect((err) => {
    if (err) {
        console.log("error")
        throw err
    }
    console.log("connected...")
})

const app = express();
app.use(express.json())
app.use(cors())

//create db
app.get("/", (req, res) => {
    let sql = "CREATE DATABASE my_db";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.status(200).send("created!");
    })
})

//view main data
app.get("/main", (req, res) => {
    db.query("SELECT * FROM church_table WHERE eng_name IS NOT NULL", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    })
})

//delete data in maindata
app.post("/delete-main", (req, res) => {
    const { name } = req.body;
    db.query(`DELETE FROM church_table WHERE eng_name="${name}" OR kor_name="${name}"`, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send("deleted");
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

//view finance data
app.get("/finance", (req, res) => {
    db.query("SELECT * FROM church_table WHERE eng_name IS NOT NULL ORDER BY offering", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    })
})

app.put("/edit-finance", (req, res) => {
    const { id, new_offering } = req.body;
    db.query(`UPDATE church_table SET offering=${new_offering} WHERE id=${id}`, (err, result) => {
        if (err) throw err;
        console.log("edited (offering number)");
        res.status(200).send(result);
    });
})

//view youth data
app.get("/youth", (req, res) => {
    db.query("SELECT * FROM church_table WHERE eng_name IS NOT NULL AND category = 'youth'", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    })
})

//view secondary data
app.get("/secondary", (req, res) => {
    db.query("SELECT * FROM church_table WHERE eng_name IS NOT NULL AND category = 'secondary'", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    })
})

//view children data
app.get("/children", (req, res) => {
    db.query("SELECT * FROM church_table WHERE eng_name IS NOT NULL AND category = 'children'", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    })
})

//add to main data
//update the contact tables 
app.post("/add-main", (req, res) => {
    const { eng_name, kor_name, gender, category, married, age, baptism, baptism_year, email, telephone, address, hobby, vol_exp, offering, f_code } = req.body;
    let query_a = `INSERT INTO contact_a (eng_name, kor_name, gender, category, married, age, baptism, baptism_year, email, telephone, address, hobby, vol_exp, offering, family_code, parent_id_1, parent_id_2, agreement, reg_num, reg_date) VALUES ("${eng_name}", "${kor_name}", "${gender}", "${category}", ${married}, ${age}, '${baptism}', ${baptism_year}, '${email}', '${telephone}', '${address}', '${hobby}', '${vol_exp}', ${offering}, ${f_code}, ${p_id1}, ${p_id2}, ${agreement}, ${regNum}, ${regDate}); `;
    let query_b = `INSERT INTO contact_b (eng_name, kor_name, gender, category, married, age, baptism, baptism_year, email, telephone, address, hobby, vol_exp, offering, family_code, parent_id_1, parent_id_2, agreement, reg_num, reg_date) VALUES ("${eng_name}", "${kor_name}", "${gender}", "${category}", ${married}, ${age}, '${baptism}', ${baptism_year}, '${email}', '${telephone}', '${address}', '${hobby}', '${vol_exp}', ${offering}, ${f_code}, ${p_id1}, ${p_id2}, ${agreement}, ${regNum}, ${regDate}); `;
    //let query_c = `INSERT INTO cont_c (eng_name, kor_name, gender, category, married, age, baptism, baptism_year, email, telephone, address, hobby, vol_exp, offering, family_code, agreement, reg_num, reg_date) VALUES ("${eng_name}", "${kor_name}", "${gender}", "${category}", ${married}, ${age}, '${baptism}', ${baptism_year}, '${email}', '${telephone}', '${address}', '${hobby}', '${vol_exp}', ${offering}, ${f_code}, "", 0, '2023-07-16'); `;

    db.query(`INSERT INTO church_table (eng_name, kor_name, gender, category, married, age, baptism, baptism_year, email, telephone, address, hobby, vol_exp, offering, f_code, parent_id_1, parent_id_2, agreement, reg_num, reg_date) VALUES ("${eng_name}", "${kor_name}", "${gender}", "${category}", ${married}, ${age}, '${baptism}', ${baptism_year}, '${email}', '${telephone}', '${address}', '${hobby}', '${vol_exp}', ${offering}, ${f_code}, ${p_id1}, ${p_id2}, ${agreement}, ${regNum}, ${regDate});`, (err, result) => {
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
app.put("/edit-main", (req, res) => {
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

//get contacts information
app.get('/contacts/:group', (req, res) => {
    const { group } = req.params;
    let table = null;
    if (group === "youth") {
        table = "contact_a";
    } else if (group === "admin") {
        table = "contact_b";
    }
    
    db.query(`SELECT * FROM ${table} WHERE category='${group}'`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

//search family information
app.post('/contacts/:group', (req, res) => {
    const { group } = req.params;
    const { code } = req.body;

    db.query(`SELECT eng_name, kor_name, gender, category, age, telephone, email FROM contact_a WHERE family_code=${code} UNION ALL SELECT eng_name, kor_name, gender, category, age, telephone, email FROM contact_b WHERE family_code=${code}`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)
    })

})

//finding parents of a single child & displaying family tables
app.post('/tebah-family', (req, res) => {
    const { search_id } = req.body;
    let query = ``;
    if (search_id) {
        query = `SELECT contact_a.eng_name, contact_b.eng_name, cb2.eng_name, contact_a.family_code FROM contact_a JOIN contact_b ON contact_b.id = contact_a.parent_id_2 LEFT JOIN contact_b cb2 ON cb2.id = contact_a.parent_id_1 WHERE contact_a.id = ${search_id};`;
    } else {
        query = `SELECT contact_a.eng_name, contact_b.eng_name, cb2.eng_name, contact_a.family_code FROM contact_a JOIN contact_b ON contact_b.id = contact_a.parent_id_2 LEFT JOIN contact_b cb2 ON cb2.id = contact_a.parent_id_1`
    }

    db.query(query, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})


app.listen(5000, () => {
    console.log("server starting...")
})