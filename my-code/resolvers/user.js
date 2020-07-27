const uuid = require('uuid');
const bcrypt = require('bcryptjs');

const { users, tasks } = require('../constants/index');
const User = require('../database/models/user');

module.exports  = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(u => u.id === id),
  },
  Mutation: {
    signUp: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email })
        if (user) {
          throw new Error('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const newUser = User({...input, password: hashedPassword});
        const result = await newUser.save();
        return result;
      } catch(err) {
        console.error(err);
        throw err;
      }
    }
  },
  User: {
    tasks: ({ id }) => tasks.filter(t => t.userId == id)
  },
};