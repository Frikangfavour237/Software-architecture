const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();
// Registration Route

router.post('/register', (req, res) => {
    console.log("register route hit", req.body);
  const { first_name, last_name, email, number, address, password } = req.body;

  if (!first_name || !last_name || !email || !number || !address || !password)
    return res.status(400).json({ message: 'All fields required' });

  const hashed = bcrypt.hashSync(password, 10);
  const sql = `INSERT INTO users (first_name, last_name, email, phone_number, address, password)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [first_name, last_name, email, number, address, hashed], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error registering user', error: err });
    res.status(201).json({ message: 'User registered successfully' });
  });
});
 // Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  const sql = `SELECT * FROM users WHERE email = ?`;

  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0)
      return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword)
      return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      }
    });
  });
});


module.exports = router;
