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

    // --- 2. Global Click Handler (Dropdowns & Smooth Scroll) ---
    document.addEventListener('click', (event) => {
        // Close dropdown if clicking outside
        if (leafContainer && !leafContainer.contains(event.target)) {
            dropdownMenu?.classList.remove('show');
        }

        // Close menu if a dropdown link is clicked
        if (event.target.closest('#dropdownMenu a')) {
            dropdownMenu?.classList.remove('show');
        }

        // Smooth Scroll
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

    // --- 3. Add to Cart Logic (Persistent via LocalStorage) ---
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart') || event.target.classList.contains('btn')) {
            const card = event.target.closest('.product-card');
            
            if (card) {
                // Capture the actual data
                const product = {
                    name: card.querySelector('.product-name').innerText,
                    price: parseInt(card.querySelector('.product-price').innerText.replace(/\D/g, '')),
                    image: card.querySelector('img').getAttribute('src')
                };

                // Save to LocalStorage
                let cart = JSON.parse(localStorage.getItem('agriCart')) || [];
                cart.push(product);
                localStorage.setItem('agriCart', JSON.stringify(cart));

                // Visual Feedback on Button
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

    // --- 4. Redirection Logic ---
    const viewAllBtn = document.querySelector('.view-all-btn');
    const browseProduceBtn = document.querySelector('.cta-button2');

    const goToBrowseProducts = () => {
        window.location.href = 'pages/browseProducts.html';
    };

    if (viewAllBtn) viewAllBtn.addEventListener('click', goToBrowseProducts);
    if (browseProduceBtn) browseProduceBtn.addEventListener('click', goToBrowseProducts);

    // Initial load of the icon status
    updateCartIcon();
});

// --- 5. Helper Functions (Outside the listener so they are globally accessible) ---
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('agriCart')) || [];
    const badge = document.getElementById('cart-badge');
    const cartIcon = document.querySelector('a[href="pages/cart.html"]'); 

    if (badge) {
        badge.innerText = cart.length;
        badge.classList.toggle('hidden', cart.length === 0);
    }

    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);
    }
}
// --- Add to Cart Logic for the Detail Page ---
const addToCartBtn = document.getElementById("addToCartBtn");

if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
        // 1. Prepare the product object
        const productToSave = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        };

        // 2. Retrieve existing cart
        let cart = JSON.parse(localStorage.getItem('agriCart')) || [];

        // 3. Add and Save
        cart.push(productToSave);
        localStorage.setItem('agriCart', JSON.stringify(cart));

        // 4. Feedback
        alert(`🛒 ${product.name} has been added to your cart!`);
        
        // Update the badge if you have the helper function available
        if (typeof updateCartIcon === "function") {
            updateCartIcon();
        }
    });
}