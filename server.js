const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Require routes used by the api
const widgetsRouter = require('./api/routes/widgets');
const dashboardsRouter = require('./api/routes/dashboards');

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

// Handle api routes, see files in api/routes for implementation
app.use('/api/widgets', widgetsRouter);
app.use('/api/dashboards', dashboardsRouter);

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
