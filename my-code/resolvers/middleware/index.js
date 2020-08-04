const { skip } = require('graphql-resolvers');

module.exports.isAuthenticated = (_, _2, { email }) => {
  if (!email) {
    throw new Error('Access Denied! Please login to continue');
  }
  return skip;  // skip: calls the next resolver
}