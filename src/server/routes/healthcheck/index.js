const express = require('express');
const router = new express.Router();

module.exports = router;

router.get('/healthcheck', (req, res) => {
  res.json({status: 'ok'});
});
