const { verifyToken } = require('../utils/jwt');
const ApiError = require('../utils/apiError');

/**
 * Protects a route by requiring a valid "Bearer <token>" Authorization header.
 * On success, attaches req.userId for downstream handlers.
 */
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Not authorized, no token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    req.userId = decoded.id;
    next();
  } catch (error) {
    next(new ApiError(401, 'Not authorized, token is invalid or expired'));
  }
};

module.exports = protect;
