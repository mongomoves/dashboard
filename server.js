const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");

const widgetsRouter = require('./routes/widgets');
const dashboardsRouter = require('./routes/dashboards');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/widgets', widgetsRouter);
app.use('/api/dashboards', dashboardsRouter);

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

app.use(function(req, res) {
    res.status(404).json({error: "url not found", url: req.originalUrl});
});

module.exports = app;
