const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json()); //middleware //!!for getting data from the request
app.use(express.static(`${__dirname}/public`)) // middleware for static files
app.use((req, res, next) => { // private middleware
    req.requestTime = new Date().toISOString();
    next();
})

// 3) ROUTE
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;


