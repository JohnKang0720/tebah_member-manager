CREATE TABLE registered (id SERIAL PRIMARY KEY, 
    email VARCHAR(255),
    telephone VARCHAR(255),
    level VARCHAR(255) CHECK(level in ('새가족', '아동부', '유스', '재정부', '청년', '장년부', '교역자')))