const searchInput = document.querySelector('.search-bar input');
const categoryLinks = document.querySelectorAll('.filter-categories a');
const applyBtn = document.querySelector('.price-filter button');

let currentCategory = "all";

function filterProducts() {
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;

    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const title = product.querySelector('h3')?.textContent.toLowerCase() || "";
        const priceText = product.querySelector('.price')?.textContent || "";

      
        const match = priceText.match(/KES\s*([\d,]+)/);
        let price = 0;

        if (match) {
            price = parseFloat(match[1].replace(/,/g, ''));
        }

        const matchesSearch = title.includes(query);
        const matchesCategory = currentCategory === "all" || product.classList.contains(currentCategory);
        const matchesPrice = price >= minPrice && price <= maxPrice;

        if (matchesSearch && matchesCategory && matchesPrice) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
}

categoryLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        currentCategory = this.dataset.category;
        filterProducts();
    });
});

if (applyBtn) {
    applyBtn.addEventListener('click', filterProducts);
}

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.03)";
        card.style.transition = "0.2s ease";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});