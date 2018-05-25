const express = require('express');
const router = new express.Router();
const controller = require('./controller');

module.exports = router;

router.route('/crafted-component/:id')
  .post(controller.createCraftedComponent);
