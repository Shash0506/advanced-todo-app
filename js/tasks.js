let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ADD TASK */
function addTask() {
  const input = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDate");
  const priorityInput = document.getElementById("priority");

  const text = input.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  if (text === "") {
    alert("Task cannot be empty");
    return;
  }

  if (!dueDate) {
    alert("Please select a due date");
    return;
  }

  const task = {
    text: text,
    date: new Date().toISOString(),
    dueDate: dueDate,
    completed: false,
    priority: priority
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  dueDateInput.value = "";
  priorityInput.value = "normal";

  renderTasks("add");
}

/* RENDER TASKS */
function renderTasks(type = "add") {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (shouldShowTask(task, type)) {
      const li = document.createElement("li");

      li.className = task.priority;
      li.innerHTML = `
         ${task.text} (Due: ${task.dueDate}) 
         ${getPriorityIcon(task.priority)}

         <button onclick="completeTask(${index})">✔</button>
         <button onclick="editTask(${index})">✏</button>
         <button onclick="deleteTask(${index})">🗑</button>
    `;

      list.appendChild(li);
    }
  });
  
}

/* FILTER LOGIC */
function shouldShowTask(task, type) {
  const today = new Date().toISOString().split("T")[0];

  if (type === "today") return task.dueDate === today && !task.completed;
  if (type === "upcoming") return task.dueDate > today && !task.completed;
  if (type === "completed") return task.completed === true;
  if (type === "add") return true;

  return false;
}

/* COMPLETE TASK */
function completeTask(index) {
  tasks[index].completed = true;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks("completed");
}

/* DELETE TASK */
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks("add");
}

/* EDIT TASK */
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);

  if (newText) {
    tasks[index].text = newText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks("add");
  }
}

function getPriorityIcon(priority) {
  if (priority === "important") return "⭐";
  if (priority === "very") return "🔥";
  return "";
}