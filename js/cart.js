const badge = document.getElementById('cart-badge');
let count = 0;

function addToCart() {
  count++;
  badge.innerText = count;
  
  if (count > 0) badge.classList.remove('hidden');

  // Add pop effect
  badge.classList.add('pop');
  setTimeout(() => badge.classList.remove('pop'), 100);
}