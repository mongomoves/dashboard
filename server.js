const express = require('express');
const bodyParser = require('body-parser');

const testRouter = require('./routes/test');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/test', testRouter);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

module.exports = app;
