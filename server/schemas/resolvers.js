const { User, Thought } = require("../models");

const resolvers = {
  Query: {
    thoughts: async (parent, { username }) => {
      // parent is a placeholder
      // the question mark checks if username is exists, if does, we set params to an object with a username key set to that value
      // if doesn't, return an empty object
      // this can search for the username
      const params = username ? { username } : {};

      return Thought.find(params).sort({ createdAt: -1 }); // sort the thoughts in descending order
    },

    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },

    // get all the users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },

    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
  },
};

module.exports = resolvers;
