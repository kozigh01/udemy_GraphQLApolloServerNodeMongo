const uuid = require('uuid');
const { users, tasks } = require('../constants/index');

module.exports  = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(u => u.id === id),
  },
  User: {
    tasks: ({ id }) => tasks.filter(t => t.userId == id)
  },
};