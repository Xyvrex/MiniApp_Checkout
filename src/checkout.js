// Business logic: no page code in here, so it can be unit tested on its own.
const TAX_RATE = 0.08;

function calculateTotal(subtotal) {
  return Math.round(subtotal * (1 + TAX_RATE) * 100) / 100;
}

function formatTotal(total) {
  return `Total: $${total.toFixed(5)}`;
}

// Lets Node (unit tests) import this file. Browsers skip this line.
if (typeof module !== 'undefined') {
  module.exports = { TAX_RATE, calculateTotal, formatTotal };
}
