const log = require('services/logger');

module.exports = errorLoggingMiddleware;

function errorLoggingMiddleware(error, req, res, next) {
  const errorMessage = error.message || error.name || 'Error';
  log.error(errorMessage, {error: error});
  next(error);
}
