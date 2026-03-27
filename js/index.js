
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Leaf Dropdown Logic ---
    const leafBtn = document.getElementById('leafBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const leafContainer = document.querySelector('.leaf-dropdown');

    if (leafBtn && dropdownMenu) {
        leafBtn.addEventListener('click', (e) => {
            // Prevent the document click listener from firing immediately
            e.stopPropagation(); 
            dropdownMenu.classList.toggle('show');
        });
    }

    // --- 2. Global Click Handler ---
    document.addEventListener('click', (event) => {
        if (leafContainer && !leafContainer.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }

        // Close menu if a dropdown link is clicked
        if (event.target.closest('#dropdownMenu a')) {
            dropdownMenu.classList.remove('show');
        }

        // --- 3. Add to Cart Logic (Event Delegation) ---
        if (event.target.classList.contains('add-to-cart')) {
            const card = event.target.closest('.product-card');
            const productName = card.querySelector('.product-name').innerText;
            
            // Basic Feedback - You can replace this with a toast notification
            alert(`🛒 ${productName} has been added to your cart!`);
            
            // Optional: Update a cart counter if you add one to your header
            updateCartIcon();
        }
    });

    // --- 4. Search Functionality ---
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase();
                alert(`Searching for: ${query}...`);
            }
        });
    }

    //Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 6. Email Submission---
    const footerForm = document.querySelector('.footer-form');
    if (footerForm) {
        footerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = footerForm.querySelector('input').value;
            if (email) {
                alert(`Thanks for subscribing, ${email}!`);
                footerForm.reset();
            }
        });
    }
});
function updateCartIcon() {
    const cartIcon = document.querySelector('a[href="#Cart"]');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);
}
// "See All" Button Logic ---
const seeAllBtn = document.querySelector('.view-all-btn');

if (seeAllBtn) {
    seeAllBtn.addEventListener('click', () => {
        const browseSection = document.getElementById('BrowseProduce');
        
        if (browseSection) {
            // Smoothly scroll to the "Browse Produce" section
            browseSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        } else {
            console.warn("Target section #BrowseProduce not found.");
        }
    });
}