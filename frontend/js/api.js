const API_URL = "https://zentask-mlne.onrender.com";

// Save and get token
function saveToken(token) {
  localStorage.setItem("access", token);
}

function getToken() {
  return localStorage.getItem("access");
}

// Login
async function login(username, password) {
  const res = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (data.access) {
    saveToken(data.access);
    return true;
  }
  return false;
}

// Register
async function register(username, email, password) {
  const res = await fetch(`${API_URL}/api/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return res.ok;
}

// Get tasks
async function getTasks() {
  const res = await fetch(`${API_URL}/api/tasks/`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
}

// Add task
async function addTask(title, category) {
  const res = await fetch(`${API_URL}/api/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ title, category }),
  });
  return res.ok;
}

// Delete task
async function deleteTask(taskId) {
  const res = await fetch(`${API_URL}/api/tasks/${taskId}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.ok;
}

// Complete task (toggle)
async function completeTask(taskId, completed) {
  const res = await fetch(`${API_URL}/api/tasks/${taskId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ completed }),
  });
  return res.ok;
}
