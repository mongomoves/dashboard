const express = require('express');
const router = express.Router();

const dashboardsController = require('../controllers/dashboardsController');

router.get('/', dashboardsController.getAll);

router.post('/', dashboardsController.createDashboard);

router.get('/:dashboardId', dashboardsController.getDashboard);

router.delete('/:dashboardId', dashboardsController.deleteDashboard);

module.exports = router;