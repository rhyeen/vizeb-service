const log = require('services/logger/');
const express = require('express');
const router = new express.Router();

module.exports = router;

router.all('*', catchAll);

function catchAll(req, res) {
  // @TODO - Need to be more selective about what request properties we log
  log.info('404', {request: req});
  res.sendStatus(404);
}
