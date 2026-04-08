document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));
    console.log("Product ID from URL:", productId);
    console.log("Product ID:", productId);

    if (isNaN(productId)) {
         window.location.href = "../pages/browseProducts.html";
        console.error("No product ID found in URL!");
        return;
    }

    let productData = [];
    try {
        const res = await fetch("../data/products.json");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        productData = await res.json();
        console.log("Fetched products:", productData);
    } catch (error) {
        console.error("Failed to load products.json:", error);
        return;
    }

    const product = productData.find(p => p.id === productId);
    console.log("Product found:", product);

    if (!product) {
        console.error("Product not found for ID:", productId);
        return;
    }

    const imgEl = document.getElementById("productImg");
    if (imgEl) imgEl.src = product.image || "../assets/images/default.jpg";

    const nameEl = document.getElementById("productName");
    if (nameEl) nameEl.textContent = product.name || "Unknown Product";

    const priceEl = document.getElementById("productPrice");
    if (priceEl) priceEl.textContent = "KES " + (product.price || 0).toLocaleString();

    const categoryEl = document.getElementById("productCategory");
    if (categoryEl) categoryEl.textContent = `Category: ${product.category || "N/A"}`;

    const deliveryEl = document.getElementById("productDelivery");
    if (deliveryEl) deliveryEl.textContent = product.delivery || "3-5 business days";

    const descriptionEl = document.getElementById("productDescription");
    if (descriptionEl) descriptionEl.textContent = product.description || "No description available.";

    
    const reviewsList = document.getElementById("reviewsList");
    let reviews = product.reviews || [];

    function displayReviews() {
        if (!reviewsList) return;
        reviewsList.innerHTML = "";

        if (reviews.length === 0) {
            reviewsList.innerHTML = "<p>No reviews yet.</p>";
            return;
        }

        reviews.forEach(r => {
            const div = document.createElement("div");
            div.className = "review";
            div.innerHTML = `
                <p><strong>${r.name}</strong> - ⭐${r.rating}</p>
                <p>${r.text}</p>
            `;
            reviewsList.appendChild(div);
        });
    }

    displayReviews();

    
    const reviewForm = document.getElementById("reviewForm");
    if (reviewForm) {
        reviewForm.addEventListener("submit", e => {
            e.preventDefault();

            const name = document.getElementById("reviewerName").value.trim();
            const text = document.getElementById("reviewText").value.trim();
            const rating = parseInt(document.getElementById("reviewRating").value);

            if (!name || !text || isNaN(rating)) {
                alert("Please fill in all review fields.");
                return;
            }

            reviews.push({ name, text, rating });
            displayReviews();
            reviewForm.reset();
        });
    }

  
    const recommendedContainer = document.getElementById("recommendedProducts");
    if (recommendedContainer) {
        const recommended = productData
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, 12);

        recommendedContainer.innerHTML = ""; 

        recommended.forEach(p => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <h4>${p.name}</h4>
                <p class="price">KES ${p.price.toLocaleString()}</p>
                <a href="product.html?id=${p.id}" class="btn">View</a>
            `;
            recommendedContainer.appendChild(card);
        });

        if (recommended.length === 0) {
            recommendedContainer.innerHTML = "<p>No similar products available.</p>";
        }
    }

    const addToCartBtn = document.getElementById("addToCartBtn");
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", () => {
            const productToSave = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            };

            let cart = JSON.parse(localStorage.getItem('agriCart')) || [];
            cart.push(productToSave);
            localStorage.setItem('agriCart', JSON.stringify(cart));

            alert(`🛒 ${product.name} has been added to your cart!`);
            if (typeof updateCartIcon === "function") {
                updateCartIcon();
            }
        });
    }
});