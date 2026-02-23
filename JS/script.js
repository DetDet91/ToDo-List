const input = document.querySelector("#task1");
const addBtn = document.querySelector(".add-btn");
const clearBtn = document.querySelector(".clear-task-btn");
const todoList = document.querySelector(".task-list");
const toggleInput = document.querySelector("#theme-toggle");

/*localStorage when page loads*/
window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => createTaskElement(task.text, task.completed));

  if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark-mode");
  }

  const savedTheme = localStorage.getItem("theme") === "true";
  document.body.classList.toggle("dark-mode", savedTheme);
  toggleInput.checked = savedTheme;
});

/*Create task element with text and completed status*/
function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  /*Delete button for each task*/
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);

  todoList.appendChild(li);
}

/*Add task function (used by button and Enter key)*/
function addTask() {
  const taskText = input.value.trim();
  if (!taskText) return;

  createTaskElement(taskText);
  updateLocalStorage();
  input.value = "";
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

/*Clear all tasks*/
clearBtn.addEventListener("click", () => {
  todoList.innerHTML = "";
  updateLocalStorage();
});

/*Toggle dark mode*/

toggleInput.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", toggleInput.checked);
});

/*Save current tasks to localStorage    */
function updateLocalStorage() {
  const tasks = [];

  todoList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
