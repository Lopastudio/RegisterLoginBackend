// hours wasted: 5
// Made by Lopastudio
// Github: https://github.com/Lopastudio/

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const cors = require('cors');
const secret_key = "your_secret_key";

const app = express();
app.use(cors());

const saltRounds = 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection  = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
  });

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

//setting up databases
app.post('/setup-database', (req, res) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT(11) NOT NULL AUTO_INCREMENT,
            email VARCHAR(255) NOT NULL,
            username VARCHAR(191) NOT NULL,
            password VARCHAR(255) NOT NULL,
            favorites TEXT,
            PRIMARY KEY (id),
            UNIQUE KEY (username)
        );
    `;
  
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error creating users table:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      console.log('Users table created!');
      res.json({ message: 'Database tables created!' });
    });
  });
  
// Register API
app.post('/register', (req, res) => {
  const { email, username, password, favorites } = req.body;

  // Encrypt password
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error encrypting password:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Insert user data into database
    const sql = 'INSERT INTO users (email, username, password, favorites) VALUES (?, ?, ?, ?)';
    const values = [email, username, hashedPassword, favorites];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting user into database:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      console.log(`User ${username} registered!`);

      // Create JWT token
      const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });

      res.json({ token });
    });
  });
});

// Login API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Get user data from database
  const sql = 'SELECT * FROM users WHERE username = ?';
  const values = [username];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error getting user data from database:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length === 0) {
      console.log(`User ${username} not found!`);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare passwords
    bcrypt.compare(password, result[0].password, (err, passwordMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!passwordMatch) {
        console.log(`Invalid password for user ${username}!`);
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      console.log(`User ${username} logged in!`);

      // Create JWT token
      const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });

      res.json({ token });
    });
  });
});

app.listen(3050, () => console.log('Server started on port 3050!'));
