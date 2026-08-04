/**
 * Strips sensitive fields from a user object before it is
 * returned in any API response.
 * @param {object} user - Prisma User record
 * @returns {object} user without the password field
 */
export const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
};
