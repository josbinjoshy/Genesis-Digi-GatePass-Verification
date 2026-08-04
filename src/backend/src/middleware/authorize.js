import { ApiError } from '../utils/ApiError.js';

/**
 * Restricts a route to specific roles. Must be used after `authenticate`.
 * @param  {...string} allowedRoles - e.g. authorize('WARDEN', 'ADMIN')
 */
export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(ApiError.unauthorized('Authentication required'));
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(
      ApiError.forbidden(`Access denied. Required role(s): ${allowedRoles.join(', ')}`)
    );
  }

  next();
};
