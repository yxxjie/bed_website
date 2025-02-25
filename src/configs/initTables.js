const pool = require("../services/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

bcrypt.hash('1234', saltRounds, (error, hash) => {
    if (error) {
        console.error("Error hashing password:", error);
    } else {
        console.log("Hashed password:", hash);

        const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Answer;
DROP TABLE IF EXISTS Question;
DROP TABLE IF EXISTS Car;
DROP TABLE IF EXISTS CarOwnByUser;
DROP TABLE IF EXISTS Reviews;

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    points INT,
    wallet INT,
    status INT,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Answer (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    answered_question_id INT NOT NULL,
    participant_id INT NOT NULL,
    answer BOOL NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    additional_notes TEXT
);

CREATE TABLE Question (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    creator_id INT NOT NULL,
    question TEXT NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Car (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand TEXT,
    cost INT,
    status_gain INT,
    hp INT,
    speed INT
);

CREATE TABLE CarOwnByUser (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    car_id INT NOT NULL
);

CREATE TABLE Reviews (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  rating_amt INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Question (creator_id, question) VALUES
(1, 'Do you buy fruits from FC6?'),
(1, 'Is the fried chicken at FC5 salty?'),
(2, 'Did you recycle any e-waste?'),
(2, 'Do you turn off lights and appliances when not in use?'),
(2, 'Have you visited the cafe at Moberly?');

INSERT INTO Car (brand, cost, status_gain, hp, speed) VALUES
('Porsche', 700000, 100, 650, 320),
('Ferrari', 790000, 120, 600, 340),
('Lamborghini', 700000, 150, 650, 350),
('Aston Martin', 400000, 90, 430, 310),
('McLaren', 950000, 110, 570, 730),
('Bugatti', 800000, 200, 1000, 400),
('Rolls Royce', 750000, 130, 520, 250),
('Bentley', 500000, 95, 500, 480),
('Maserati', 350000, 80, 410, 500),
('BMW M4', 650000, 70, 473, 550),
('Audi R8', 340000, 130, 562, 430),
('Mercedes-Benz', 450000, 90, 496, 250),
('Tesla', 620000, 70, 300, 260),
('Nissan GT-R', 415000, 120, 565, 315),
('Jaguar F-Type R', 430000, 90, 550, 186);

`;

        pool.query(SQLSTATEMENT, (error, results, fields) => {
            if (error) {
                console.error("Error creating tables:", error);
            } else {
                console.log("Tables created successfully");
            }
            process.exit();
        });
    }
});
