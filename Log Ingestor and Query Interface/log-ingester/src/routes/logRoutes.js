const express = require('express');
const router = express.Router();
const Log = require('../models/logModel');

// Endpoint for log ingestion
router.post('/logs', async (req, res) => {
    try {
        const log = new Log(req.body);
        await log.save();
        res.status(201).send('Log ingested successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error ingesting log');
    }
});


module.exports = router;