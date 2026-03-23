function getUsers() {
      return JSON.parse(localStorage.getItem('users')) || [];

};
function saveUsers(users) {
      localStorage.setItem('users', JSON.stringify(users));
}

function registerUser(email, password) {
      const users = getUsers();
      if (users.some(user => user.email === email)) {
            alert('email already exists. Please choose a different one.');
            return false;
      }
      users.push({ email, password });
      saveUsers(users);
      alert('Registration successful! You can now log in.');
      return true;
};
const registerForm = document.getElementById('registerForm');
if (registerForm) {
      registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('regemail').value;
            const password = document.getElementById('regPassword').value;
            if (registerUser(email, password)) {
                  window.location.href = 'login.html'; 
            }
      });
};
function loginUser(email, password) {
      const users = getUsers();
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {  localStorage.setItem('loggedInUser', JSON.stringify({ email }));
            alert('Login successful! Welcome, ' + email + '!');
           
            window.location.href = 'browseProducts.html'; 
      } else {
            alert('Invalid email or password. Please try again.');
      }
};
function logoutUser() {
      localStorage.removeItem('loggedInUser');
      alert('You have been logged out.');
      window.location.href = 'login.html'; 
};
function getCurrentUser() {
      return JSON.parse(localStorage.getItem('loggedInUser'));
};
function protectRoute() {
      const loggedInUser = getCurrentUser();
      if (!loggedInUser) {
            alert('Please log in to access this page.');
            window.location.href = '../pages/login.html'; 
      }
};
const loginForm = document.getElementById('loginForm');
if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            loginUser(email, password);
            
      });
};
