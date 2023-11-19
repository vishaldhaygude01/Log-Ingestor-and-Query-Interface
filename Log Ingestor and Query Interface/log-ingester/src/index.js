const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const PORT = config.port;

app.use(bodyParser.json());

// MongoDB setup
mongoose.connect(config.db.url, config.db.options);

// Log model
const logSchema = new mongoose.Schema({
    level: String,
    message: String,
    resourceId: String,
    timestamp: Date,
    traceId: String,
    spanId: String,
    commit: String,
    metadata: {
        parentResourceId: String,
    },
});

const Log = mongoose.model('Log', logSchema);

// Log ingestion endpoint
app.post('/logs', async (req, res) => {
    try {
        const log = new Log(req.body);
        await log.save();
        res.status(201).send('Log ingested successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error ingesting log');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Log ingestor server running on port ${PORT}`);
});