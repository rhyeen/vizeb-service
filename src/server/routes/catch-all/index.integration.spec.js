const request = require('supertest');
const app = require('app');

/* istanbul ignore next */
describe('catchall unit tests:', () => {
  it('requests to non existent endpoints should return a 404 status', (done) => {
    request(app)
      .get('/nonexistent')
      .expect(404, 'Not Found', done);
  });
});
