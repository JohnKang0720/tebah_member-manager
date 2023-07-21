USE my_db;

SET FOREIGN_KEY_CHECKS=0;
SET SQL_SAFE_UPDATES = 0;

DELETE FROM church_table WHERE eng_name is not null;
DELETE FROM cont_a WHERE eng_name is not null;
DELETE FROM cont_b WHERE eng_name is not null;
-- MAIN DATA

CREATE TABLE church_table (
	id INTEGER PRIMARY KEY,
    eng_name VARCHAR(200) NOT NULL,
    kor_name VARCHAR(200) NOT NULL,
    gender VARCHAR(1),
    category VARCHAR(10),
    married BOOLEAN,
	age INTEGER NOT NULL,
    baptism VARCHAR(5),
    baptism_year INTEGER,
    email VARCHAR(200),
    telephone VARCHAR(13),
    address VARCHAR(200),
    hobby VARCHAR(200),
    vol_exp VARCHAR(200),
    offering INTEGER,
    f_code INTEGER
);

SET SQL_SAFE_UPDATES = 0;

ALTER TABLE church_table DROP id;
ALTER TABLE church_table ADD id INTEGER PRIMARY KEY AUTO_INCREMENT;
ALTER TABLE church_table AUTO_INCREMENT=1;
ALTER TABLE church_table MODIFY category VARCHAR(10);
ALTER TABLE church_table ADD parent_id_1 INTEGER ;
ALTER TABLE church_table ADD parent_id_2 INTEGER;

-- Extra information columns
ALTER TABLE church_table ADD agreement VARCHAR(3);
ALTER TABLE church_table ADD reg_num INTEGER;
ALTER TABLE church_table ADD reg_date DATE;

-- ADD sample data 
INSERT INTO church_table (
    eng_name,
    kor_name,
    gender,
    category,
    married,
	age,
    baptism,
    baptism_year,
    email,
    telephone,
    address,
    hobby,
    vol_exp,
    offering,
    f_code,
    parent_id_1,
    parent_id_2,
    agreement,
    reg_num,
    reg_date) VALUES ("Grandchild #1", "child", "여", "youth", false, 13, "없음", 0, "child@gmail.com", "xxx-xxx-xxxx", "123 777 st", "sports", "none", 230717, 5, 29, 30, "yes", 3, 230718);
 
SELECT 
    *
FROM
    church_table;	

-- GROUP by category and check which category has more than 20 ppl and find max offering number.
SELECT 
     MAX(offering) AS latest, category
FROM
    church_table
GROUP BY category
HAVING COUNT(eng_name) >= 1;

SELECT 
     COUNT(eng_name) AS member_count, category
FROM
    church_table
GROUP BY category
HAVING COUNT(eng_name) >= 1;

-- Get family member count 

SELECT 
	COUNT(eng_name) AS family_count, f_code
FROM 
	church_table
GROUP BY f_code;

-- Youths
SELECT ALL eng_name
FROM church_table
WHERE age > 18;

-- Seniors
SELECT ALL eng_name
FROM church_table
WHERE age > 50;

-- Mid-age members who aren't married
SELECT ALL eng_name
FROM church_table
WHERE age BETWEEN 30 AND 60 AND married = false;

-- Check area
SELECT eng_name, address,
CASE 
	WHEN address LIKE '%coquitlam%' THEN 'Coquitlam Area'
    WHEN address LIKE '%surrey%' THEN 'Surrey Area'
    WHEN address LIKE '%langley%' THEN 'Langley Area'
	WHEN address LIKE '%burnaby%' THEN 'Burnaby Area'
    ELSE "수정 필요"
END AS area_text
FROM church_table;

-- EMERGENCY CONTACT TABLES
-- Children
CREATE TABLE contact_a (
    eng_name VARCHAR(200) NOT NULL,
    kor_name VARCHAR(200) NOT NULL,
    gender VARCHAR(1),
    category VARCHAR(10),
    married BOOLEAN,
	age INTEGER NOT NULL,
    baptism VARCHAR(5),
    baptism_year INTEGER,
    email VARCHAR(200),
    telephone VARCHAR(13),
    address VARCHAR(200),
    hobby VARCHAR(200),
    vol_exp VARCHAR(200),
    offering INTEGER,
    family_code INTEGER, -- Search all relations
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    parent_id_1 INTEGER, -- Parent 1 (FK)
    parent_id_2 INTEGER, -- Parent 2 (FK)
    agreement VARCHAR(3),
	reg_num INTEGER,
	reg_date DATE,
    FOREIGN KEY (parent_id_1) REFERENCES contact_b(id),
    FOREIGN KEY (parent_id_2) REFERENCES contact_b(id)
);

