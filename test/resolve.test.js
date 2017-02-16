// Load Bundle
require('../dist/test-resolve.js');

// Load custom require function
const SCHLUPFLOCH = require('../dist/schlupfloch.js');

describe('resolve paths', () => {
  it('should respect the issuers path', () => {
    const sum = SCHLUPFLOCH('./math/sum'); // same path as used in entry-resolve.js
    expect(sum(1, 2)).toBe(3);
  });

  it('should respect resolve.modules', () => {
    const secret = SCHLUPFLOCH('secret.js');
    const directSecret = require('./app/resolve/secret.js');
    expect(secret).toBe(directSecret);
  });

  it('should respect resolve.alias', () => {
    const aliased = SCHLUPFLOCH('some-wired-alias');
    const direct = require('./app/resolve/gimme-alias.js');
    expect(aliased).toBe(direct);
  });
});