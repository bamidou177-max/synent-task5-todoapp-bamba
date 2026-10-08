const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const viewTasksBtn = document.getElementById("viewTasksBtn");
const taskSection = document.getElementById("taskSection");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");
const emptyMessage = document.getElementById("emptyMessage");
const successMessage = document.getElementById("successMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <input 
                type="checkbox" 
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})"
            >

            <span>${task.text}</span>

            <button 
                class="delete-btn" 
                onclick="deleteTask(${index})"
            >
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });

    updateTaskCount();

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    successMessage.style.display = "block";

    setTimeout(() => {
        successMessage.style.display = "none";
    }, 2000);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function deleteTask(index) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) {
        return;
    }

    tasks.splice(index, 1);
    displayTasks();
}

function updateTaskCount() {
    const remainingTasks = tasks.filter(task => !task.completed).length;

    if (remainingTasks === 1) {
        taskCount.textContent = "1 task remaining";
    } else {
        taskCount.textContent = `${remainingTasks} tasks remaining`;
    }
}

function removeCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

clearCompleted.addEventListener("click", removeCompletedTasks);

viewTasksBtn.addEventListener("click", function() {
    if (taskSection.style.display === "none") {
        taskSection.style.display = "block";
        viewTasksBtn.textContent = "Hide Task List";
        displayTasks();
    } else {
        taskSection.style.display = "none";
        viewTasksBtn.textContent = "View Task List";
    }
});

taskSection.style.display = "none";