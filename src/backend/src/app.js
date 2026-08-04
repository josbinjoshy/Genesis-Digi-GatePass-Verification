import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const app = express();

// ==============================
// Global Middleware
// ==============================
app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.isProduction ? 'combined' : 'dev'));

// ==============================
// Health Check
// ==============================
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==============================
// Module Routes (mounted incrementally as modules are built)
// ==============================
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/gatepass', gatepassRoutes);
// app.use('/api/qr', qrRoutes);
// app.use('/api/audit', auditRoutes);
// app.use('/api/notifications', notificationRoutes);

// ==============================
// 404 + Error Handling (must be last)
// ==============================
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
