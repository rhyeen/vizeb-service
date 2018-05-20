const errorEventHandlers = require('./handlers');

module.exports = subscribeToErrorEvents;

function subscribeToErrorEvents() {
  process.on('uncaughtException', errorEventHandlers.uncaughtException);
  process.on('unhandledRejection', errorEventHandlers.unhandledRejection);
  process.on('warning', errorEventHandlers.warning);
}
