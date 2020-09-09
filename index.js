const express = require('express');

const app = express();

// Import routes
const authRoutes = require('./routes/auth');

// Routes middlewares
app.use('/api/user', authRoutes);

app.listen(3000);