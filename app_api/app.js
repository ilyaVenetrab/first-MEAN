const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./models/db');

const indexAPI = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.use(cors());


console.log(path.join(__dirname, '../dist/first-mean/index.html'));
app.use(express.static(path.join(__dirname, '../dist/first-mean')));
app.use('/', express.static(path.join(__dirname, '../dist/first-mean/index.html')));



app.use('/api', indexAPI);
// Create port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Connected to port ' + port);
});
// Find 404 and hand over to error handler
app.use((_req, _res, next) => {
    next(createError(404));
});
// error handler
app.use(function (err, _req, res, _next) {
    // Log error message in our server's console
    console.error(err.message);
    // If err has no specified error code, set error code to 'Internal Server Error (500)'
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    // All HTTP requests must have a response, so let's send back an error with its status code and message
    res.status(err.statusCode).send(err.message);
});
