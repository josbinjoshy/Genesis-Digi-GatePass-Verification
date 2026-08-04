import { prisma } from '../../config/db.js';

export const usersRepository = {
  /**
   * Finds a user by email. Includes password hash (for auth checks).
   * @param {string} email
   */
  findByEmail: async (email) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  /**
   * Finds a user by ID.
   * @param {string} id
   */
  findById: async (id) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  /**
   * Creates a new user record.
   * @param {{ name: string, email: string, password: string, role: string }} data
   */
  create: async (data) => {
    return prisma.user.create({
      data,
    });
  },

  /**
   * Returns all users, optionally filtered by role.
   * @param {{ role?: string }} filters
   */
  findAll: async (filters = {}) => {
    return prisma.user.findMany({
      where: {
        ...(filters.role ? { role: filters.role } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  },
};
