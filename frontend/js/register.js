// Handling registration form submission
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  if (!registerForm) return;

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = registerForm.querySelectorAll("input");
    let valid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        valid = false;
      }
    });

    if (!valid) {
      alert("Please complete all required fields.");
      return;
    }

    const password = registerForm.querySelector('input[type="password"]').value;
    const confirmPassword = registerForm.querySelector(
      'input[placeholder*="Confirm"]'
    ).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // TODO: Replace with backend API call for registration
    console.log("Registering user...");

    alert("Registration successful (simulation). Redirecting to login.");

    window.location.href = "login.html";
  });
});
