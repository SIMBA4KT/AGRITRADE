import { products } from './product.js';

const container = document.getElementById('product-container');
const seeAllBtn = document.getElementById('see-all-btn');
const browseBtn = document.getElementById('browse-btn');

// Function to generate and inject HTML
function renderProducts(limit = 4) {
  const itemsToDisplay = limit === 'all' ? products : products.slice(0, limit);
  
  container.innerHTML = itemsToDisplay.map(product => `
    <div class="product-card">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
    </div>
  `).join('');

  if (limit === 'all') {
    seeAllBtn.style.display = 'none';
    browseBtn.style.display = 'none';
  }
}

renderProducts(4);

seeAllBtn.addEventListener('click', () => renderProducts('all'));
browseBtn.addEventListener('click', () => renderProducts('all'));