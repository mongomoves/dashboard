const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).json({
        message: 'Handling GET requests to /widgets'
    });
});

router.post('/', function(req, res, next) {
    res.status(200).json({
        message: 'Handling POST requests to /widgets'
    });
});

router.get('/:widgetId', function(req, res, next) {
    const id = req.params.widgetId;

    res.status(200).json({
        message: 'Handling GET requests to /widgets/id',
        id: id
    });
});

module.exports = router;