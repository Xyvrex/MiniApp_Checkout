const test = require('node:test');
const assert = require('node:assert');
const { calculateTotal, formatTotal } = require('../../src/checkout.js');

// Check output for subtotal 100
test('adds 8% tax to 100', () => {
  assert.strictEqual(calculateTotal(100), 108);
});

// Check output for subtotal 50
test('adds 8% tax to 50', () => {
  assert.strictEqual(calculateTotal(50), 54);
});

// Check decimal places number for total
test('rounds to two decimals', () => {
  assert.strictEqual(calculateTotal(19.99), 21.59);
});

// Check output for 0 total
test('zero stays zero', () => {
  assert.strictEqual(calculateTotal(0), 0);
});

// Check total format is dollars
test('formats the total as dollars', () => {
  assert.strictEqual(formatTotal(108), 'Total: $108.00');
});
