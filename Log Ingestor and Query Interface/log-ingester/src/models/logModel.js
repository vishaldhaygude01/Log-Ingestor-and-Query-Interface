const mongoose = require('mongoose');

// Define the log schema
const logSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    resourceId: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    traceId: {
        type: String,
        required: true,
    },
    spanId: {
        type: String,
        required: true,
    },
    commit: {
        type: String,
        required: true,
    },
    metadata: {
        parentResourceId: String,
    },
});

// Create a Log model
const Log = mongoose.model('Log', logSchema);

module.exports = Log;