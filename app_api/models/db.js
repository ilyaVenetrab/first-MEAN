require('./locations');
let mongoose = require('mongoose');
let gracefulShutdown;

let dbURL = 'mongodb://localhost/MEAN';
if (process.env.NODE_ENV === 'production') {
    dbURL = 'mongodb+srv://root:root@cluster0.dsk27.mongodb.net/MEAN';
}
mongoose
    .connect(dbURL)
    .then(x => {
        console.log(`NODE_ENV => ${process.env.NODE_ENV}`);
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}", Database url: "${dbURL}"`);
    })
    .catch(err => {
        console.log(`Mongoose connected error: ${err}`);
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
