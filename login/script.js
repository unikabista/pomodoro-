document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const googleSignInBtn = document.getElementById('googleSignInBtn');

    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        window.location.href = '../index.html';
        return;
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find user with matching email and password
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Store current user info in localStorage
            localStorage.setItem('currentUser', JSON.stringify({
                name: user.name,
                email: user.email
            }));
            
            // Redirect to main page
            window.location.href = '../index.html';
        } else {
            alert('Invalid email or password');
        }
    });

    // Google Sign In functionality can be added here later
    googleSignInBtn.addEventListener('click', function() {
        alert('Google Sign In will be implemented soon!');
    });
});