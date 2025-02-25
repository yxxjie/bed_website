# Premium Deluxe Motorsport (Gamified Survey System)

## Overview
Welcome to the User Management and Survey System! This project is a comprehensive platform designed to streamline the management of user data and interactions within the context of surveys and car dealerships. The system encompasses a wide range of functionalities, providing a seamless experience for users and administrators alike.

# End-to-End Login and Registration 
This repository contains a test suite to verify the login and registration functionality of a web application using Node.js, Express, MySQL, JSON Web Token and Bcrypt.

## Folder Structure

```
BED-CA2-YXXJIE       
├─ public                        
│  ├─ css                        
│  │  ├─ color.css               
│  │  └─ style.css               
│  ├─ images 
│  │  ├─ left.jpg  
│  │  ├─ photo1.jpg              
│  │  ├─ photo2.jpg  
│  │  ├─ photo3.jpg              
│  │  ├─ photo4.jpg  
│  │  ├─ photo5.jpg              
│  │  ├─ photo6.jpg  
│  │  ├─ photo7.jpg           
│  │  ├─ photo8.jpg   
│  │  ├─ photo9.jpg                
│  │  ├─ photo10.jpg   
│  │  ├─ photo11.jpg                
│  │  ├─ photo12.jpg  
│  │  ├─ photo13.jpg             
│  │  ├─ photo14.jpg  
│  │  ├─ photo15.jpg               
│  │  ├─ porsche.jpg
│  │  ├─ porscheLogo-removebg.png
│  │  ├─ porscheLogo.jpg
│  │  ├─ reference.txt   
│  │  └─ right.jpg            
│  ├─ js 
│  │  ├─ answerQuestion.js
│  │  ├─ createQuestion.js               
│  │  ├─ getCurrentURL.js
│  │  ├─ getSingleQuestionInfo.js     
│  │  ├─ getSingleUserInfo.js     
│  │  ├─ loginUser.js            
│  │  ├─ queryCmds.js           
│  │  ├─ registerUser.js   
│  │  ├─ review.js    
│  │  ├─ showAllAnswers.js   
│  │  ├─ showAllCars.js  
│  │  ├─ showAllUser.js  
│  │  ├─ updateQuestion.js  
│  │  ├─ updateUser.js  
│  │  ├─ userNavbarToggle.js   
│  │  ├─ userNavbarToggleForWallet.js 
│  │  └─ walletConversion.js   
│  ├─ car.html  
│  ├─ index.html                 
│  ├─ login.html                 
│  ├─ profile.html   
│  ├─ question.html              
│  ├─ register.html              
│  ├─ review.html
│  ├─ showAnswer.html  
│  ├─ updatePoints.html  
│  ├─ updateQuestion.html   
│  └─ updateUser.html         
├─ src                           
│  ├─ configs                    
│  │  ├─ createSchema.js         
│  │  └─ initTables.js           
│  ├─ controllers                
│  │  ├─ carController.js        
│  │  ├─ questionController.js     
│  │  ├─ reviewController.js     
│  │  └─ userController.js       
│  ├─ middlewares                
│  │  ├─ bcryptMiddleware.js     
│  │  └─ jwtMiddleware.js        
│  ├─ models                     
│  │  ├─ carModel.js            
│  │  ├─ questionModel.js          
│  │  ├─ reviewModel.js          
│  │  └─ userModel.js            
│  ├─ routes 
│  │  ├─ carRoutes.js                     
│  │  ├─ mainRoutes.js           
│  │  ├─ questionRoutes.js         
│  │  ├─ reviewRoutes.js              
│  │  └─ userRoutes.js           
│  ├─ services                   
│  │  └─ db.js                   
│  └─ app.js                     
├─ tests                         
│  └─ playwright.test.js       
├─ .gitignore
├─ index.js           
├─ package.json                  
└─ README.md                  
```

## Prerequisites

Before running the tests, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)
- Chromium browser (Playwright will use this as the default browser)

## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/ST0503-BED/bed-ca2-yxxjie`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Setting Up Environment Variables

This repository provides instructions for setting up environment variables using a `.env` file in an Express.js application. The environment variables will be used in the `db.js` file located in the `src/services` directory.

### Setup

To set up environment variables for your Express.js application, follow these steps:

1. Create a file named `.env` in the root directory of your project.
2. Open the `.env` file and add the following lines:

   ```
   DB_HOST=<your_database_host>
   DB_USER=<your_database_user>
   DB_PASSWORD=<your_database_password>
   DB_DATABASE=<your_database_name>
   JWT_SECRET_KEY=<your_secret_key>
   JWT_EXPIRES_IN=<duration>
   JWT_ALGORITHM=<selected_algorithm>
   ```

   Replace `<your_database_host>`, `<your_database_user>`, `<your_database_password>`, and `<your_database_name>` with the appropriate values for your database connection.

   Replace `<your_secret_key>`, `<duration>`, and `<selected_algorithm>` with the appropriate values for your JSON web token usage.

   For example:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=il0veAirmax2090
   DB_DATABASE=CA2
   JWT_SECRET_KEY=your-secret-key
   JWT_EXPIRES_IN=15m
   JWT_ALGORITHM=HS256
   ```

   Note: Make sure there are no spaces around the equal sign (=) in each line.

3. Save the `.env` file.

### Usage

The `db.js` file in the `src/services` directory uses the `dotenv` package to read the `.env` file and set the environment variables. Here's an example of how the `db.js` file should look:

```javascript
require('dotenv').config(); // Read .env file and set environment variables

const mysql = require('mysql2');

const setting = {
    connectionLimit: 10, // Set limit to 10 connections
    host: process.env.DB_HOST, // Get host from environment variable
    user: process.env.DB_USER, // Get user from environment variable
    password: process.env.DB_PASSWORD, // Get password from environment variable
    database: process.env.DB_DATABASE, // Get database from environment variable
    multipleStatements: true, // Allow multiple SQL statements
    dateStrings: true // Return date as string instead of Date object
}

const pool = mysql.createPool(setting);

module.exports = pool;
```

The `dotenv` package is used to load the environment variables from the `.env` file, and `process.env` is used to access these variables in your code.

Make sure to include the `require('dotenv').config();` line at the beginning of your file to load the environment variables from the `.env` file.

## Important Note

Ensure that the `.env` file is included in your `.gitignore` file to prevent sensitive information (such as database credentials) from being exposed in your version control system.

That's it! You have successfully set up environment variables using a `.env` file in your Express.js application. These variables can now be accessed in the `db.js` file or any other part of your application where needed.

Now you can move on to next part below.

## Install Dependencies

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   npm install
   ```

## Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   npm run init_tables
   ```

# Controllers

### User Controller
- **readAllUser**: Retrieves all users.
- **readUserById**: Retrieves a user by their ID.
- **updateUserById**: Updates a user by their ID.
- **walletConversionById**: Updates user's wallet.
- **getPoints**: Retrieves survey points for the authenticated user.
- **getWallet**: Retrieves wallet information for the authenticated user.
- **readCarById**: Reads a car by its ID.
- **readUserByUserId**: Reads user details by their ID.
- **checkUser**: Checks user validity.
- **checkUserBelongsToUser**: Checks if the user belongs to the authenticated user.
- **checkUserExist**: Checks if the user exists.
- **checkWallet**: Checks the user's wallet balance.
- **checkCarOwnByUser**: Checks if the car is owned by the user.
- **statusConversionById**: Updates the car status.
- **carOwnByUser**: Checks if the car is owned by the user.

### Car Controller
- **readAllCars**: Retrieves all cars.

### Review Controller
- **readAllReview**: Retrieves all reviews.
- **createReview**: Creates a new review.
- **readReviewById**: Retrieves a review by its ID.
- **updateReviewById**: Updates a review by its ID.
- **deleteReviewById**: Deletes a review by its ID.
- **reviewUserCheck**: Checks if the review belongs to the authenticated user.

### Question Controller
- **createNewQuestion**: Creates a new question.
- **readAllQuestion**: Retrieves all questions.
- **readQuestionById**: Retrieves a question by its ID.
- **updateQuestionById**: Updates a question by its ID.
- **deleteQuestionById**: Deletes a question by its ID.
- **checkQuestion**: Checks question validity.
- **checkQuestionBelongsToUser**: Checks if the question belongs to the authenticated user.
- **createAnswer**: Creates an answer for a question.
- **addPoints**: Adds points for answering a question.
- **readAnswerByQuestionId**: Retrieves

# Front-End Documentation

## Table of Contents
### Front End
1. [Home Page](#home-page)
2. [Login Page](#login-page)
3. [Register Page](#register-page)
4. [Profile](#profile-page)
5. [Survey Page](#survey-page)
6. [Dealership Page](#dealership-page)
7. [Reviews Page](#reviews-page)

### Main Webpages
#### Home Page
**URL:** `/index.html`
 
**Description:**
The Home Page serves as the entry point to the website. It provides an overview of the site's features and allows users to navigate to different sections.
 
**Key Features:**
- Welcome message
 
#### Login Page
**URL:** `/login.html`
 
**Description:**
The login page is where the users login to access their account and profile. Note that without registering/logging in most of the webiste's functionality is limited.
 
**Key Features:**
- Login form
 
#### Register Page
**URL:** `/register.html`
 
**Description:**
The Register page is where the users create their account.
 
**Key Features:**
- Register form
 
#### Survey Page
**URL:** `/question.html`
 
**Description:**
The Survey Page displays the survey questions and the options to update/delete/create questions. There is also a button to view all answers of a particular question, which would redirect to another html.
 
**Key Features:**
- List of survey questions
- Buttons to edit/delete/create questions
- Button to view all answers of a particular question
 
#### Dealership Page
**URL:** `/car.html`
 
**Description:**
The Store Page displays all the store items such as the Chests and Armours
 
**Key Features:**
- List all the store items
- Button to buy store items
 
#### Reviews Page
**URL:** `/review.html`
 
**Description:**
The Review Page displays all the reviews created and the options to update/delete/create reviews.
 
**Key Features:**
- List of Reviews
- Buttons to edit/delete/create Reviews
 
#### Profile Page
**URL:** `/profile.html`
 
**Description:**
The Profile page displays the user's details, including the user's points and the number of completed questions. It also displays the user's pets.
 
**Key Features:**
- List of User's Cars
- Button to update User's username
 
### Other Key Pages
- **URL:** `/showAnswer.html`
  - **Description:** Webpage to show all answers of a particular question
- **URL:** `/updatePoints.html`
  - **Description:** Webpage to convert points to money
- **URL:** `/updateQuestion.html`
  - **Description:** Webpage to update a survey question
- **URL:** `/updateUser.html`
  - **Description:** Webpage to update a username

# API Routes Documentation

## Introduction
This document provides an overview of the various API routes available in the application, including user, car, review, and question routes. Each section describes the purpose of the routes, the HTTP methods used, and any necessary middleware that is applied.

## Table of Contents
### Back End
1. [Authentication Routes](#authentication-routes)
2. [User Routes](#user-routes)
3. [Car Routes](#car-routes)
4. [Review Routes](#review-routes)
5. [Question Routes](#question-routes)

## Authentication Routes

### Login
- **Endpoint**: `/api/login`
- **Method**: POST
- **Description**: Authenticates a user and generates a JWT token.
- **Middleware**: `userController.login`, `bcryptMiddleware.comparePassword`, `jwtMiddleware.generateToken`, `jwtMiddleware.sendToken`

### Register
- **Endpoint**: `/api/register`
- **Method**: POST
- **Description**: Registers a new user, hashes their password, and generates a JWT token.
- **Middleware**: `userController.checkUsernameOrEmailExist`, `bcryptMiddleware.hashPassword`, `userController.register`, `jwtMiddleware.generateToken`, `jwtMiddleware.sendToken`

**Example Request:**
```json
{
 "username": " socuser321"
}
```

**Response:**
- **201 Created**, if successful. Example Response body: 
```json
{
  "user_id": 1,
  "username": " socuser321",
  "points": 0
}
```
**Error Handling:**
- **400 Bad Request**, if the request body is missing username
- **409 Conflict**, if provided username is already associated with another user

## Middlewares

### JWT Middleware
- **verifyToken**: Verifies the JWT token.
- **generateToken**: Generates a JWT token.
- **sendToken**: Sends the generated JWT token.

### Bcrypt Middleware
- **hashPassword**: Hashes the user's password.
- **comparePassword**: Compares the provided password with the hashed password.

## User Routes

### Get All Users
- **Endpoint**: `/api/user`
- **Method**: GET
- **Description**: Retrieves all users.
- **Controller**: `readAllUser`

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "user_id": 1,
  "username": "socuser321",
  "points": 0
 },
 {
  "user_id": 2,
  "username": "surveyKing",
  "points": 0
 }
]
```
### Get User By ID
- **Endpoint**: `/api/user/:id`
- **Method**: GET
- **Description**: Retrieves a user by their ID.
- **Controller**: `readUserById`

