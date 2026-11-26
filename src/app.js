// UI code: connects the page to the logic in checkout.js
document.getElementById('calculate').addEventListener('click', () => {
  const subtotal = parseFloat(document.getElementById('subtotal').value) || 0;
  const total = calculateTotal(subtotal);
  document.getElementById('total').textContent = formatTotal(total);
});
