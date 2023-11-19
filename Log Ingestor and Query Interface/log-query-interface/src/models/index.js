const mongoose = require('mongoose');
const inquirer = require('inquirer');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/logs', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Log model
const Log = mongoose.model('Log', new mongoose.Schema({
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
}));

// CLI for log querying
async function queryLogs() {
    const filters = await inquirer.prompt([
        { type: 'input', name: 'level', message: 'Filter by level:' },
        { type: 'input', name: 'message', message: 'Filter by message:' },
        { type: 'input', name: 'resourceId', message: 'Filter by resourceId:' },
        { type: 'input', name: 'timestamp', message: 'Filter by timestamp (optional):' },
        // Add other filters based on your requirements
    ]);

    let query = {};
    for (const key in filters) {
        if (filters[key]) {
            if (key === 'timestamp') {
                query[key] = new Date(filters[key]);
            } else {
                query[key] = filters[key];
            }
        }
    }

    // Perform the query
    const result = await Log.find(query);
    console.log(result);
}

module.exports = {
    queryLogs,
};