-- Parents
CREATE TABLE contact_b (
    eng_name VARCHAR(200) NOT NULL,
    kor_name VARCHAR(200) NOT NULL,
    gender VARCHAR(1),
    category VARCHAR(10),
    married BOOLEAN,
	age INTEGER NOT NULL,
    baptism VARCHAR(5),
    baptism_year INTEGER,
    email VARCHAR(200),
    telephone VARCHAR(13),
    address VARCHAR(200),
    hobby VARCHAR(200),
    vol_exp VARCHAR(200),
    offering INTEGER,
    family_code INTEGER,
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    parent_id_1 INTEGER, -- null
    parent_id_2 INTEGER, -- null
    agreement VARCHAR(3),
	reg_num INTEGER,
	reg_date DATE
);

UPDATE contact_b SET parent_id_1 = NULL;
UPDATE contact_b SET parent_id_2 = NULL;

-- CREATE TABLE cont_c (
--     id INTEGER PRIMARY KEY AUTO_INCREMENT,
--     eng_name VARCHAR(200) NOT NULL,
--     kor_name VARCHAR(200) NOT NULL,
--     gender VARCHAR(1),
--     category VARCHAR(10),
--     married BOOLEAN,
-- 	age INTEGER NOT NULL,
--     baptism VARCHAR(5),
--     baptism_year INTEGER,
--     email VARCHAR(200),
--     telephone VARCHAR(13),
--     address VARCHAR(200),
--     hobby VARCHAR(200),
--     vol_exp VARCHAR(200),
--     family_code INTEGER,
--     offering INTEGER
-- );

ALTER TABLE contact_a AUTO_INCREMENT=1;
ALTER TABLE contact_b AUTO_INCREMENT=1;
-- ALTER TABLE cont_c AUTO_INCREMENT=1;

-- DO NOT RUN
INSERT INTO contact_a	
SELECT * FROM church_table 
WHERE category = 'youth' OR category = 'secondary';

INSERT INTO contact_b	
SELECT * FROM church_table 
WHERE category = 'admin';

-- Transferring f_code  
UPDATE contact_a 
SET 
    contact_a.family_code = (SELECT 
            church_table.f_code
        FROM
            church_table
        WHERE
            contact_a.id = church_table.id);

-- Queries & Agg. 
SELECT * FROM contact_a;
SELECT * FROM contact_b;

-- People registered at a certain date
WITH reg_date_info AS (
SELECT eng_name, gender, category, reg_date
FROM contact_a
UNION ALL 
SELECT eng_name, gender, category, reg_date
FROM contact_b)

SELECT COUNT(eng_name), category AS 그룹, reg_date AS RegistrationDate
FROM reg_date_info
GROUP BY category, reg_date;

SELECT COUNT(eng_name), reg_date AS RegistrationDate
FROM reg_date_info
GROUP BY reg_date;

-- SEARCHING all family members
SELECT eng_name, kor_name, gender, category, age
FROM contact_a
WHERE family_code = 5
UNION ALL
SELECT eng_name, kor_name, gender, category, age
FROM contact_b
WHERE family_code = 5;

-- FIND parent for a single child

-- Child #1 (33)
SELECT contact_a.eng_name, contact_b.eng_name, cb2.eng_name, contact_a.family_code
FROM contact_a
LEFT JOIN contact_b
ON contact_b.id = contact_a.parent_id_2
LEFT JOIN contact_b cb2
ON cb2.id = contact_a.parent_id_1
WHERE contact_a.id = 33;

-- Child #3 (35)
SELECT contact_a.eng_name, contact_b.eng_name, cb2.eng_name, contact_a.family_code
FROM contact_a
JOIN contact_b
ON contact_b.id = contact_a.parent_id_2
JOIN contact_b cb2
ON cb2.id = contact_a.parent_id_1
WHERE contact_a.id = 35;

-- ORGANIZING family relations (JOINS) + GENERATION NUMBER

WITH RECURSIVE gen_table AS (
	-- the parents
	SELECT id, eng_name, gender, category, parent_id_1, parent_id_2, 0 AS generation
    FROM contact_b 
    WHERE parent_id_1 IS NULL AND parent_id_2 IS NULL
    
    UNION ALL
    
    -- arbitrary children
    SELECT contact_a.id, contact_a.eng_name, contact_a.gender, contact_a.category, contact_a.parent_id_1, contact_a.parent_id_2, generation+1 AS generation
    FROM contact_a
    JOIN gen_table g1
    ON g1.id = contact_a.parent_id_1
)

SELECT * FROM gen_table;