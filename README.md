# Login-advanced-plateRecognizer

- Developer: Jia Chau
- Date: 17/2/2024

## Project Description

A login-register project template created using React as the frontend and Node as the backend. This project leverages password hashing, express-session, and multi-level user role authentication system. 

## Database

Usernames, passwords and user roles are stored in MariaDB database hosted on AWS RDS. 

## Plate recognizer API

Just for testing and learning purposes, only managerial user roles have permission to access the plate recognizer page. Free plate recognizer API obtained from https://app.platerecognizer.com.

## Quickstart

1. Clone the repository, 
```
git clone https://github.com/Jiayii03/login-advanced-plateRecognizer.git
```

2. Cd to both client and server, install the dependencies and start the application.
```
cd client
npm i
npm start

cd ..

cd server
npm i
npm start
```

3. Add the necessary environment variables in .env file.
