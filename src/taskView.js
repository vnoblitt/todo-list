import { Task } from "./Task.js";
import { sidebar } from "./sidebar.js";
import emptyCircle from "./icons/circle.svg?raw";
import trashIcon from "./icons/trash.svg?raw";

const content = document.getElementById("content");
const taskViewer = document.getElementById("task-viewer");

const taskContainer = document.createElement("div");
taskContainer.id = "task-container";
content.append(taskContainer);

function populateTasks(range) {
    let tasksList;
    const now = new Date();

    switch(range) {
        case "all":
            tasksList = listTasks();
            break;

        case "today":
            const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
            tasksList = listTasks().filter(task => task.dueDate === todayStr);
            break;
        
        case "upcoming": 
            const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
            tasksList = listTasks().filter(task => task.dueDate.startsWith(monthPrefix));
            break;

        case "future":
            const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            const nextMonthStart = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, "0")}-01`;
            tasksList = listTasks().filter(task => task.dueDate >= nextMonthStart);
            break;
    }

    tasksList.sort((a, b) => a.dueDate.localeCompare(b.dueDate));

    for (const task of tasksList) {
        if (document.getElementById(task.id) === null) {
            
            const taskDiv = document.createElement("div");
            taskDiv.id = task.id;
            const taskSpan = document.createElement("span");
            taskSpan.classList.add("task-span");
            taskSpan.dataset.id = task.id;
            const taskP = document.createElement("p");
            taskP.classList.add("task-p");
            taskP.dataset.id = task.id;
            taskP.textContent = task.title;
            const priorityP = document.createElement("p");
            priorityP.classList.add(`${task.priority}`);
            priorityP.dataset.id = task.id;
            priorityP.textContent = task.priority;
            const dateP = document.createElement("p")
            dateP.classList.add("date-p");
            dateP.dataset.id = task.id;
            dateP.textContent = task.dueDate;
            const taskBubble = document.createElement("span");
            taskBubble.classList.add("task-bubble");
            taskBubble.innerHTML = emptyCircle;
            taskBubble.dataset.id = task.id;
            
            const svg = taskBubble.querySelector("svg");
            if (task.complete) {
                taskBubble.classList.add("complete");
                svg.setAttribute("fill", "black");
            } else {
                taskBubble.classList.add("incomplete");
                svg.setAttribute("fill", "none");
            }
            const taskTrash = document.createElement("span");
            taskTrash.innerHTML = trashIcon;
            taskTrash.classList.add("task-delete");
            taskTrash.dataset.id = task.id;

            taskDiv.classList.add("task");
            taskSpan.append(taskP, priorityP, dateP);
            taskDiv.append(taskBubble, taskSpan, taskTrash);
            taskContainer.append(taskDiv);

            
        }
    }
}

function removeTask(id) {
    console.log(`${id} removed`);
    localStorage.removeItem(id);
    const task = document.getElementById(id);
    task.remove();
}
function getTasks() {
    const tasks = Object.keys(localStorage).map((key) => {
        return Task.fromJSON(JSON.parse(localStorage.getItem(key)));
    });
    return tasks;
}

function listTasks() {
    let taskList = []
    const tasks = getTasks();
    for (const task of tasks) {
        taskList.push(task);
    }
    return taskList;
}

function viewTask(id) {
    const tasks = getTasks();
    const target = tasks.find(task => task.id === id);
    return target;
}

export { populateTasks, removeTask, listTasks, viewTask, taskContainer };