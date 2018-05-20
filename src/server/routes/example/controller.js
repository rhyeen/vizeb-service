const model = require('./model');
const errorHandler = require('../../services/errors/status-error-handling');

module.exports.getExample = function(req, res) {
  const exampleId = req.query.exampleId;
  if (!_isValidExampleId(exampleId)) {
    return _handleInvalidExampleId(res, exampleId);
  }
  model.getExample(exampleId)
  .then(
    (example) => res.send(example),
    (error) => errorHandler.handleError(error, res)
  );
}

module.exports.createExample = function(req, res) {
  const example = req.body;
  model.createExample(example)
  .then(
    (exampleId) => res.send(exampleId),
    (error) => errorHandler.handleError(error, res)
  );
}

module.exports.updateExample = function(req, res) {
  const exampleId = req.query.exampleId;
  if (!_isValidExampleId(exampleId)) {
    return _handleInvalidExampleId(res, exampleId);
  }
  const example = req.body;
  model.updateExample(exampleId, example)
  .then(
    () => res.send('Success'),
    (error) => errorHandler.handleError(error, res)
  );
}

module.exports.deleteExample = function(req, res) {
  const exampleId = req.query.exampleId;
  if (!_isValidExampleId(exampleId)) {
    return _handleInvalidExampleId(res, exampleId);
  }
  model.deleteExample(exampleId)
  .then(
    () => res.send('Success'),
    (error) => errorHandler.handleError(error, res)
  );
}

function _isValidExampleId(exampleId) {
  return !!exampleId;
}

function _handleInvalidExampleId(res, exampleId) {
  return res.status(400).send(`Invalid exampleId: ${exampleId}`);
}
