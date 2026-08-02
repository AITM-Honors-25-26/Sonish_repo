const authService = require('../services/auth.service');

/**
 * @route POST /api/auth/register
 */
const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/auth/me
 * Requires auth middleware to have set req.userId
 */
const getMe = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.userId);

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe };
