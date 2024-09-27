const express = require('express');
const app = express();
const db = require('../database'); // Import the database module

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Handlebars as the view engine
app.set("view engine", "hbs");

// Route to render the list of persons
app.get('/', (req, res) => {
    // Fetch data from the database and render the view
    db.query('SELECT * FROM Persons', (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.send('Error fetching data');
            return;
        }
        res.render('persons', { persons: results });
    });
});

// Route to render the add person form
app.get('/add', (req, res) => {
    res.render('persons_add');
});

// Route to handle form submissions (POST request)
app.post('/add', (req, res) => {
    const { name, age, city } = req.body;

    // Insert data into the database
    const query = 'INSERT INTO Persons (name, age, city) VALUES (?, ?, ?)';
    db.query(query, [name, age, city], (err, results) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.send('Error adding person');
            return;
        }
        console.log(`Inserted person: Name=${name}, Age=${age}, City=${city}`);
        res.render('success', { name, age, city });
    });
});



// Start the server
app.listen(4444, () => {
    console.log("Server started on http://localhost:4444/");
});
