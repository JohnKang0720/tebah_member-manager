const express = require('express');
const router = express.Router();
const date = new Date()
const db = require('../db')

db.connect((err) => {
    console.log("Connected")
})

//Inserts data
router.post("/", (req, res) => {
    function calcAge(birthday) {
        const birthDate = new Date(birthday);
        const today = new Date();

        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();

        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            calculatedAge--;
        }

        return calculatedAge;
    }

    const { data } = req.body
    if (data) {
        for (let i = 0; i <= data.length; i++) {
            if (data[i]) {
                db.query(`INSERT INTO mytable (offering_num, korean, english_name, gender, title, birthdate, age, baptism, baptism_date, email, mobile, suite, street, city, province, postal_code, country, marital_status, hobby, volunteer, consent, registered_date, last_updated, f_code, p_code_1, p_code_2, level, status) VALUES ('${data[i]["offering_num"]}', '${data[i]["korean"]}', '${data[i]["english_name"]}', '${data[i]["gender"]}', '${data[i]["title"]}',  '${data[i]["birthdate"]}', ${calcAge(data[i]["birthdate"])}, '${data[i]["baptism"]}', '${data[i]["baptism_date"]}', '${data[i]["email"]}', '${data[i]["mobile"]}', '${data[i]["suite"]}', '${data[i]["street"]}', '${data[i]["city"]}', '${data[i]["province"]}', '${data[i]["postal_code"]}', '${data[i]["country"]}', '${data[i]["marital_status"]}', '${data[i]["hobby"]}', '${data[i]["volunteer"]}',  '${data[i]["consent"]}', '${data[i]["registration_date"]}', '${data[i]["last_updated"]}', '${data[i]["f_code"]}', ${data[i]["p_code_1"] ? data[i]["p_code_1"] : -1}, ${data[i]["p_code_2"] ? data[i]["p_code_2"] : -1}, '${data[i]["level"]}', '${data[i]["status"]}');`, (err, result) => {
                    if (err) throw err;
                     res.send("complete.")
                })
            }
        }
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
    db.query(`SELECT id, korean, email, level FROM mytable WHERE (status is null or status != 'archive') ORDER BY id`, (err, result) => {
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

// SELECT f_code,  STRING_AGG(korean, ', ') AS members_list
// FROM mytable
// GROUP BY f_code
// HAVING f_code != ''

router.get("/youth/:group", (req, res) => {
    let { group } = req.params
    console.log(group)
    if (group === "아동부") {
        db.query(`WITH child AS (SELECT * FROM mytable WHERE level='${group}') SELECT 
    c.korean AS 한글이름,
    c.english_name AS 영문이름,
    CONCAT(m.korean, ', ', m2.korean) AS 부모이름,
    m.mobile AS 전화번호,
    m.email AS 이메일,
    CONCAT( m.suite, ' - ', m.street, ', ', m.city, ', ', m.province, ' ', m.postal_code) AS 주소
    FROM 
    child c
    LEFT JOIN 
    mytable m ON m.id = c.p_code_1
    LEFT JOIN 
    mytable m2 ON m2.id = c.p_code_2
    WHERE (c.status is null or c.status != 'archive');`, (err, result) => {
            if (err) throw err;
            res.status(200).send(result);
        })
    } else {
        db.query(`WITH youths AS (SELECT * FROM mytable WHERE level='${group}') SELECT 
            c.korean AS 한글이름,
            c.english_name AS 영문이름,
            c.mobile AS 전화번호_유스,
            c.email AS 이메일_유스,
            CONCAT( m.suite, ' - ', m.street, ', ', m.city, ', ', m.province, ' ', m.postal_code) AS 주소,
            CONCAT(m.korean, ', ', m2.korean) AS 부모이름,
            m.mobile AS 전화번호_부모,
            m.email AS 이메일_부모
            FROM 
            youths c
            LEFT JOIN 
            mytable m ON m.id = c.p_code_1
            LEFT JOIN 
            mytable m2 ON m2.id = c.p_code_2
            WHERE (c.status is null or c.status != 'archive');`, (err, result) => {
            if (err) throw err;
            res.status(200).send(result);
        })
    }
})

router.get("/adults/:code", (req, res) => {
    let { code } = req.params
    query = `SELECT 
    m.korean AS 장년이름,
    m.mobile AS 전화번호,
    m.email AS 이메일,
    CONCAT( m.suite, ' - ', m.street, ', ', m.city, ', ', m.province, ' ', m.postal_code) AS 주소,
    m.f_code AS 가족코드
    FROM 
    mytable c
    RIGHT JOIN 
    mytable m ON m.id = c.p_code_1
    WHERE (c.status is null or c.status != 'archive') AND m.level = '장년'`
    if (code == -1) {
        db.query(query, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    } else {
        db.query(`SELECT m.korean AS 이름, m.mobile AS 전화번호, m.email AS 이메일, CONCAT( m.suite, ' - ', m.street, ', ', m.city, ', ', m.province, ' ', m.postal_code) AS 주소, m.f_code AS 가족코드 FROM  mytable m  WHERE (m.status is null or m.status != 'archive') AND m.f_code = '${code}'`, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    }
})

// //view secondary data
router.get("/secondary", (req, res) => {
    let { cols } = req.query
    db.query(`SELECT 
        korean AS 한글이름,
        english_name AS 영문이름,
        mobile AS 전화번호,
        email AS 이메일,
        CONCAT( suite, ' - ' , street, ', ', city, ', ', province, ' ', postal_code) AS 주소
        FROM mytable WHERE level='청년' AND (status is null or status != 'archive')`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

// //view children data
// router.get("/children", (req, res) => {
//     db.query("SELECT * FROM mytable WHERE level='아동부' AND (status is null or status != 'archive')", (err, result) => {
//         if (err) throw err;
//         res.status(200).send(result);
//     })
// })

//pastor data
router.get("/pastors/:code", (req, res) => {
    let { code } = req.params
    let q = `SELECT 
            m.korean AS 이름,
            CONCAT(m2.korean, ', ', c.korean) AS 가족, 
            m.mobile AS 전화번호,
            m.email AS 이메일,
            CONCAT( m.suite, ' - ', m.street, ', ', m.city, ', ', m.province, ' ', m.postal_code) AS 주소
            FROM 
            mytable c
            RIGHT JOIN 
            mytable m ON m.id = c.p_code_1
            LEFT JOIN 
            mytable m2 ON m2.id = c.p_code_2
            WHERE (c.status is null or c.status != 'archive') AND (m.level = '교역자' OR m2.level = '교역자') ORDER BY m.korean;`
    if (code == -1) {
        db.query(`SELECT 
            m.korean AS 이름,
            m.mobile AS 전화번호,
            m.email AS 이메일,
            CONCAT( m.suite, ' - ', m.street, ', ', m.city, ', ', m.province, ' ', m.postal_code) AS 주소,
            m.f_code 가족코드
            FROM 
            mytable m
            WHERE (m.status is null or m.status != 'archive') AND (m.level = '교역자')  ORDER BY m.korean;`, (err, result) => {
            if (err) throw err;
            res.status(200).send(result);
        })
    } else {
        db.query(`SELECT 
            m.korean AS 이름,
            m.mobile AS 전화번호,
            m.email AS 이메일,
            CONCAT( m.suite, ' - ', m.street, ', ', m.city, ', ', m.province, ' ', m.postal_code) AS 주소,
            m.f_code 가족코드
            FROM 
            mytable m
            WHERE (m.status is null or m.status != 'archive') AND (m.level = '교역자') AND m.f_code = '${code}' ORDER BY m.korean;`, (err, result) => {
            if (err) throw err;
            res.status(200).send(result);
        })
    }
})


// //view finance data
router.get("/finance", (req, res) => {
    db.query(`SELECT id, korean AS 한글이름, english_name AS 영문이름, offering_num AS 헌금번호, registered_date AS 등록날짜 FROM mytable ORDER BY id DESC`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
})

// //edit finance data
// //TODO: make sure it edits in the contact tables as well
router.put("/finance/:id/:num", (req, res) => {
    const { id, num } = req.params;
    db.query(`UPDATE mytable SET offering_num='${num}' WHERE id=${id}`, (err, result) => {
        if (err) throw err;
        console.log("edited (offering number)");
        res.status(200).send(result);
    });
})

module.exports = router;
