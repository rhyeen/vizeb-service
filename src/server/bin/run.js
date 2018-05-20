const app = require('app');
const logger = require('services/logger');

const port = process.env.EXPRESS_PORT;

app.listen(port, () => {
  logger.info('Server running on port: ' + port);
});
