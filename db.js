const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.log('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL Database');
  }
});
db.query('SELECT 1 + 1 AS result', (err, res) => {
  if (err) console.log('❌ Test query failed:', err);
  else console.log('✅ Test query successful:', res);
});

module.exports = db;
