document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    addTaskButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
            saveTasks();
        }
    });

    taskList.addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON") {
            removeTask(event.target.parentElement);
            saveTasks();
        }
    });

    // This function will Load tasks from localStorage
    loadTasks();
    
    function addTask(text) {
        const li = document.createElement("li");
        li.innerHTML = `${text} <button>Delete</button>`;
        taskList.appendChild(li);
    }

    function removeTask(task) {
        taskList.removeChild(task);
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => li.textContent.split("Delete")[0].trim());
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.forEach(task => addTask(task));
    }
});
