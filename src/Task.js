export class Task {
    constructor(title, description, dueDate, priority, notes, checklist, id) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.id = id;
        this.complete = false;
    }

    markComplete() {
        this.complete = true;
    }
}