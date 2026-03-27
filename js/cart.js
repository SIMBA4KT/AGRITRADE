let cartCount = 0;

// Function to update the UI
function updateCartUI() {
    const countElement = document.getElementById('cart-count');
    const cartIcon = document.querySelector('a[href="#Cart"]');
    
    // Update the text
    countElement.innerText = cartCount;
    
    // A "pop" animation so the user notices the change
    countElement.classList.add('bump');
    cartIcon.classList.add('bounce');
    setTimeout(() => {
        countElement.classList.remove('bump');
        cartIcon.classList.remove('bounce');
    }, 300);
}

// Update your existing Click Listener
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        // 1. Increment the count
        cartCount++;
        
        // 2. Update the display
        updateCartUI();
        
        // 3. (Optional) Log the product name
        const productName = event.target.closest('.product-info').querySelector('.product-name').innerText;
        console.log(`Added ${productName} to cart. Total items: ${cartCount}`);
    }
});