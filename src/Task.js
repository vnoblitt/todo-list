export class Task {
    constructor(title, dueDate, priority, notes, project, id, complete) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.project = project;
        this.id = id;
        this.complete = complete;
    }

    markComplete() {
        this.complete = true;
    }

    markIncomplete() {
        this.complete = false;
    }
/* 
   addProject(project) {
        this.project = project;
    }

    addNote(note) {
        this.notes = note;
    }
*/

    static fromJSON(data) {
        return new Task(data.title, data.dueDate, data.priority, data.notes, data.project, data.id, data.complete);
    }
}