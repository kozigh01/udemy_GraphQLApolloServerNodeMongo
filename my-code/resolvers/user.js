const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');

const User = require('../database/models/user');
const Task = require('../database/models/task');
const { isAuthenticated } = require('./middleware');

module.exports  = {
  Query: {
    users: combineResolvers(
      isAuthenticated,
        async () => {
        try {
          const users = await User.find();
          if (!users) {
            throw new Error('Users not found');
          }
          return users;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
    user: combineResolvers(
      isAuthenticated, 
      (_, { id }) =>  User.findOne({ _id: id }),
      // (_, { id }) =>  users.find(u => u.id === id)
    ),
    me: combineResolvers(
      isAuthenticated,
      async (_1, _2, { email }) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error('User not found');
          }
          return user;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
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
    },
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (!user) {
          throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(input.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Incorrect Password');
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY || 'mysecretkey', { expiresIn: '1d' });
        return { token };
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  User: {
    tasks: async ({ id }) => {
      try {
        const task = await Task.find({ user: id });
        return task;
      } catch(err) {
        console.log(err);
        throw err;
      }
    }
  },
};