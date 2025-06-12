document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.querySelector(".task-list");
  const taskForm = document.getElementById("taskForm");
  const logoutBtn = document.getElementById("logoutBtn");

  const token = localStorage.getItem("access");
  if (!token) {
    alert("You must be logged in.");
    window.location.href = "login.html";
    return;
  }

  // Fetch tasks from backend
  function fetchTasks() {
    fetch("https://zentask-mlne.onrender.com/api/tasks/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((tasks) => {
        taskList.innerHTML = "";
        if (tasks.length === 0) {
          taskList.innerHTML = "<li>No tasks yet</li>";
          return;
        }

        tasks.forEach((task) => {
          const li = document.createElement("li");
          li.textContent = task.title;
          taskList.appendChild(li);
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Could not load tasks.");
      });
  }

  fetchTasks();

  // Handle new task creation
  if (taskForm) {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskInput = document.getElementById("taskInput");
      const title = taskInput.value.trim();

      if (!title) {
        alert("Task title cannot be empty.");
        return;
      }

      fetch("https://zentask-mlne.onrender.com/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to add task");
          return res.json();
        })
        .then(() => {
          taskInput.value = "";
          fetchTasks();
        })
        .catch((err) => {
          console.error(err);
          alert("Could not add task.");
        });
    });
  }

  // Handle logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "login.html";
    });
  }
});
