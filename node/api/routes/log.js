const express = require('express');
const router = express.Router();

const logController = require('../controllers/logController');

router.get('/', logController.log_get_all);

router.get('/:entryId', logController.log_get_entry);

module.exports = router;