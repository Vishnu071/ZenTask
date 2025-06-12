document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = loginForm.querySelector('input[type="text"]').value.trim();
    const password = loginForm
      .querySelector('input[type="password"]')
      .value.trim();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch(
        "https://zentask-mlne.onrender.com/api/token/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert("Login failed: " + (error.detail || "Invalid credentials"));
        return;
      }

      const data = await response.json();
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      alert("Login successful!");
      window.location.href = "dashboard.html";
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  });
});
