// sidebar.js
import circlePlusIcon from "./icons/circle-plus.svg";
import listIcon from "./icons/list.svg";
import clockIcon from "./icons/clock.svg";
import calendarClockIcon from "./icons/calendar-clock.svg";
import sproutIcon from "./icons/sprout.svg";
import trashIcon from "./icons/trash.svg";
import { createTask } from "./createTask.js";
import { switchView } from "./index.js";
import { populateTasks } from "./taskView.js";

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
        if (task) {
            localStorage.setItem(`${task.id}`, JSON.stringify(task));
            populateTasks();
        }
        addTaskIcon.active = true;
    }
});
const addTaskText = document.createElement("div");
addTaskText.classList.add("sidebar-text");
addTaskText.textContent = "Add Task";
addTaskView.append(addTaskIcon, addTaskText);

const taskListView = document.createElement("div");
taskListView.classList.add("sidebar-element");
const taskListIcon = document.createElement("img");
taskListIcon.classList.add("sidebar-icon");
taskListIcon.src = listIcon;
taskListIcon.addEventListener("click", () => {
    console.log("task view requested");
    switchView("taskList");
});
const taskListText = document.createElement("div");
taskListText.classList.add("sidebar-text");
taskListText.textContent = "Task List";
taskListView.append(taskListIcon, taskListText);

const todayView = document.createElement("div");
todayView.classList.add("sidebar-element");
const todayIcon = document.createElement("img");
todayIcon.classList.add("sidebar-icon");
todayIcon.src = clockIcon;
todayIcon.addEventListener("click", () => {
    console.log("today view requested");
});
const todayText = document.createElement("div");
todayText.classList.add("sidebar-text");
todayText.textContent = "Today's Tasks";
todayView.append(todayIcon, todayText);

const upcomingView = document.createElement("div");
upcomingView.classList.add("sidebar-element");
const upcomingIcon = document.createElement("img");
upcomingIcon.classList.add("sidebar-icon");
upcomingIcon.src = calendarClockIcon;
upcomingIcon.addEventListener("click", () => {
    console.log("upcoming view requested");
});
const upcomingText = document.createElement("div");
upcomingText.classList.add("sidebar-text");
upcomingText.textContent = "Upcoming Tasks";
upcomingView.append(upcomingIcon, upcomingText);

const futureView = document.createElement("div");
futureView.classList.add("sidebar-element");
const futureIcon = document.createElement("img");
futureIcon.classList.add("sidebar-icon");
futureIcon.src = sproutIcon;
futureIcon.addEventListener("click", () => {
    console.log("future view requested");
});
const futureText = document.createElement("div");
futureText.classList.add("sidebar-text");
futureText.textContent = "Future Tasks";
futureView.append(futureIcon, futureText);

// ONLY FOR TESTING --------------------------------------
const deleteLocalStorage = document.createElement("div");
deleteLocalStorage.classList.add("sidebar-element");
const deleteIcon = document.createElement("img");
deleteIcon.classList.add("sidebar-icon");
deleteIcon.src = trashIcon;
deleteIcon.addEventListener("click", () => {
    console.log("delete local storage requested");
    localStorage.clear();
});
const deleteText = document.createElement("div");
deleteText.classList.add("sidebar-text");
deleteText.textContent = "Delete Storage";
deleteLocalStorage.append(deleteIcon, deleteText);

sidebar.append(addTaskView, taskListView, todayView, upcomingView, futureView, deleteLocalStorage);

export { sidebar }
// SIDEBAR -----------------------------------------------

