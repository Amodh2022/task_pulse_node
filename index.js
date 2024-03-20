const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      res.status(500).send('Internal Server Error');
      throw error;
    }
    res.json(results);
  });
});

// Get a user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).send('Internal Server Error');
      throw error;
    }
    if (results.length === 0) {
      res.status(404).send('User not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (error, results) => {
    if (error) {
      res.status(500).send('Internal Server Error');
      throw error;
    }
    res.status(201).send('User added successfully');
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (error, results) => {
    if (error) {
      res.status(500).send('Internal Server Error');
      throw error;
    }
    res.send('User updated successfully');
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).send('Internal Server Error');
      throw error;
    }
    res.send('User deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
