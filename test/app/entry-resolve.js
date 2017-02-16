console.log('Running entry-absolute.js');

const secret = require('secret.js');

const alias = require('some-wired-alias');

const sum = require('./math/sum');

// DO NOT REQUIRE THIS IN PRODUCTION
// exposes webpack state on window.schlupfloch
require('../../src/schlupfloch');
