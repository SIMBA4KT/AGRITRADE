const container = document.getElementById('cart-items-container');
const totalEl = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');

function displayCart() {
    if (!container || !totalEl) return;

    const cart = JSON.parse(localStorage.getItem('agriCart')) || [];
    
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">Your basket is empty. <a href="../index.html">Go pick some.</a></p>';
        totalEl.innerText = "0";
        return;
    }

    // 3. Loop through each product in the cart and display 
    cart.forEach((product, index) => {
        total += product.price;

        container.innerHTML += `
            <div class="cart-item">
                <img src="../${product.image}" alt="${product.name}">
                
                <div class="cart-item-info">
                    <h3>${product.name}</h3>
                    <p>Price: KES ${product.price}</p>
                    <p style="font-size: 0.8rem; color: #666;">Category: Fresh Produce</p>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });


    totalEl.innerText = total.toLocaleString(); 
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('agriCart'));
    cart.splice(index, 1); 
    localStorage.setItem('agriCart', JSON.stringify(cart)); 
    displayCart();
}

displayCart();

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async () => {
        const cart = JSON.parse(localStorage.getItem('agriCart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty. Add some products before checkout.');
        return;
    }

    try {

        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Stripe checkout session failed');
        }

        const { url } = await response.json();
        if (!url) {
            throw new Error('No checkout URL returned from server.');
        }

        window.location.href = url; // Redirect to Stripe!
    } catch (err) {
        console.error('Checkout error:', err);
        alert('Unable to start Stripe checkout. Please try again later.');
    }
});
