const bunyan = require('bunyan');

const streams = [];
streams.push({
  level: 'debug',
  stream: process.stdout,
});

module.exports = bunyan.createLogger({
  name: 'logs',
  src: false,
  streams: streams,
});
