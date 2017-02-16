// Load Bundle
require('../dist/test-stubs.js');

// Load custom require function
const SCHLUPFLOCH = window.schlupfloch;

describe('require modules', () => {
  const sum = SCHLUPFLOCH('./test/app/math/sum.js');

  it('works', () => {
    expect(sum(1, 2)).toBe(3);
  });
})

describe('overwrites dependencies', () => {
  it('only for the current require', () => {
    const sumStub = (a,b) => a - b;
    const plusTwo = SCHLUPFLOCH('./test/app/math/plusTwo.js', { './test/app/math/sum.js': sumStub});
    expect(plusTwo(4)).toBe(-2);

    const plusTwoClean = SCHLUPFLOCH('./test/app/math/plusTwo.js');
    expect(plusTwoClean(4)).toBe(6);
  });

  it('does not effect other dependencies', () => {
    const sumStub = (a, b) => a * b;
    // even though sum is used in plusTwo, this require is not affected.
    const calculaction = SCHLUPFLOCH('./test/app/math/complicatedCalculation.js', { './test/app/math/sum.js': sumStub });
    expect(calculaction).toBe(47);
  });

  it('stubs all dependencies for {deep: true}', () => {
    const sumStub = (a, b) => 10;
    // even though sum is used in plusTwo, this require is not affected.
    const calculaction = SCHLUPFLOCH('./test/app/math/complicatedCalculation.js', { './test/app/math/sum.js': sumStub }, { deep: true });
    expect(calculaction).toBe(20);
  });
});
