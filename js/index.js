document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navigation & Dropdown Logic ---
    const leafBtn = document.getElementById('leafBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const leafContainer = document.querySelector('.leaf-dropdown');

    if (leafBtn && dropdownMenu) {
        leafBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            dropdownMenu.classList.toggle('show');
        });
    }

    // --- 2. Improved Filter Products Logic ---
    const searchInput = document.querySelector('.search-input');
    const productCards = document.querySelectorAll('.product-card');
    const scrollContainer = document.querySelector('.scroll-container');
    
    // Create "No results" message once
    const noResultsMsg = document.createElement('p');
    noResultsMsg.id = "no-results";
    noResultsMsg.style.cssText = "display: none; text-align: center; width: 100%; padding: 20px; color: #666;";
    noResultsMsg.innerText = "No products found matching your search. 🌱";
    if(scrollContainer) scrollContainer.appendChild(noResultsMsg);

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            let visibleCount = 0;

            productCards.forEach(card => {
                // Get all text content to search across name and description
                const name = card.querySelector('.product-name')?.innerText.toLowerCase() || "";
                const desc = card.querySelector('.product-description')?.innerText.toLowerCase() || "";
                
                // Matches if query is found in name OR description
                if (name.includes(query) || desc.includes(query)) {
                    card.style.display = ""; // Shows as default
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            // Show message only if search is active and nothing is found
            noResultsMsg.style.display = (visibleCount === 0 && query !== "") ? "block" : "none";
        });
    }

    // --- 3. Global Click & Smooth Scroll ---
    document.addEventListener('click', (event) => {
        if (leafContainer && !leafContainer.contains(event.target)) {
            dropdownMenu?.classList.remove('show');
        }

        if (event.target.tagName === 'A' && event.target.getAttribute('href')?.startsWith('#')) {
            const targetId = event.target.getAttribute('href');
            if (targetId !== "#") {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    event.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });

    // --- 4. Add to Cart Logic ---
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart') || event.target.classList.contains('btn')) {
            const card = event.target.closest('.product-card');
            if (card) {
                const product = {
                    name: card.querySelector('.product-name').innerText,
                    price: card.querySelector('.product-price') ? 
                           parseInt(card.querySelector('.product-price').innerText.replace(/\D/g, '')) : 0,
                    image: card.querySelector('img').getAttribute('src')
                };

                let cart = JSON.parse(localStorage.getItem('agriCart')) || [];
                cart.push(product);
                localStorage.setItem('agriCart', JSON.stringify(cart));

                // Button Feedback
                const btn = event.target;
                const originalText = btn.textContent;
                btn.textContent = '✓ Added';
                btn.style.backgroundColor = '#27ae60';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = ''; 
                }, 1500);

                updateCartIcon();
            }
        }
    });

    // --- 5. Redirection ---
    const viewAllBtn = document.querySelector('.view-all-btn');
    const browseProduceBtn = document.querySelector('.cta-button2');
    if (viewAllBtn) viewAllBtn.addEventListener('click', () => window.location.href = 'pages/browseProducts.html');
    if (browseProduceBtn) browseProduceBtn.addEventListener('click', () => window.location.href = 'pages/browseProducts.html');

    updateCartIcon();
});

// --- 6. Helper Functions ---
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('agriCart')) || [];
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = cart.length;
        badge.classList.toggle('hidden', cart.length === 0);
    }
}
