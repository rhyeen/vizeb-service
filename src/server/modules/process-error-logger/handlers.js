const log = require('services/logger');

module.exports = {
  uncaughtException,
  unhandledRejection,
  warning,
};

/**
 * // Read the last line of: https://nodejs.org/docs/latest/api/process.html#process_process_exit_code
 */
function uncaughtException(reason) {
  const defaultErrorMessage = 'Uncaught exception';
  const error = _checkAndConvertToErrorObjectIfNeeded(reason, defaultErrorMessage);
  log.fatal(error.message, {error: error});
  throw error;
}

/**
 * @TODO: should we throw an error in this call to stop the application?
 */
function unhandledRejection(reason, promise) {
  const defaultErrorMessage = 'Unhandled promise rejection';
  const error = _checkAndConvertToErrorObjectIfNeeded(reason, defaultErrorMessage);
  error.promise = promise;
  log.error(error.message, {error: error});
}

/**
 * Not technically an error, but something worth logging nonetheless
 */
function warning(reason) {
  const defaultWarningMessage = 'Warning';
  const warning = _checkAndConvertToErrorObjectIfNeeded(reason, defaultWarningMessage);
  log.warn(warning.message, {warning: warning});
}

/**
 * Checks that the provided error argument is an Error instance
 * If it isn't then it converts the error message into an error object instance
 */
function _checkAndConvertToErrorObjectIfNeeded(error, defaultMessage) {
  if (error instanceof Error === true) {
    return error;
  }

  const errorMessage = JSON.stringify(error) || defaultMessage;
  // @TODO - Can we capture relevant stack trace?
  error = new Error(errorMessage);
  return error;
}
