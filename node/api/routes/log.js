const express = require('express');
const router = express.Router();

const logController = require('../controllers/logController');

router.get('/', logController.getAll);

router.get('/:entryId', logController.getEntry);

module.exports = router;