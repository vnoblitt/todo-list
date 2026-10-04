export class Task {
    constructor(title, dueDate, priority, notes, checklist, id) {
        this.title = title;
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