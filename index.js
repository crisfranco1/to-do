require('colors');
const { argv } = require('./config/yargs');
const { createTaskToDo, readTasksToDoInDB, updateTaskToDo, deleteTaskToDo } = require('./to-do/to-do')
let command = argv._[0];
switch (command) {
    case 'create':
        console.log(createTaskToDo(argv.description));
        break;
    case 'read':
        let tasksToDo = readTasksToDoInDB(argv.completed);
        for (i = 0; i < tasksToDo.length; i++) {
            console.log('==Tasks to do=='.green);
            console.log(tasksToDo[i].description);
            console.log(tasksToDo[i].completed);
            console.log('==============='.green);
        }
        break;
    case 'update':
        let updated = updateTaskToDo(argv.description, argv.completed);
        console.log(updated);
        break;
    case 'delete':
        console.log(deleteTaskToDo(argv.description));
        break;
    default:
        console.log('default');
}