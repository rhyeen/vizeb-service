# Vizeb Service

Node.js Service for the Vizeb App

## Commands

The kit runs entirely in Docker.  A [Makefile](Makefile) has been provided to simplify basic commands within the Docker container.

### Setup

Run `make build` to build the Docker images, then run `make run-local` to run the local instance of the Docker image inside a Docker container.

Once the image has been built once, you do not need to run `make build` again unless the Dockerfile is altered.

#### Production

When you are ready to run a production-like Docker container, run `make run-prod`.

#### Healthcheck

Visit `http://localhost:6250/healthcheck` to ensure the Node server is running correctly.

### Testing

Run `npm test` to run all test cases. A test coverage report is provided in `coverage/lcov-report/index.html`.

To have the tests return an error on poor coverage (< 75%), run `npm run test-coverage`.

### Linting

Run `make lint` to add a linting report in the `src` directory.  If there are errors in linting, you can attempt to have the system fix the errors by running `make lint-fix`.  If an error cannot be resolved, it will be printed to the console.

Linting standards are based on [ESLint](http://eslint.org/docs/rules/) rules and are defined in the `.eslintrc.json` file.
