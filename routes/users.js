const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT id, first_name, last_name, email, phone_number, address FROM users', (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching users', error: err });
    res.json(result);
  });
});

module.exports = router;
