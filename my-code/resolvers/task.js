const { combineResolvers } = require('graphql-resolvers');

const uuid = require('uuid');
const { users, tasks } = require('../constants/index');
const Task = require('../database/models/task');
const User = require('../database/models/user');
const { isAuthenticated } = require('./middleware');

module.exports = {
  Query: {
    tasks: () => tasks,
    task: (_, { id }) => tasks.find(t => t.id === id),
  },
  Mutation: {
    createTask: combineResolvers(
      isAuthenticated,
      async (_, { input }, { email }) => {
        try {
          const user = await User.findOne({ email });
          const task = new Task({ ...input, user: user.id });
          const result = await task.save();
          user.tasks.push(result.id);
          await user.save();
          return task;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ) 
  },
  Task: {
    // user: (parent) =>  users.find(u => u.id === parent.userId)
    user: async ({ user: id }) => {
      try {
        const user = await User.findOne({ _id: id });
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } 
  },
}