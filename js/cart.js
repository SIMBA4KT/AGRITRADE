const container = document.getElementById("cart-items-container");
const totalEl = document.getElementById("total-price");

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("agriCart")) || [];
  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-msg">Your basket is empty. <a href="../index.html">Go pick some.</a></p>';
    totalEl.innerText = "0";
    return;
  }

  cart.forEach((product, index) => {
    total += product.price;
    container.innerHTML += `
            <div class="cart-item">
                <img src="../${product.image}" alt="${product.name}">
                <div class="cart-item-info">
                    <h3>${product.name}</h3>
                    <p>Price: KES ${product.price.toLocaleString()}</p>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
  });
  totalEl.innerText = total.toLocaleString();
}

window.removeItem = function(index) {
  let cart = JSON.parse(localStorage.getItem("agriCart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("agriCart", JSON.stringify(cart));
  displayCart();
};

function getCheckoutSessionUrl() {
  const host = window.location.hostname;
  return (host === "localhost" || host === "127.0.0.1") 
    ? "http://127.0.0.1:3000/create-checkout-session" 
    : "/api/create-checkout-session";
}

document.getElementById("checkout-btn").addEventListener("click", async (e) => {
  const cart = JSON.parse(localStorage.getItem("agriCart")) || [];
  if (cart.length === 0) return alert("Your cart is empty.");

  const authGate = document.getElementById("auth-gate");
  const checkoutBtn = document.getElementById("checkout-btn");
  const errorHint = document.getElementById("auth-error");

  // --- STEP 1: Show Auth Form if hidden ---
  if (window.getComputedStyle(authGate).display === "none") {
    authGate.style.display = "block";
    checkoutBtn.innerText = "Verify & Pay with Stripe";
    checkoutBtn.style.backgroundColor = "#28a745"; // Success green color
    return;
  }

  // --- STEP 2: Validate Credentials ---
  const userVal = document.getElementById("auth-username").value.trim();
  const passVal = document.getElementById("auth-password").value.trim();
  
  const users = JSON.parse(localStorage.getItem('userList')) || [];
  const foundUser = users.find(u => u.username === userVal && u.password === passVal);

  if (!foundUser) {
    errorHint.style.display = "block";
    return;
  }

  // --- STEP 3: Proceed to Stripe ---
  try {
    errorHint.style.display = "none";
    checkoutBtn.disabled = true;
    checkoutBtn.innerText = "Connecting to Stripe...";

    const response = await fetch(getCheckoutSessionUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: cart,
        customer: userVal 
      }),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) throw new Error(data.error || "Stripe failed");
    if (data.url) window.location.href = data.url;

  } catch (err) {
    console.error("Checkout error:", err);
    alert("Unable to start Stripe checkout. Check if your server is running on port 3000.");
    checkoutBtn.disabled = false;
    checkoutBtn.innerText = "Verify & Pay with Stripe";
  }
});

displayCart();
