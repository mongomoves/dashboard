const express = require('express');
const router = express.Router();

const widgetsController = require('../controllers/widgetsController');

router.get('/', widgetsController.getAll);

router.post('/', widgetsController.createWidget);

router.get('/:widgetId', widgetsController.getWidget);

router.delete('/:widgetId', widgetsController.deleteWidget);

module.exports = router;