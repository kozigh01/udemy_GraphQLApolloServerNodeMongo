const { skip } = require('graphql-resolvers');
const Task = require('../../database/models/task');
const { isValidObjectId } = require('../../database/util');

module.exports.isAuthenticated = (_1, _2, { email }) => {
  if (!email) {
    throw new Error('Access Denied! Please login to continue');
  }
  return skip;  // skip: calls the next resolver
};

module.exports.isTaskOwner = async (_, { id }, { loggedInUserId }) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Task Id');
    }
    const task = await Task.findById(id);
    if (!task) {
      throw new Error('Task not found');
    } else if (task.user.toString() !== loggedInUserId) {
      throw new Error('User is not owner of Task');
    }
    return skip;
  } catch(err) {
    console.log(err);
    throw err;
  }
};