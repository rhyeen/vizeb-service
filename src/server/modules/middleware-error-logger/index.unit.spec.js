const assert = require('assert');
const proxyquire = require('proxyquire');

describe('Middleware Error Logger', _testSuite);

function _testSuite() {
  let req;
  let res;
  let next = () => {
  };

  let middlewareErrorLogger;
  let loggerHandler;

  beforeEach(_beforeEach);
  it('Should call the log error method with an error message and error object', _testLogError);
  it('Should call next with the error it received', _testNextError);

  function _beforeEach() {
    loggerHandler = {
      error: function() {
      },
    };

    middlewareErrorLogger = proxyquire('modules/middleware-error-logger', {
      'services/logger': loggerHandler,
    });
  }

  function _testLogError(done) {
    loggerHandler.error = function(errorMessage, {error}) {
      assert(errorMessage === exampleErrorMessage);
      assert(error === exampleError);
      done();
    };

    const exampleErrorMessage = 'Example Error';
    const exampleError = new Error(exampleErrorMessage);

    middlewareErrorLogger(exampleError, req, res, next);
  }

  function _testNextError(done) {
    next = function(error) {
      assert(error === exampleError);
      done();
    };

    const exampleErrorMessage = 'Example Error2';
    const exampleError = new Error(exampleErrorMessage);

    middlewareErrorLogger(exampleError, req, res, next);
  }
}
