// Aquiring clients from storage 
let clients = JSON.parse(localStorage.getItem('userList')) || [];

window.onload = function() {
    const display = document.getElementById('message');
    const savedAccount = JSON.parse(localStorage.getItem('userAccount'));
    const usernameInput = document.getElementById('username');

    if (savedAccount && usernameInput) {
        usernameInput.value = savedAccount.username;
        if (display) display.innerText = `Welcome back, ${savedAccount.username}!`;
    }
};

// Main Auth Function
function handleAuth(type) {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const display = document.getElementById('message');

    if (!user || !pass) {
        updateMessage(display, "Please fill in all fields.", "red");
        return;
    }

    if (type === 'signup') {
        const userExists = clients.some(u => u.username === user);
        
        if (userExists) {
            updateMessage(display, "Username already exists!", "orange");
        } else {
            clients.push({ username: user, password: pass });
            localStorage.setItem('userList', JSON.stringify(clients));
            updateMessage(display, "Account created! You can now login.", "green");
        }
    } 
    
    else if (type === 'login') {
        const foundClient = clients.find(u => u.username === user && u.password === pass);

        if (foundClient) {
            localStorage.setItem('currentUser', JSON.stringify(foundClient));
            localStorage.setItem('userAccount', JSON.stringify({ username: user }));
            
            updateMessage(display, `Logging you in, ${user}...`, "blue");
            
            setTimeout(() => {
                window.location.href = '../index.html'; 
            }, 1000);
        } else {
            updateMessage(display, "Invalid credentials.", "red");
        }
    }
}

function signUp() {
    handleAuth('signup');
}

// To keep code clean
function updateMessage(el, text, color) {
    if (el) {
        el.innerText = text;
        el.style.color = color;
    }
}

// Profile functions
function updateProfileDisplay() {
    const profileBtn = document.querySelector('.profile-btn');
    if (profileBtn) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            profileBtn.innerHTML = `👤 <span class="username">${currentUser.username.toUpperCase()}</span>`;
        } else {
            profileBtn.innerHTML = '👤';
        }
    }
}

function handleProfileClick() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'pages/register.html';
    }
}

// Toggle profile dropdown
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'pages/register.html';
    } else {
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userAccount');
    
    // Close dropdown
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) {
        dropdown.classList.add('hidden');
    }
    
    updateProfileDisplay();
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const profileContainer = document.querySelector('.profile-container');
    const dropdown = document.getElementById('profileDropdown');
    
    if (profileContainer && dropdown && !profileContainer.contains(event.target)) {
        dropdown.classList.add('hidden');
    }
});

// Update profile on page load
document.addEventListener('DOMContentLoaded', updateProfileDisplay);