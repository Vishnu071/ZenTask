const API_BASE = "https://zentask-mlne.onrender.com/api";

const token = localStorage.getItem("token");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const taskComplete = document.getElementById("taskComplete");
const taskTotal = document.getElementById("taskTotal");
let tasks = [];

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2500);
}

function loadTasks() {
  fetch(`${API_BASE}/tasks/`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      tasks = data;
      renderTasks();
    });
}

function addTask() {
  const input = document.getElementById("newTaskInput");
  const name = input.value.trim();
  if (!name) return;

  fetch(`${API_BASE}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: name }),
  })
    .then((res) => res.json())
    .then((task) => {
      tasks.push(task);
      renderTasks();
      input.value = "";
      showToast("Task Added!");
    });
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  const updated = { completed: !task.completed };

  fetch(`${API_BASE}/tasks/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updated),
  })
    .then((res) => res.json())
    .then((data) => {
      task.completed = data.completed;
      renderTasks();
      showToast(data.completed ? "Task Completed!" : "Marked Incomplete");
    });
}

function deleteTask(id) {
  fetch(`${API_BASE}/tasks/${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(() => {
    tasks = tasks.filter((t) => t.id !== id);
    renderTasks();
    showToast("Task Deleted!");
  });
}

function renderTasks() {
  taskList.innerHTML = "";
  let completed = 0;
  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task-card" + (task.completed ? " done" : "");
    div.innerHTML = `
      <span>${task.title}</span>
      <div>
        <button onclick="toggleTask(${task.id})">✅</button>
        <button onclick="deleteTask(${task.id})">❌</button>
      </div>`;
    taskList.appendChild(div);
    if (task.completed) completed++;
  });
  taskComplete.textContent = completed;
  taskTotal.textContent = tasks.length;
  const percent = tasks.length ? (completed / tasks.length) * 100 : 0;
  progressBar.style.width = percent + "%";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Load dark mode state
window.onload = () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
  loadTasks();
};
