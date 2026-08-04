import { usersRepository } from '../users/users.repository.js';
import { hashPassword, comparePassword } from '../../utils/password.js';
import { signToken } from '../../utils/jwt.js';
import { sanitizeUser } from '../../utils/sanitize.js';
import { ApiError } from '../../utils/ApiError.js';

export const authService = {
  /**
   * Registers a new user (STUDENT, WARDEN, or GUARD only).
   * @param {{ name: string, email: string, password: string, role: string }} input
   */
  register: async (input) => {
    const existingUser = await usersRepository.findByEmail(input.email);
    if (existingUser) {
      throw ApiError.conflict('An account with this email already exists');
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await usersRepository.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role,
    });

    const token = signToken(user);

    return {
      user: sanitizeUser(user),
      token,
    };
  },

  /**
   * Authenticates a user and issues a JWT on success.
   * @param {{ email: string, password: string }} input
   */
  login: async (input) => {
    const user = await usersRepository.findByEmail(input.email);
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const isPasswordValid = await comparePassword(input.password, user.password);
    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const token = signToken(user);

    return {
      user: sanitizeUser(user),
      token,
    };
  },

  /**
   * Returns the currently authenticated user's profile.
   * @param {string} userId
   */
  getProfile: async (userId) => {
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return sanitizeUser(user);
  },
};
