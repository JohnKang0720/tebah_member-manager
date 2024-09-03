const express = require('express');
const router = express.Router();
const db = require('../db')

// email AS 이메일, mobile AS 휴대번호, CONCAT( suite, ' - ', street, ', ', city, ', ', province, ' ', postal_code) AS 주소 ,
            // hobby AS 취미, volunteer AS 봉사경험, consent 동의, registered_date 등록날짜, last_updated 수정날짜, f_code 가족코드, p_code_1 AS 부모코드1, p_code_2 AS 부모코드2, level AS 카테고리, status
router.get("/:type", (req, res) => {
    let { cols } = req.query
    let { type } = req.params

    if (type === "all") {
        db.query(`SELECT id, offering_num AS 헌금번호, korean AS 한국이름, english_name AS 영문이름, gender AS 성별, title AS 직분, marital_status AS 결혼여부, birthdate AS 생년월일, age AS 나이, 
            baptism AS 신급, baptism_date AS 세례년도
            FROM mytable ORDER BY id`, (err, result) => {
            if (err) throw err
            res.status(200).send(result)
        })
    } else {
        db.query(`SELECT id, offering_num AS 헌금번호, korean AS 한국이름, english_name AS 영문이름, gender AS 성별, title AS 직분, marital_status AS 결혼여부, birthdate AS 생년월일, age AS 나이, 
            baptism AS 신급, baptism_date AS 세례년도,
            email AS 이메일, mobile AS 휴대번호, CONCAT( suite, ' - ', street, ', ', city, ', ', province, ' ', postal_code) AS 주소 ,
            hobby AS 취미, volunteer AS 봉사경험 FROM mytable WHERE status='${type}' ORDER BY id`, (err, result) => {
            if (err) throw err
            res.status(200).send(result)
        })
    }
})

module.exports = router