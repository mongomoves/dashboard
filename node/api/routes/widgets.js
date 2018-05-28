const express = require('express');
const router = express.Router();

const widgetsController = require('../controllers/widgetsController');

router.get('/', widgetsController.widgets_get_all);

router.post('/', widgetsController.widgets_create_widget);

router.get('/:widgetId', widgetsController.widgets_get_widget);

router.delete('/:widgetId', widgetsController.widgets_delete_widget);

module.exports = router;