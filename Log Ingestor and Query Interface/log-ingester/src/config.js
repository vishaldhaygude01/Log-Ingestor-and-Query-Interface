module.exports = {
    port: process.env.PORT || 3000, // Port for the HTTP server
    db: {
        url: 'mongodb://localhost:27017/logs', // MongoDB connection URL
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
};