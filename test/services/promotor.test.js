const assert = require('assert');
const app = require('../../src/app');

describe('\'promotor\' service', () => {
  it('registered the service', () => {
    const service = app.service('promotor');

    assert.ok(service, 'Registered the service');
  });
});
