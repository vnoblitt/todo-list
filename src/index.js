import "./styles.css";
import { populateTasks, removeTask, listTasks, viewTask } from "./taskView.js";
import { sidebar } from "./sidebar.js";

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

function switchView(view) {
    switch (view) {
        case "taskList":
            console.log(listTasks());
            populateTasks();
            break;
    }
}

export { switchView }

console.log(listTasks())