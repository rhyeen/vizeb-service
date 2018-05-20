const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

require('modules/process-error-logger')();

app.use(bodyParser.json());
app.use(cookieParser());

require('./register-routes')(app);

app.use(require('modules/middleware-error-logger'));

module.exports = app;
