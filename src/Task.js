export class Task {
    constructor(title, dueDate, priority, notes, checklist, id, complete) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.id = id;
        this.complete = complete;
    }

    markComplete() {
        this.complete = true;
    }

    markIncomplete() {
        this.complete = false;
    }

    static fromJSON(data) {
        return new Task(data.title, data.dueDate, data.priority, data.notes, data.checklist, data.id, data.complete);
    }
}