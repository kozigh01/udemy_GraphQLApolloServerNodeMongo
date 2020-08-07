const { combineResolvers } = require('graphql-resolvers');

const Task = require('../database/models/task');
const User = require('../database/models/user');
const { isAuthenticated, isTaskOwner } = require('./middleware');


module.exports = {
  Query: {
    tasks: combineResolvers(
      isAuthenticated,
      async (_1, { skip = 0, limit = 10 }, { loggedInUserId }) => { 
        try {
          const tasks = await Task.find({ user: loggedInUserId })
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);
          return tasks;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
    task: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (_, { id }) => {
        try {
          const task = await Task.findById(id);
          return task;
        } catch (err) {
          console.log(err);
          throw err;
        }
      } 
    ),
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
    ),
    updateTask: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (_, { id, input }) => {
        try {
          const task = await Task.findByIdAndUpdate(id, { ...input }, { new: true });
          return task;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
    deleteTask: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (_, { id }, { loggedInUserId }) => {
        try {
          const task = await Task.findByIdAndDelete(id);
          await User.updateOne({ _id: loggedInUserId}, { $pull: { tasks: task.id }});
          return task;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
  },
  Task: {
    user: async ({ user: id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } 
  },
}