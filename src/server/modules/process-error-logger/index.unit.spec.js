const assert = require('assert');
const proxyquire = require('proxyquire');

describe('Node Process Error Logger Subscription', _testSuite);

function _testSuite() {
  let errorEventHandlers;
  let processErrorLogger;
  let processOn;

  before(_before);
  beforeEach(_beforeEach);
  after(_after);

  it('Should subscribe uncaught exception handler to that event', _subscribeUncaughtExceptionHandler);
  // it('Should subscribe unhandled rejection handler to that event', _subscribeUnhandledRejection);
  // it('Should subscribe warning handler to that event', _subscribeWarning);

  function _before() {
    processOn = process.on;
  }

  function _beforeEach() {
    errorEventHandlers = {
      uncaughtException: () => {},
      unhandledRejection: () => {},
      warning: () => {},
    };

    processErrorLogger = proxyquire('modules/process-error-logger', {
      'modules/process-error-logger/handlers': errorEventHandlers,
    });
  }

  function _after() {
    // reset process.on
    process.on = processOn;
  }

  function _subscribeUncaughtExceptionHandler(done) {
    process.on = function(eventName, eventCallback) {
      assert(eventName === 'uncaughtException');
      done();
    };

    processErrorLogger();
  }
}
