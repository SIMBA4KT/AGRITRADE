const container = document.getElementById("cart-items-container");
const totalEl = document.getElementById("total-price");

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("agriCart")) || [];

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML =
      '<p class="empty-msg">Your basket is empty. <a href="../index.html">Go pick some produce.</a></p>';
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

window.removeItem = function(index) {
  let cart = JSON.parse(localStorage.getItem("agriCart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("agriCart", JSON.stringify(cart));
  displayCart();
};

function getCheckoutSessionUrl() {
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    return "http://127.0.0.1:3000/create-checkout-session";
  }
  return "/api/create-checkout-session";
}

async function parseJsonResponse(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Unexpected response (${response.status})`);
  }
}

document.getElementById("checkout-btn").addEventListener("click", async () => {
  const cart = JSON.parse(localStorage.getItem("agriCart")) || [];
  

  if (cart.length === 0) {
    alert("Your cart is empty. Add some products before checkout.");
    return;
  }
  
  const currentUserData = localStorage.getItem('currentUser');
  if (!currentUserData) {
    alert("You must be logged in to complete your payment.");
    
    window.location.href = "login.html"; 
    return; 
  }

  const user = JSON.parse(currentUserData);

  
  try {
    const response = await fetch(getCheckoutSessionUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: cart,
        customerEmail: user.username 
      }),
    });

    const data = await parseJsonResponse(response);

    if (!response.ok) {
      throw new Error(data.error || "Stripe checkout session failed");
    }

    if (!data.url) {
      throw new Error("No checkout URL returned from server.");
    }


    window.location.href = data.url; 

  } catch (err) {
    console.error("Checkout error:", err);
    alert("Unable to start Stripe checkout. Please try again later.");
  }
});

displayCart();
