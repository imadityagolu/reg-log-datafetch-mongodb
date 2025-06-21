const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const registerRoutes = require('./routes/register.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const clientRoutes = require('./routes/client.routes');

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://adityasng420ak:aditya12345@cluster0.fgxyhi8.mongodb.net/test';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

app.use(registerRoutes);
app.use(dashboardRoutes);
app.use(clientRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is up at http://localhost:${PORT}`));