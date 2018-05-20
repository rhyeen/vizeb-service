module.exports = (app) => {
  app.use(require('./routes/healthcheck/'));

  app.use(require('./routes/example/'));

  app.use(require('./routes/catch-all/'));
};
