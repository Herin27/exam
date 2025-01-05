document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Gather form data
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send data to the server using fetch
    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        alert('Sign-up successful! Your data has been stored.');
    } else {
        alert('An error occurred while signing up. Please try again.');
    }
});
