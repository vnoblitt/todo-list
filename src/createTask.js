import { Task } from "./Task.js";

//const task = new Task("create index", "code the html for template.html", "10/01/26", "high", "remember SOLID design principles", ["nav", "sidebar", "body"]);
//console.log(task);

const form = document.getElementById("form");

function createTask() {
     return new Promise((resolve) => {
        const container = document.createElement("div");
        container.classList.add("task-creator");

        const title = document.createElement("div");
        const titleLabel = document.createElement("label");
        titleLabel.htmlFor = "title";
        titleLabel.textContent = "Title: "
        const titleInput = document.createElement("input");
        titleInput.id = "title";
        title.append(titleLabel, titleInput);

        const description = document.createElement("div");
        const descriptionLabel = document.createElement("label");
        descriptionLabel.htmlFor = "description";
        descriptionLabel.textContent = "Description: ";
        const descriptionInput = document.createElement("input");
        descriptionInput.id = "description"
        description.append(descriptionLabel, descriptionInput);

        const dueDate = document.createElement("div");
        const dueDateLabel = document.createElement("label");
        dueDateLabel.htmlFor = "due-date";
        dueDateLabel.textContent = "Due Date: ";
        const dueDateInput = document.createElement("input");
        dueDateInput.id = "due-date";
        dueDate.append(dueDateLabel, dueDateInput);

        const priority = document.createElement("div");
        const priorityLabel = document.createElement("label");
        priorityLabel.htmlFor = "priority";
        priorityLabel.textContent = "Priority: ";
        const priorityInput = document.createElement("input");
        priorityInput.id = "priority";
        priority.append(priorityLabel, priorityInput);

        const notes = document.createElement("div");
        const notesLabel = document.createElement("label");
        notesLabel.htmlFor = "notes";
        notesLabel.textContent = "Notes: ";
        const notesInput = document.createElement("input");
        notesInput.id = "notes";
        notes.append(notesLabel, notesInput);

        const checklist = document.createElement("div");
        const checklistLabel = document.createElement("label");
        checklistLabel.htmlFor = "checklist";
        checklistLabel.textContent = "Checklist: ";
        const checklistInput = document.createElement("input");
        checklistInput.id = "checklist";
        checklist.append(checklistLabel, checklistInput);

        const submit = document.createElement("button");
        submit.textContent = "Create Task";
        submit.id = "submit-task"

        form.append(container);

        container.append(title, description, dueDate, priority, notes, checklist, submit);

        submit.addEventListener("click", () => {
            const task = submitTask(container);
            container.remove();
            resolve(task);
        });
    });
}

function submitTask(container) {
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const dueDate = document.getElementById("due-date");
    const priority = document.getElementById("priority");
    const notes = document.getElementById("notes");
    const checklist = document.getElementById("checklist");
    
    const taskTitle = title.value;
    const taskDescription = description.value;
    const taskDueDate = dueDate.value;
    const taskPriority = priority.value;
    const taskNotes = notes.value;
    const taskChecklist = checklist.value;

    const uniqueID = crypto.randomUUID();

    const createdTask = new Task(taskTitle, taskDescription, taskDueDate, taskPriority, taskNotes, taskChecklist, uniqueID);
    return createdTask;
}

export { createTask };