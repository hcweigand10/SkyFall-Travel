const loginFormHandler = async function(event) {
    event.preventDefault();
  
    const emailEl = document.getElementById('email-login');
    const passwordEl = document.getElementById('password-login');
  
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email: emailEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      location.href='/dashboard';
    } else {
      alert('Failed to login');
    }
  };
  
const loginForm = document.getElementById('login-form')
loginForm.addEventListener('submit', loginFormHandler);
  

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById('username-signup').value.trim();
  const email = document.getElementById('email-signup').value.trim();
  const password = document.getElementById('password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      location.href='/dashboard';
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .getElementById('signup-form')
  .addEventListener('submit', signupFormHandler);