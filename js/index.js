// Leaf dropdown menu functionality
const leafBtn = document.getElementById('leafBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

leafBtn.addEventListener('click', function() {
  dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('.leaf-dropdown')) {
    dropdownMenu.classList.remove('show');
  }
});

// Close dropdown when a menu item is clicked
const menuItems = dropdownMenu.querySelectorAll('a');
menuItems.forEach(function(item) {
  item.addEventListener('click', function() {
    dropdownMenu.classList.remove('show');
  });
});