**Response:** 
- **200 OK**, if successful. Example Response body:
```json
{
 "user_id": 1,
 "username": "greenUser123",
 "completed_questions": 10,
 "points ": 10
}
```
**Error Handling:**
- **404 Not Found**, if the requested user_id does not exist.
### Update User By ID
- **Endpoint**: `/api/user/:id`
- **Method**: PUT
- **Description**: Updates a user by their ID.
- **Middleware**: `jwtMiddleware.verifyToken`, `controller.checkUser`, `controller.checkUserBelongsToUser`, `controller.checkUserExist`
- **Controller**: `updateUserById`

**Example Request:**
```json
{
 "username": " superSOC"
}
```

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
 "user_id": 1,
 "username": " superSOC ",
 "points ": 10
}
```
**Error Handling:**
- **404 Not Found**, if the requested user_id does not exist.
- **409 Conflict**, if the provided username is already associated with another user.
### Update User Wallet
- **Endpoint**: `/api/user/:id/money`
- **Method**: PUT
- **Description**: Updates user's wallet by their ID.
- **Middleware**: `jwtMiddleware.verifyToken`, `controller.checkUser`, `controller.checkUserBelongsToUser`, `controller.checkPoints`
- **Controller**: `walletConversionById`

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
    "message": "Wallet conversion successful"
}
```
**Error Handling:**
- **404 Not Found**, if the user does not have enough points.
- **409 Conflict**, if the user is converting other user's points.

### Get Cars Owned by User
- **Endpoint**: `/api/user/:id/car`
- **Method**: GET
- **Description**: Retrieves all cars owned by a user.
- **Controller**: `readAllCarsByUserId`, `readCarDetailsByCarIds`


**Response:** 
- **200 OK**, if successful. Example Response body:
```json
[
  {
    "brand": "Porsche",
    "hp": 650,
    "speed": 320,
    "cost": 700000,
    "status_gain": 100
  },
    {
    "brand": "Ferrari",
    "hp": 600,
    "speed": 340,
    "cost": 790000,
    "status_gain": 120
  },
]
```
**Error Handling:**
- **404 Not Found**, if the requested user does not own any cars.

### Get Survey Points
- **Endpoint**: `/api/user/survey/points`
- **Method**: GET
- **Description**: Retrieves survey points for the authenticated user.
- **Middleware**: `jwtMiddleware.verifyToken`
- **Controller**: `getPoints`
 
