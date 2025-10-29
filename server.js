const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
app.use(bodyParser.json());

// ROUTES
app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
