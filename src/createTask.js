import { Task } from "./Task.js";
import { populateTasks } from "./taskView.js";
import circlePlusIcon from "./icons/circle-plus.svg";

//const task = new Task("create index", "code the html for template.html", "10/01/26", "high", "remember SOLID design principles", ["nav", "sidebar", "body"]);
//console.log(task);

const form = document.getElementById("form");

function createTask() {
     return new Promise((resolve) => {
        const container = document.createElement("div");
        container.classList.add("task-creator");
        
        const title = document.createElement("input");
        title.id = "title";

        const dueDate = document.createElement("input");
        dueDate.type = "date";
        dueDate.id = "due-date";

        const priority = document.createElement("select");
        priority.id = "priority";
        const priorityChoices = [
            { id: "Low", name: "Low" },
            { id: "Medium", name: "Medium" },
            { id: "High", name: "High" }
        ];
            
        priorityChoices.forEach(choice => {
            const option = new Option(choice.name, choice.id);
            priority.add(option);
        });

        const submit = document.createElement("img");
        submit.src = circlePlusIcon;
        submit.id = "submit-task"

        form.append(container);

        container.append(title, dueDate, priority, submit);//dueDate, priority, notes, checklist, submit);

        title.focus();

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                container.remove();
                resolve(null);
                document.removeEventListener("keydown", handleEscape);
            }
        };

        document.addEventListener("keydown", handleEscape);

        title.addEventListener("keydown", (event) => {
            if(event.key === "Enter") {
                submit.click();
            }
        });

        submit.addEventListener("click", () => {
            const task = submitTask(container);
            container.remove();
            resolve(task);
            
        });
        
    });
}

function submitTask(container) {
    const title = document.getElementById("title");
    const dueDate = document.getElementById("due-date");
    const priority = document.getElementById("priority");
    const notes = document.getElementById("notes");
    const project = document.getElementById("checklist");
    
    const taskTitle = title.value;
    const taskDueDate = dueDate.value;
    const taskPriority = priority.value;
    const taskNotes = "";
    const taskProject = "None";
    const taskComplete = false;

    const uniqueID = crypto.randomUUID();

    const createdTask = new Task(taskTitle, taskDueDate, taskPriority, taskNotes, taskProject, uniqueID, taskComplete);
    return createdTask;
}

export { createTask };