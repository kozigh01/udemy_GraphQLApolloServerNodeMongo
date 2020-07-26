const uuid = require('uuid');
const { users, tasks } = require('../constants/index');

module.exports = {
  Query: {
    tasks: () => tasks,
    task: (_, { id }) => tasks.find(t => t.id === id),
  },
  Mutation: {
    createTask: (_, { input }) => {
      tasks.push( {...input, id: uuid.v4() } );
      return tasks[tasks.length - 1];
    }
  },
  Task: {
    // user: (parent) =>  users.find(u => u.id === parent.userId)
    user: ({ userId }) =>  users.find(u => u.id === userId)
  },
}