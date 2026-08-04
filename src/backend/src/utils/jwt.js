import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Signs a JWT for an authenticated user.
 * @param {{ id: string, role: string }} user
 * @returns {string} signed JWT
 */
export const signToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
};

/**
 * Verifies a JWT and returns its decoded payload.
 * Throws JsonWebTokenError / TokenExpiredError on failure,
 * which are caught by the global error handler.
 * @param {string} token
 * @returns {{ userId: string, role: string, iat: number, exp: number }}
 */
export const verifyToken = (token) => {
  return jwt.verify(token, env.jwtSecret);
};
