// DO NOT REQUIRE THIS IN PRODUCTION
// exposes webpack state on window.schlupfloch
require('../../src/schlupfloch');

// Require dependencies as normal
require('./math/sum.js');

// Proxying other dependencies works
require('./math/plusTwo');


const complicatedCalculation = require('./math/complicatedCalculation');

console.log('Running Main App');