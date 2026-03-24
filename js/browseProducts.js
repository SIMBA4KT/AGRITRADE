document.addEventListener("DOMContentLoaded", () => {

    let productData = [];
    let currentCategory = "all";

    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');
    const categoryLinks = document.querySelectorAll('.filter-categories a');
    const applyBtn = document.getElementById('applyPrice');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    async function loadProducts() {
        try {
            const res = await fetch('../data/products.json');
            productData = await res.json();

            displayProducts(productData);
        } catch (err) {
            console.error(err);
            productList.innerHTML = "<p>⚠️ Failed to load products</p>";
        }
    }

    function displayProducts(products) {
        productList.innerHTML = "";

        if (products.length === 0) {
            productList.innerHTML = "<p>No products found.</p>";
            return;
        }

        const fragment = document.createDocumentFragment();

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = `product-card ${product.category}`;

            card.innerHTML = `
                <span class="badge">In stock</span>

                <div class="img-wrapper">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <h3>${product.name}</h3>
                <p class="price">KES ${product.price.toLocaleString()}</p>
                <p class="location">📍 ${product.location}</p>
                <p class="seller">Seller: AgriTrade</p>
                <p class="rating">⭐ ${product.rating}</p>

                <div class="action">
                    <a href="../pages/product.html?id=${product.id}" class="btn">View</a>
                    <button class="cart-btn">Cart</button>
                </div>
            `;

            fragment.appendChild(card);
        });

        productList.appendChild(fragment);
    }

 
    function filterProducts() {
        const query = searchInput.value.toLowerCase();
        const min = parseFloat(minPriceInput.value) || 0;
        const max = parseFloat(maxPriceInput.value) || Infinity;

        const filtered = productData.filter(p => {
            return (
                p.name.toLowerCase().includes(query) &&
                (currentCategory === "all" || p.category === currentCategory) &&
                p.price >= min &&
                p.price <= max
            );
        });

        displayProducts(filtered);
    }


    searchInput.addEventListener("input", debounce(filterProducts, 300));

    categoryLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            currentCategory = link.dataset.category;
            filterProducts();
        });
    });

    applyBtn.addEventListener("click", filterProducts);

    function debounce(fn, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), delay);
        };
    }

    loadProducts();
});