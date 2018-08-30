const description = {
    demand: true,
    alias: 'd',
    desc: 'Description of the homework to do'
};
const completed = {
    demand: true,
    alias: 'c',
    desc: 'State of the homework to do'
};
const argv = require('yargs')
    .command('create', 'Create element to do', {
        description
    })
    .command('read', 'Read tasks to do', {
        completed: {
            demand: false,
            alias: 'c',
            desc: 'State of the homework to do'
        }
    })
    .command('update', 'Update element to do', {
        description,
        completed
    })
    .command('delete', 'Delete element to do', {
        description
    })
    .help()
    .argv;
module.exports = { argv };