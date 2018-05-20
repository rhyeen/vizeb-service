const express = require('express');
const router = new express.Router();
const controller = require('./controller');

module.exports = router;

router.route('/example')
  .get(controller.getExample)
  .post(controller.createExample)
  .put(controller.updateExample)
  .delete(controller.deleteExample);
