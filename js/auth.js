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
};


function updateMessage(el, text, color) {
    if (el) {
        el.innerText = text;
        el.style.color = color;
    }
};

if (foundClient) {
    localStorage.setItem('currentUser', JSON.stringify(foundClient));
    updateMessage(display, "Success! Returning to checkout...", "green");

    setTimeout(() => {
        if (document.referrer.includes('cart.html') || document.referrer.includes('checkout.html')) {
            window.history.back(); 
        } else {
            window.location.href = '../../index.html';
        }
    }, 1000);
}
