const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logRoutes = require('./routes/logRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/logs', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/api', logRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Log ingestor server running on port ${PORT}`);
});