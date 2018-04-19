const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send({title: "Hello World", value: 1, anotherValue: 2});
});

module.exports = router;
