const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const nameEl = document.getElementById("name-signup").value.trim();
    const emailEl = document.getElementById("email-signup").value.trim();
    const passwordEl = document.getElementById("password-signup").value;
    const confirmPasswordEl = document.getElementById(
      "confirm-password-signup"
    ).value;
  
    if (nameEl && emailEl && passwordEl) {
      if (passwordEl === confirmPasswordEl) {
        const response = await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify({
            name: nameEl,
            email: emailEl,
            password: passwordEl,
          }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          console.log("response ok")
          location.href = "/dashboard";
        } else {
          alert("Failed to sign up.");
        }
      } else {
        alert("Password must match!")
      }
    } else {
      alert("All fields are required")
    }
  };
  
  document
    .getElementById("signup-form")
    .addEventListener("submit", signupFormHandler);
  