**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "points ": 10
 }
]
```
**Error Handling:**
- **401 Unauthorized**, if the token is expired or empty.

### Get Wallet
- **Endpoint**: `/api/user/car/wallet`
- **Method**: GET
- **Description**: Retrieves wallet information for the authenticated user.
- **Middleware**: `jwtMiddleware.verifyToken`
- **Controller**: `getWallet`
 
**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "wallet ": 50000
 }
]
```
**Error Handling:**
- **401 Unauthorized**, if the token is expired or empty.
### Update User Car Status 
- **Endpoint**: `/api/user/token/car`
- **Method**: PUT
- **Description**: Updates the status of a car owned by a user.
- **Middleware**: `jwtMiddleware.verifyToken`, `controller.readCarById`, `controller.readUserByUserId`, `controller.checkWallet`, `controller.checkCarOwnByUser`
- **Controller**: `statusConversionById`, `carOwnByUser`

**Example Request:**
```json
{
"brand": "Porsche",
"user_id": 1,
"wallet": 800000
}
```

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "wallet": 100000,
  "status": 100 
 }
]
```
**Error Handling:**
- **400 Bad Request**, if the user have insufficient money.
- **409 Bad Request**, if the user has already own the car.
## Car Routes

### Get All Cars
- **Endpoint**: `/api/car`
- **Method**: GET
- **Description**: Retrieves all cars.
- **Controller**: `readAllCars`

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
  {
    "brand": "Porsche",
    "hp": 650,
    "speed": 320,
    "cost": 700000,
    "status_gain": 100
  },
  {
    "brand": "Ferrari",
    "hp": 600,
    "speed": 340,
    "cost": 790000,
    "status_gain": 120
  }
]
```

## Review Routes

### Get All Reviews
- **Endpoint**: `/api/review`
- **Method**: GET
- **Description**: Retrieves all reviews.
- **Controller**: `readAllReview`

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "username": "User1",
  "user_id": 1,
  "rating_amt": 5
 },
 {
  "username": "User2",
  "user_id": 2,
  "rating_amt": 3
 }
]
```
### Create a Review
- **Endpoint**: `/api/review`
- **Method**: POST
- **Description**: Creates a new review.
- **Middleware**: `jwtMiddleware.verifyToken`
- **Controller**: `createReview`

**Example Request:**
```json
{
"rating_amt": 3,
"user_id": 1
}
```

**Response:**
- **201 Created**, if successful. Example Response body:
```json
{
"review_id": 1,
"rating_amt": 3,
"creator_id ": 1
}
```

### Get Review By ID
- **Endpoint**: `/api/review/:id`
- **Method**: GET
- **Description**: Retrieves a review by its ID.
- **Controller**: `readReviewById`

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "username": "User1",
  "user_id": 1,
  "rating_amt": 5
 }
]
```
### Update Review By ID
- **Endpoint**: `/api/review/:id`
- **Method**: PUT
- **Description**: Updates a review by its ID.
- **Middleware**: `jwtMiddleware.verifyToken`, `controller.reviewUserCheck`
- **Controller**: `updateReviewById`

