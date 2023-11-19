
module.exports = {
    db: {
        url: 'mongodb://localhost:27017/logs', // MongoDB connection URL
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
};
