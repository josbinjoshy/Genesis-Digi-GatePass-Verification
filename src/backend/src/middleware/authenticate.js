import { verifyToken } from '../utils/jwt.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Verifies the JWT in the Authorization header and attaches
 * the decoded payload to req.user. Must run before any
 * route that requires a logged-in user.
 */
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('No authentication token provided'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // { userId, role, iat, exp }
    next();
  } catch (err) {
    // JsonWebTokenError / TokenExpiredError are handled by errorHandler
    next(err);
  }
};
