import "./styles.css";
import { populateTasks, removeTask, listTasks, viewTask, taskContainer } from "./taskView.js";
import { sidebar } from "./sidebar.js";
import { createTask } from "./createTask.js";
/* THIS MAY BE SCRAP IDK YET

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
*/

const header = document.getElementById("header");
const modal = document.getElementById("popupModal")
const closeBtn = document.getElementById("closeBtn");
const modalDiv = document.getElementById("modal-div");
const editButton = document.getElementById("edit");
let currentView = "all";

taskContainer.addEventListener("click", (event) => {
    if (event.target.closest(".task-bubble")) {
        const bubble = event.target.closest(".task-bubble");
        if (!bubble) return;
        const task = listTasks().find(task => task.id === bubble.dataset.id);
        if(task.complete === false) {
            task.markComplete();
           
            bubble.classList.add("complete")
            bubble.classList.remove("incomplete");
        } else {
            task.markIncomplete();
        
            bubble.classList.add("incomplete")
            bubble.classList.remove("complete");
        }   
        localStorage.setItem(task.id, JSON.stringify(task));
    } else if (event.target.closest(".task-delete")) {
        const trash = event.target.closest(".task-delete");
        if (!trash) return;
        const task = listTasks().find(task => task.id === trash.dataset.id);               
        if (!task) return;
        removeTask(task.id);
    } else if (event.target.closest(".task-span")) {
        const p = event.target.closest(".task-span");
        if (!p) return;
        modal.style.display = "block";
        showModal(p.dataset.id);
        closeBtn.onclick = () => modal.style.display = "none";
        window.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        };
    }
});

function switchView(view) {
    const now = new Date();
    switch (view) {
        case "taskList":
            currentView = "all";
            let list = listTasks();
            populateTasks("all");
            header.textContent = "Task List";
            
            break;
        case "today":
            currentView = "today";
            taskContainer.innerHTML = "";
            populateTasks("today");
            header.textContent = "Today";
            break;

        case "upcoming":
            currentView = "upcoming";
            taskContainer.innerHTML = "";
            populateTasks("upcoming");
            header.textContent = "Upcoming (Monthly)";
            break;

        case "future":
            currentView = "future";
            taskContainer.innerHTML = "";
            populateTasks("future");
            header.textContent = "Future (Next Month+)";
            break;

    }
}
function showModal(id) {
    modalDiv.id = "modal-div";
    modalDiv.innerHTML = "";
    modalDiv.append(displayTask(id));
    editButton.textContent = "Edit";
    editButton.onclick = () => showEdit(id);
}

function showEdit(id) {
    modalDiv.id = "edit-modal-div";
    const task = viewTask(id);

    const title = document.createElement("input");
    title.value = task.title;

    const dueDate = document.createElement("input");
    dueDate.type = "date";
    dueDate.value = task.dueDate;

    const priority = document.createElement("select");
    for (const level of ["Low", "Medium", "High"]) {
        priority.add(new Option(level, level));
    }
    priority.value = task.priority;

    const notes = document.createElement("input");
    notes.placeholder = "Notes: ";
    notes.value = task.notes;
    notes.id = "edit-modal-notes";

    const project = document.createElement("select");
    for (const proj of ["None", "Running", "Reading", "Coding"]) {
        project.add(new Option(proj, proj));
    }
    project.value = task.project;

    modalDiv.innerHTML = "";
    modalDiv.append(title, dueDate, priority, project, notes);

    editButton.textContent = "Save";
    editButton.onclick = () => {
        task.title = title.value;
        task.dueDate = dueDate.value;
        task.priority = priority.value;
        task.notes = notes.value;
        task.project = project.value;
        localStorage.setItem(task.id, JSON.stringify(task));
        taskContainer.innerHTML = "";
        populateTasks(currentView);
        showModal(id);
    }
}

function displayTask(id) {
    const div = document.createElement("div");
    const task = viewTask(id);
    const title = document.createElement("p");
    title.textContent = task.title;
    title.id = "modal-title";
    const dueDate = document.createElement("p");
    dueDate.textContent = task.dueDate;
    dueDate.id = "modal-due-date";
    const priority = document.createElement("p");
    priority.textContent = task.priority;
    priority.id = "modal-priority";
    const notes = document.createElement("p");
    notes.textContent = task.notes;
    notes.id = "modal-notes";
    const checklist = document.createElement("p");
    checklist.textContent = task.checklist;
    checklist.id = "modal-checklist";

    div.append(title, dueDate, priority, notes, checklist);
    return div;
}

//document.addEventListener("click", )

switchView("taskList");

export { switchView, currentView }