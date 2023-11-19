const mongoose = require('mongoose');
const logQuery = require('./logQuery');
const config = require('./config');

// Connect to MongoDB
mongoose.connect(config.db.url, config.db.options);

// Run the log querying CLI
logQuery.queryLogs();