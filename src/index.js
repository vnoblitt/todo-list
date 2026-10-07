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

function switchView(view) {
    switch (view) {
        case "taskList":
            let list = listTasks();
            populateTasks();
            header.textContent = "Task List";
            taskContainer.addEventListener("click", (event) => {
                if (event.target.closest(".task-bubble")) {
                    const bubble = event.target.closest(".task-bubble");
                    if (!bubble) return;
                    const task = listTasks().find(task => task.id === bubble.dataset.id);
                    if(task.complete === false) {
                        task.markComplete();
                        event.target.style.fill = "black";
                        bubble.classList.add("complete")
                        bubble.classList.remove("incomplete");
                    } else {
                        task.markIncomplete();
                        event.target.style.fill = "none";
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
                } else if (event.target.closest(".task-p")) {
                    const p = event.target.closest(".task-p");
                    if (!p) return;
                    modal.style.display = "block";
                    const modalDiv = document.getElementById("modal-div");
                    const modalContent = displayTask(p.dataset.id);
                    modalDiv.innerHTML = "";
                    modalDiv.append(modalContent);
                    window.onclick = (e) => {
                        if (e.target === modal) {
                            modal.style.display = "none";
                        }
                    };
                }
            });
            break;
    }
}

function displayTask(id) {
    const div = document.createElement("div");
    const task = viewTask(id);
    const title = document.createElement("p");
    title.textContent = task.title;
    const dueDate = document.createElement("p");
    dueDate.textContent = task.dueDate;
    const priority = document.createElement("p");
    priority.textContent = task.priority;
    const notes = document.createElement("p");
    notes.textContent = task.notes;
    const checklist = document.createElement("p");
    checklist.textContent = task.checklist;

    div.append(title, dueDate, priority, notes, checklist);
    return div;
}

//document.addEventListener("click", )

switchView("taskList");

export { switchView }