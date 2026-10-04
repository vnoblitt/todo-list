import { sidebar } from "./sidebar.js";
import emptyCircle from "./icons/circle.svg";

const content = document.getElementById("content");
const taskViewer = document.getElementById("task-viewer");

const taskContainer = document.createElement("div");
taskContainer.id = "task-container";
content.append(taskContainer);

const initialTask = taskContainer.querySelector(".task");
if (initialTask) {
    initialTask.click();
}

function populateTasks() {
    const tasksList = listTasks();
    for (const task of tasksList) {
        if (document.getElementById(task.id) === null) {
            const taskDiv = document.createElement("div");
            const taskP = document.createElement("p");
            taskP.id = task.id;
            taskP.textContent = task.title;
            const taskBubble = document.createElement("img");
            taskBubble.src = emptyCircle;
            taskDiv.classList.add("task");
            taskDiv.append(taskBubble, taskP);
            taskContainer.append(taskDiv);
        }
    }
}

function removeTask(id) {
    console.log(`${id} removed`);
    localStorage.removeItem(id);
    taskContainer.innerHTML = "";
    taskViewer.innerHTML = "";
    populateTasks.click();
    const task = taskContainer.querySelector(".task");
    if (task) {
        task.click();
    }
}
function getTasks() {
    const tasks = Object.keys(localStorage).map((key) => {
        return JSON.parse(localStorage.getItem(key));
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

export { populateTasks, removeTask, listTasks, viewTask };