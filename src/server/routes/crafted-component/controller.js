const model = require('./model');
const errorHandler = require('../../services/errors/status-error-handling');

module.exports.createCraftedComponent = function(req, res) {
  const id = req.params.id;
  if (!_isValidId(id)) {
    return _handleInvalidId(res, id);
  }
  const body = req.body;
  if (!_isValidBody(body)) {
    return _handleInvalidBody(res, body);
  }
  model.createCraftedComponent(id, body.style, body.classes, body.text)
  .then(
    () => res.send('Success'),
    (error) => errorHandler.handleError(error, res)
  );
}

function _isValidId(id) {
  return !!id;
}

function _isValidBody(body) {
  return 'style' in body && 'text' in body && 'classes' in body;
}

function _handleInvalidId(res, id) {
  return res.status(400).send(`Invalid id: ${id}`);
}

function _handleInvalidBody(res, body) {
  let requiredProperty = 'style';
  if (!(requiredProperty in body)) {
    return res.status(400).send(_getMissingPropertyText(requiredProperty));
  }
  requiredProperty = 'text';
  if (!(requiredProperty in body)) {
    return res.status(400).send(_getMissingPropertyText(requiredProperty));
  }
  requiredProperty = 'classes';  
  if (!(requiredProperty in body)) {
    return res.status(400).send(_getMissingPropertyText(requiredProperty));
  }
  return res.status(500).send('Unexpected state');
}

function _getMissingPropertyText(requiredProperty) {
  return `Missing property: '${requiredProperty}' from payload`;
}
