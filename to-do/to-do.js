const FS = require('fs');
let tasksToDo = [];
const loadTasksToDoFromDB = () => {
    try { tasksToDo = require('../database/database.json'); }
    catch (error) {
        tasksToDo = [];
    }
};
const createTaskToDo = description => {
    loadTasksToDoFromDB();
    let taskToDo = {
        description,
        completed: false
    };
    tasksToDo.push(taskToDo);
    writeTasksToDoInDB();
    return taskToDo
};
const writeTasksToDoInDB = () => {
    FS.writeFile('database/database.json', JSON.stringify(tasksToDo), (error) => {
        if (error)
            throw new Error('It was not possible create tasksToDo');
    });
}
const readTasksToDoInDB = (completed = null) => {
    loadTasksToDoFromDB();
    if (completed !== null) {
        return tasksToDo.filter(task => task.completed === eval(completed))
    }
    else {
        return tasksToDo;
    }
}
const updateTaskToDo = (description, completed = true) => {
    loadTasksToDoFromDB();
    let index = tasksToDo.findIndex(task => task.description === description);
    if (index >= 0) {
        tasksToDo[index].completed = eval(completed);
        writeTasksToDoInDB();
        return true;
    }
    else {
        return false;
    }
}
const deleteTaskToDo = description => {
    loadTasksToDoFromDB();
    let newTasksToDo = tasksToDo.filter(task => task.description !== description);
    if (newTasksToDo.length === tasksToDo.length) {
        return false;
    }
    else {
        tasksToDo = newTasksToDo;
        writeTasksToDoInDB();
        return true;
    }
    /*let index = tasksToDo.findIndex(task => task.description === description);
    if (index >= 0) {
        tasksToDo.splice(index, 1);
        writeTasksToDoInDB();
        return true;
    }
    else {
        return false;
    }*/
}
module.exports = { createTaskToDo, readTasksToDoInDB, updateTaskToDo, deleteTaskToDo };