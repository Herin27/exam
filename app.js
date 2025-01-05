const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3001;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger', // Replace with your MySQL password
    database: 'new',  // Replace with your database name
    port: 3308,        // Adjust the port if needed
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Handle sign-up form submission
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Insert user data into the Login table
    const query = `INSERT INTO Login (username, email, password) VALUES (?, ?, ?)`;
    db.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data into Login table:', err);
            res.status(500).send('An error occurred while signing up.');
            return;
        }
        console.log('User data inserted:', result);
        res.send('Sign-up successful! Your data has been stored.');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
