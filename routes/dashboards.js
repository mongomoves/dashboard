const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).json({
        message: 'Handling GET requests to /dashboards'
    });
});

router.post('/', function(req, res, next) {
    res.status(200).json({
        message: 'Handling POST requests to /dashboards'
    });
});

router.get('/:dashboardId', function(req, res, next) {
    const id = req.params.dashboardId;

    res.status(200).json({
        message: 'Handling GET requests to /dashboards/id',
        id: id
    });
});

module.exports = router;