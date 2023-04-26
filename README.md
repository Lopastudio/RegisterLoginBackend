# RegisterLoginBackend
This is a simple user authentication API built using Express, MySQL, bcrypt and JWT. The API provides endpoints to register a new user, login an existing user and set up the necessary database tables.
Requirements

To use this API, you will need to have Node.js and MySQL installed on your machine.
Setup

    Clone the repository:

bash

git clone https://github.com/your-username/express-mysql-jwt-authentication-api.git

    Install dependencies:

bash

cd express-mysql-jwt-authentication-api
npm install

    Create a new MySQL database and run the following SQL script to create the necessary users table:

sql

CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(191) NOT NULL,
    password VARCHAR(255) NOT NULL,
    favorites TEXT,
    PRIMARY KEY (id),
    UNIQUE KEY (username)
);

    Update the MySQL connection details in the connection object in the index.js file:

javascript

const connection  = mysql.createConnection({
    host: '<your-mysql-host>',
    user: '<your-mysql-username>',
    password: '<your-mysql-password>',
    database: '<your-mysql-database>'
});

    Run the server:

sql

npm start

Endpoints
/setup-database (POST)

This endpoint creates the necessary users table in the MySQL database. It does not require any parameters.
/register (POST)

This endpoint registers a new user. It requires the following parameters in the request body:

    email (string): The user's email address.
    username (string): The user's username.
    password (string): The user's password.
    favorites (string): The user's favorites.

/login (POST)

This endpoint logs in an existing user. It requires the following parameters in the request body:

    username (string): The user's username.
    password (string): The user's password.

Security

This API uses bcrypt to securely store passwords in the database and JWT to generate and verify tokens for authenticated requests. The secret key used to sign the JWT tokens is stored in the index.js file and should be kept secret in production environments.
License

This project is licensed under the MIT License - see the LICENSE file for details.
