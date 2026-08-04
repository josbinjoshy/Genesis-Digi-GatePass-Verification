import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal server error';
  let details = null;

  // ==============================
  // Known operational errors (thrown intentionally by our code)
  // ==============================
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  }

  // ==============================
  // Zod validation errors
  // ==============================
  else if (err.name === 'ZodError') {
    statusCode = 400;
    message = 'Validation failed';
    details = err.errors?.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
  }

  // ==============================
  // Prisma known request errors
  // ==============================
  else if (err.code === 'P2002') {
    // Unique constraint violation
    statusCode = 409;
    message = `A record with this ${err.meta?.target?.join(', ') || 'value'} already exists`;
  } else if (err.code === 'P2025') {
    // Record not found (e.g. update/delete on non-existent row)
    statusCode = 404;
    message = 'Record not found';
  } else if (err.code === 'P2003') {
    // Foreign key constraint failure
    statusCode = 400;
    message = 'Invalid reference to a related record';
  }

  // ==============================
  // JWT errors
  // ==============================
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token has expired';
  }

  // ==============================
  // Log unexpected (non-operational) errors for debugging
  // ==============================
  if (statusCode === 500) {
    console.error('🔥 Unexpected error:', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
    ...(!env.isProduction && statusCode === 500 ? { stack: err.stack } : {}),
  });
};