**Example Request:**
```json
{
  "user_id": 1,
  "rating_amt": "2"
}
```

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
 "review_id": 1,
 "rating_amt": 2,
 "user_id": 1
}
```
**Error Handling:**
- **400 Bad Request**, if the request body is missing rating_amt or user_id.
- **404 Not Found**, if the requested review_id does not exist.
- **403 Forbidden**, if user_id is different from user_id who is logged in due to not correct owner.
  
### Delete Review By ID
- **Endpoint**: `/api/review/:id`
- **Method**: DELETE
- **Description**: Deletes a review by its ID.
- **Middleware**: `jwtMiddleware.verifyToken`, `controller.reviewUserCheck`
- **Controller**: `deleteReviewById`

**Response:**
- **204 No Content**, if successful.  

**Error Handling:**  
 - **404 Not Found**, if the requested review_id does not exist.
 - **403 Forbidden**, if user_id is different from user_id who is logged in due to not correct owner.
## Question Routes

### Create a New Question
- **Endpoint**: `/api/question`
- **Method**: POST
- **Description**: Creates a new question.
- **Middleware**: `jwtMiddleware.verifyToken`
- **Controller**: `createNewQuestion`

**Example Request:**
```json
{
"question": "Do you buy fruits from FC6?",
"user_id": 1
}
```

**Response:**
- **201 Created**, if successful. Example Response body:
```json
{
"question_id": 1,
"question": "Do you buy fruits from FC6?",
"creator_id ": 1
}
```
**Error Handling:**
- **400 Bad Request**, if the request body is missing question or user_id

### Get All Questions
- **Endpoint**: `/api/question`
- **Method**: GET
- **Description**: Retrieves all questions.
- **Controller**: `readAllQuestion`

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "question_id": 1,
  "question": "Do you buy fruits from FC6?",
  "creator_id ": 1
 },
 {
  "question_id": 2,
  "question": "Is the fried chicken at FC5 salty?",
  "creator_id ": 1
 }
]
```
### Get Question By ID
- **Endpoint**: `/api/question/:question_id`
- **Method**: GET
- **Description**: Retrieves a question by its ID.
- **Controller**: `readQuestionById`

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "question_id": 1,
  "question": "Do you buy fruits from FC6?",
  "creator_id ": 1
 }
]
```
### Update Question By ID
- **Endpoint**: `/api/question/:id`
- **Method**: PUT
- **Description**: Updates a question by its ID.
- **Middleware**: `jwtMiddleware.verifyToken`, `controller.checkQuestion`, `controller.checkQuestionBelongsToUser`
- **Controller**: `updateQuestionById`

**Example Request:**
```json
{
  "user_id": 1,
  "question": "Do you buy fruits from FC4?"
}
```

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
 "question_id": 1,
 "question": "Do you buy fruits from FC4?",
 "creator_id ": 1
}
```
**Error Handling:**
- **400 Bad Request**, if the request body is missing question or user_id.
- **404 Not Found**, if the requested question_id does not exist.
- **403 Forbidden**, if creator_id is different from user_id due to not correct owner.

### Delete Question By ID
- **Endpoint**: `/api/question/:id`
- **Method**: DELETE
- **Description**: Deletes a question by its ID.
- **Middleware**: `jwtMiddleware.verifyToken`, `controller.checkQuestion`, `controller.checkQuestionBelongsToUser`
- **Controller**: `deleteQuestionById`

**Response:**
- **204 No Content**, if successful.  

**Error Handling:**  
 - **404 Not Found**, if the requested question_id does not exist.

### Create an Answer for a Question
- **Endpoint**: `/api/question/token/:question_id/answer`
- **Method**: POST
- **Description**: Creates an answer for a question and adds 5 points.
- **Middleware**: `jwtMiddleware.verifyToken`
- **Controller**: `createAnswer`, `addPoints`

**Example Request:**
```json
{
 "user_id": 1,
 "answer": true,
 "creation_date": "2023-07-30",
 "additional_notes": "I love it"
}
```

**Response:**
- **201 Created**, if successful. Example Response body:
```json
{
 "answer_id": 1,
 "answered_question_id": 1,
 "participant_id": 1,
 "answer": true,
 "creation_date" :"2023-07-30",
 "additional_notes": "I love it"
}
```
**Error Handling:**
- **400 Bad Request**, if the request body is missing creation_date,answer or user_id.
- **404 Not Found**, if the requested user_id or question_id does not exist.
  
### Get Answers for a Question
- **Endpoint**: `/api/question/:question_id/answer`
- **Method**: GET
- **Description**: Retrieves all answers for a specific question.
- **Controller**: `readAnswerByQuestionId`

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "participant_id": 2,
  "answer": true,
  "creation_date" :"2023-07-30",
  "additional_notes": "I love it"
 },
 {
  "participant_id": 3,
  "answer": false,
  "creation_date" :"2023-07-30",
  "additional_notes": "I don’t like fruits"
 }
]
```
**Error Handling:**
- **404 Not Found**, if the requested question_id does not have any answer.