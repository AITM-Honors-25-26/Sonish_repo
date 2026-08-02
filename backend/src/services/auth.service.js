const User = require('../models/user.model');
const ApiError = require('../utils/apiError');
const { generateToken } = require('../utils/jwt');

/**
 * Register a new user.
 * @param {{name: string, email: string, password: string}} data
 */
const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, 'An account with this email already exists');
  }

  const user = await User.create({ name, email, password });

  const token = generateToken({ id: user._id });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};

/**
 * Authenticate a user with email + password.
 * @param {{email: string, password: string}} data
 */
const loginUser = async ({ email, password }) => {
  // password has select:false on the schema, so explicitly request it
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken({ id: user._id });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};

/**
 * Fetch the currently authenticated user's profile.
 * @param {string} userId
 */
const getProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
