const test = require('node:test');
const assert = require('node:assert');
const { calculateTotal, formatTotal } = require('../../src/checkout.js');

test('adds 8% tax to 100', () => {
  assert.strictEqual(calculateTotal(100), 108);
});

test('adds 8% tax to 50', () => {
  assert.strictEqual(calculateTotal(50), 54);
});

test('rounds to two decimals', () => {
  assert.strictEqual(calculateTotal(19.99), 21.59);
});

test('zero stays zero', () => {
  assert.strictEqual(calculateTotal(0), 0);
});

test('formats the total as dollars', () => {
  assert.strictEqual(formatTotal(108), 'Total: $108.00');
});
