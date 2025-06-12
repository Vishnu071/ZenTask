// General app-related JavaScript

console.log("App.js loaded.");

// Dark/Light mode toggle for the entire frontend (can be centralized)
const modeToggleBtn = document.getElementById("mode-toggle");
if (modeToggleBtn) {
  modeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}
