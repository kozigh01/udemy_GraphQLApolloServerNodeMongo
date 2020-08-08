const User = require('../database/models/user');

module.exports.batchUsers = async (userIds) => {
  console.log("===User Loader Ids::", userIds);
  const users = await User.find({ _id: { $in: userIds }});

  // need to return the users in the same order as the userIds input
  return userIds.map(id => users.find(user => user.id === id));
}