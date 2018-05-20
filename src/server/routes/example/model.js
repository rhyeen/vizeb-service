const StatusError = require('../../services/errors/status-error');
const log = require('../../services/logger');

module.exports = {
  getExample,
  createExample,
  updateExample,
  deleteExample,
};

function getExample(exampleId) {
  return new Promise((resolve, reject) => {
    return resolve({
      test: 'hello world'
    });
  });
}

function createExample(example) {
  return new Promise((resolve, reject) => {
    return resolve('EX_1234567');
  });
}

function updateExample(exampleId, example) {
  return new Promise((resolve, reject) => {
    return resolve();
  });
}

function deleteExample(exampleId) {
  return new Promise((resolve, reject) => {
    return resolve();
  });
}
