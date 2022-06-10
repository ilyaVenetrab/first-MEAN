require('./locations');
let mongoose = require('mongoose');
// const { request } = require('express');
let gracefulShutdown;

let dbURL = 'mongodb://localhost/first-MEAN';
if (process.env.NODE_ENV === 'production') {
    dbURL = 'mongodb+srv://root:root@cluster0.dsk27.mongodb.net/MEAN';
}
mongoose.connect(dbURL);

mongoose.connection.on('connected', () => {
    console.log(process.env.NODE_ENV);
    console.log(`Mongoose connected to ${dbURL}`);
});

mongoose.connection.on('error', (error) => {
    console.log(`Mongoose connected error: ${error}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through: ${msg}`);
        callback();
    });
};

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});
