import assert from 'assert';
import app from '../../src/app';

describe('\'games\' service', () => {
  it('registered the service', () => {
    const service = app.service('games');

    assert.ok(service, 'Registered the service');
  });
});
