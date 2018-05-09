const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Require routes used by the api
const widgetsRouter = require('./api/routes/widgets');
const dashboardsRouter = require('./api/routes/dashboards');
const logRouter = require('./api/routes/log');

const app = express();

// Connect to MongoDB Atlas
mongoose.connect(
    'mongodb+srv://axis-admin:'
    + process.env.MONGODB_ATLAS_PASSWORD
    + '@axis-dashboard-xxb8y.mongodb.net/test'
);

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS support
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Handle api routes, see files in api/routes for implementation
app.use('/api/widgets', widgetsRouter);
app.use('/api/dashboards', dashboardsRouter);
app.use('/api/log', logRouter);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
