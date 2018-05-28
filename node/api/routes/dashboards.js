const express = require('express');
const router = express.Router();

const dashboardsController = require('../controllers/dashboardsController');

router.get('/', dashboardsController.dashboards_get_all);

router.post('/', dashboardsController.dashboards_create_dashboard);

router.get('/:dashboardId', dashboardsController.dashboards_get_dashboard);

router.delete('/:dashboardId', dashboardsController.dashboards_delete_dashboard);

module.exports = router;