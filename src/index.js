import "./styles.css";
import { populateTasks, removeTask, listTasks, viewTask, taskContainer } from "./taskView.js";
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
            let list = listTasks();
            populateTasks();
            taskContainer.addEventListener("click", (event) => {
                if (event.target.closest(".task-bubble")) {
                    const bubble = event.target.closest(".task-bubble");
                    if (!bubble) return;
                    const task = list.find(task => task.id === bubble.id);
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
                    console.log("hit")
                    const trash = event.target.closest(".task-delete");
                    if (!trash) return;
                    const task = list.find(task => task.id === trash.id);
                    removeTask(task.id);
                }
            });
            break;
    }
}

//document.addEventListener("click", )

switchView("taskList");
console.log(listTasks());
const id = "198398dd-ac43-425c-a167-69bd0fb54076"
const tasksList = listTasks();
const targetTask = tasksList.find(task => task.id === id);
console.log(targetTask)
export { switchView }