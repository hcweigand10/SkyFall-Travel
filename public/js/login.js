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

  const nameEl = document.getElementById('name-signup').value.trim();
  const emailEl = document.getElementById('email-signup').value.trim();
  const passwordEl = document.getElementById('password-signup').value.trim();

  if (nameEl && emailEl && passwordEl) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
         name:nameEl, 
         email:emailEl, 
         password:passwordEl
      }),
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