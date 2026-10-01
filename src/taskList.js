function getTasks() {
    const tasks = Object.keys(localStorage).map((key) => {
        return JSON.parse(localStorage.getItem(key));
    });
    return tasks;
}

function listTasks() {
    let taskList = []
    const tasks = getTasks();
    for (const task of tasks) {
        taskList.push(task);
    }
    return taskList;
}

function viewTask(id) {
    const tasks = getTasks();
    const target = tasks.find(task => task.id === id);
    return target;
}

export { listTasks, viewTask };