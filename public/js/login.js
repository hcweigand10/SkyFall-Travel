
const loginFormHandler = async function (event) {
  event.preventDefault();

  const emailEl = document.getElementById("email-login");
  const passwordEl = document.getElementById("password-login");

  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      email: emailEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    location.href = "/dashboard";
  } else {
    alert("Failed to login");
  }
};

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", loginFormHandler);

