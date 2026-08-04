/**
 * Returns an Express middleware that validates req.body against
 * the given Zod schema. On success, replaces req.body with the
 * parsed (and type-coerced/sanitized) data. On failure, forwards
 * the ZodError to the global error handler.
 *
 * @param {import('zod').ZodSchema} schema
 */
export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
