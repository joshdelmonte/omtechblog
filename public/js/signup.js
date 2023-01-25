async function newFormHandler(event) {
    event.preventDefault();
  
const username = document.querySelector('input[name="username"]').value.trim();
const password = document.querySelector('input[name="password"]').value.trim();
const email = document.querySelector('input[name="email"]').value.trim();

const response = await fetch(`/api/users`, {
    method: 'POST',
    body: JSON.stringify({
        username,
        password,
        email,
    }),
    headers: {
        'Content-Type': 'application/json'
    }
});

if (response.ok) {
    document.location.replace('/dashboard');
}
else {
    alert(response.statusText);
}
}

document.querySelector('.signup-setup').addEventListener('submit', newFormHandler);