document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        window.location.href = '../index.html';
        return;
    }

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Get existing users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email already exists
        if (users.some(user => user.email === email)) {
            alert('Email already registered');
            return;
        }

        // Add new user to users array
        users.push({
            name,
            email,
            password
        });

        // Save updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Store current user info
        localStorage.setItem('currentUser', JSON.stringify({
            name,
            email
        }));

        alert('Account created successfully!');
        window.location.href = '../index.html';
    });
}); 