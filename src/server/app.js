const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();


require('modules/process-error-logger')();

// @DEBUG: disable later
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());

require('./register-routes')(app);

app.use(require('modules/middleware-error-logger'));

module.exports = app;
