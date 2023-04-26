# Authentication API
### !!! ***WARNING** THIS PROJECT DOES NOT INCLUDE ANY SOURCE VALIDATION SO ANYONE THAT KNOWS API´S URL WOULD BE ABLE TO USE IT !!!*

This is a Node.js server-side API for user authentication using MySQL, Express, and bcrypt. It exposes the following endpoints:
- `/setup-database`: creates the necessary tables in the database.
- `/register`: creates a new user account in the database.
- `/login`: authenticates an existing user and returns a JSON Web Token (JWT).
## Dependencies

This API uses the following dependencies:

- `express`: web application framework for Node.js.
- `body-parser`: middleware for parsing HTTP request bodies.
- `bcrypt`: password hashing function.
- `jsonwebtoken`: JSON Web Token implementation.
- `mysql`: MySQL driver for Node.js.
- `cors`: middleware for enabling Cross-Origin Resource Sharing.

## Configuration

Before running the application, you need to configure the database connection by setting the following properties in the connection object:

- `host`: the hostname of the MySQL server.
- `user`: the MySQL username.
- `password`: the MySQL password.
- `database`: the name of the MySQL database.

You also need to set a value for the `secret_key` parameter in the `jwt.sign` function calls in the `/register` and `/login` endpoints.
## Installation

Install my-project with npm

```bash
  npm init
  git clone https://github.com/Lopastudio/RegisterLoginBackend.git
  npm install express body-parser bcrypt jsonwebtoken mysql cors
```
And now we just start it up
```bash
  node index.js
```
    
## API Endpoints

### /setup-database

This endpoint creates the necessary tables in the database. It expects no request parameters and returns a JSON object with a `message` property.

#### Request

```arduino
POST /setup-database
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Database tables created!"
}
```

### /register

This endpoint creates a new user account in the database. It expects a JSON object with the following properties in the request body:

    email: the user's email address.
    username: the user's username.
    password: the user's password.
    favorites: a JSON array of the user's favorite items.

#### Request

```
POST /register
Content-Type: application/json

{
  "email": "example@example.com",
  "username": "example",
  "password": "password123",
  "favorites": ["item1", "item2", "item3"]
}
```

#### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "<JWT token>"
}
```

/login

This endpoint authenticates an existing user and returns a JSON Web Token (JWT). It expects a JSON object with the following properties in the request body:

    username: the user's username.
    password: the user's password.

Request

```
POST /login
Content-Type: application/json

{
  "username": "example",
  "password": "password123"
}
```
Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "<JWT token>"
}
```
## License

This project is licensed under [MIT](https://choosealicense.com/licenses/mit/) license.
## Simple usage in JavaScript

### Creating Databases

To create the necessary tables in the database, make a POST request to the `/setup-database` endpoint:

```javascript
fetch('http://localhost:3050/setup-database', { 
  method: 'POST' 
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```

### Registering a new user

To register a new user, make a POST request to the /register endpoint:

```javascript

const userData = {
  email: 'example@example.com',
  username: 'exampleUser',
  password: 'password123',
  favorites: 'exampleFavorite'
};

fetch('http://localhost:3050/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```

This will insert the user data into the users table in the database, and return a JWT token that can be used to authenticate the user in subsequent requests.

### Logging in

To log in a user, make a POST request to the /login endpoint:

```javascript
const loginData = {
  username: 'exampleUser',
  password: 'password123'
};

fetch('http://localhost:3050/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(loginData)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```
