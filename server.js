const express = require('express');
const bodyParser = require('body-parser');

const widgetsRouter = require('./routes/widgets');
const dashboardsRouter = require('./routes/dashboards');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/widgets', widgetsRouter);
app.use('/api/dashboards', dashboardsRouter);

app.use(function(req, res) {
    res.status(404).json({error: "url not found", url: req.originalUrl});
});

module.exports = app;
