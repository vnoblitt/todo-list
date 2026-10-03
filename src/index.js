import "./styles.css";
import circlePlusIcon from "./icons/circle-plus.svg";
import listIcon from "./icons/list.svg";
import { createTask } from "./createTask.js";
import { listTasks, viewTask } from "./taskList.js";

const content = document.getElementById("content");
const buttons = document.getElementById("buttons");
const taskViewer = document.getElementById("task-viewer");
const taskContainer = document.createElement("div");
taskContainer.id = "task-container";
content.append(taskContainer);

// SIDEBAR WIP ----------------------------------------
const sidebar = document.getElementById("sidebar");

const addTaskView = document.createElement("div");
addTaskView.classList.add("sidebar-element");
const addTaskIcon = document.createElement("img");
addTaskIcon.classList.add("sidebar-icon");
addTaskIcon.src = circlePlusIcon;
addTaskIcon.active = true;
addTaskIcon.addEventListener("click", async () => {
    if(addTaskIcon.active) {
        addTaskIcon.active = false;
        const task = await createTask();
        localStorage.setItem(`${task.id}`, JSON.stringify(task));
        populateTasks.click();
        addTaskIcon.active = true;
    }
})
const addTaskText = document.createElement("div");
addTaskText.classList.add("sidebar-text");
addTaskText.textContent = "Add Task";

addTaskView.append(addTaskIcon, addTaskText);

const taskListView = document.createElement("div");
taskListView.classList.add("sidebar-element");
const taskListIcon = document.createElement("img");
taskListIcon.classList.add("sidebar-icon");
taskListIcon.src = listIcon;
taskListIcon.textContent = "TEST"
taskListIcon.addEventListener("click", () => {
    console.log("task list requested");
});
const taskListText = document.createElement("div");
taskListText.classList.add("sidebar-text");
taskListText.textContent = "Task List";

taskListView.append(taskListIcon, taskListText);

sidebar.append(addTaskView, taskListView);
// SIDEBAR -----------------------------------------------
const tasksList = listTasks();

for (const task of tasksList) {
    if (document.getElementById(task.id) === null) {
        const taskDiv = document.createElement("div");
        taskDiv.id = task.id;
        taskDiv.textContent = task.title;
        taskDiv.classList.add("task");
        taskContainer.append(taskDiv);
    }
}

//const input = document.createElement("input");
//.content.textContent = "hello world";

//document.body.append(input);
/*
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        console.log(input.value);
    }
})
*/

//console.log(localStorage.getItem("task"));

const newTaskButton = document.createElement("button");
newTaskButton.textContent = "Create Task";
buttons.append(newTaskButton);

const populateTasks = document.createElement("button");
populateTasks.textContent = "Populate Tasks"
buttons.append(populateTasks);

const clearStorage = document.createElement("button");
clearStorage.textContent = "Clear Storage"
buttons.append(clearStorage);

newTaskButton.addEventListener("click", async () => {
    newTaskButton.disabled = true;
    const task = await createTask();
    localStorage.setItem(`${task.id}`, JSON.stringify(task));
    populateTasks.click();
    newTaskButton.disabled = false;
});

populateTasks.addEventListener("click", () => {
    const tasksList = listTasks();
    for (const task of tasksList) {
        if (document.getElementById(task.id) === null) {
            const taskDiv = document.createElement("div");
            taskDiv.id = task.id;
            taskDiv.textContent = task.title;
            taskDiv.classList.add("task");
            taskContainer.append(taskDiv);
        }
    }
});

clearStorage.addEventListener("click", () => {
    localStorage.clear();
})

taskContainer.addEventListener("click", (event) => {
    taskViewer.innerHTML = "";
    const clicked = event.target.closest(".task");

    const bigTaskTitle = document.createElement("h1");
    bigTaskTitle.classList.add("big-task");
    bigTaskTitle.textContent = viewTask(clicked.id).title;

    const bigTaskDescription = document.createElement("p");
    bigTaskDescription.classList.add("big-task");
    bigTaskDescription.textContent = viewTask(clicked.id).description;

    const bigTaskDueDate = document.createElement("p");
    bigTaskDueDate.classList.add("big-task");
    bigTaskDueDate.textContent = viewTask(clicked.id).dueDate;

    const bigTaskPriority = document.createElement("p");
    bigTaskPriority.classList.add("big-task");
    bigTaskPriority.textContent = viewTask(clicked.id).priority;

    const bigTaskNotes = document.createElement("p");
    bigTaskNotes.classList.add("big-task");
    bigTaskNotes.textContent = viewTask(clicked.id).notes;

    const bigTaskChecklist = document.createElement("p");
    bigTaskChecklist.classList.add("big-task");
    bigTaskChecklist.textContent = viewTask(clicked.id).checklist;

    const bigTaskRemove = document.createElement("button");
    bigTaskRemove.classList.add("big-task");
    bigTaskRemove.textContent = "Delete";
    bigTaskRemove.addEventListener("click", () => removeTask(clicked.id));

    taskViewer.append(bigTaskTitle, bigTaskDescription, bigTaskDueDate, bigTaskPriority, bigTaskNotes, bigTaskChecklist, bigTaskRemove);

    console.log(viewTask(clicked.id));
});

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

const initialTask = taskContainer.querySelector(".task");
if (initialTask) {
    initialTask.click();
}

console.log(listTasks())