const assert = require('assert');
const app = require('../../src/app');

describe('\'artista\' service', () => {
  it('registered the service', () => {
    const service = app.service('artista');

    assert.ok(service, 'Registered the service');
  });
});
