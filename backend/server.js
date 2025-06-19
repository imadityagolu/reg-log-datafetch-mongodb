const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const registerRoutes = require('./routes/register.routes');

const app = express();

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://adityasng420ak:aditya12345@cluster0.fgxyhi8.mongodb.net/test';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

app.use(registerRoutes);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server is up at http://localhost:${PORT}`));