document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const outputMessage = document.getElementById('output');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get values
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const fullname = document.getElementById('fullname').value;
        const id = document.getElementById('id').value;

        // Reset UI
        outputMessage.textContent = '';
        outputMessage.style.color = '#e74c3c'; // Reset to red

        // Validation Logic
        if (password !== confirmPassword) {
            outputMessage.textContent = "Passwords do not match.";
            return;
        }

        if (password.length < 6) {
            outputMessage.textContent = "Password must be at least 6 characters.";
            return;
        }

        // Success State
        outputMessage.style.color = '#27ae60'; // Green
        outputMessage.textContent = "Registration Successful! Redirecting...";
        
        console.log("Registered User:", { name: fullname, id: id });

        // Optional: clear form
        // form.reset();
    });
});