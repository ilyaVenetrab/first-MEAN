const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const sassMiddleware = require('node-sass-middleware');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./models/db');

const indexRouter = require('../app_server/routes');
const usersRouter = require('../app_server/routes/users');
const indexAPI = require('./routes');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'app_server', 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/first-mean')));
app.use('/', express.static(path.join(__dirname, 'dist/first-mean')));
app.use('/', indexRouter);
app.use('/api', indexAPI);
app.use('/users', usersRouter);
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(sassMiddleware({
//     src: path.join(__dirname, 'public'),
//     dest: path.join(__dirname, 'public'),
//     indentedSyntax: false, // true = .sass and false = .scss
//     sourceMap: true
// }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/api', indexAPI);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(_req, _res, next) {
//     next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });
//
// module.exports = app;

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
