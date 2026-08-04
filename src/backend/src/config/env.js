import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,

  databaseUrl: process.env.DATABASE_URL,

  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',

  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',

  qrTokenExpiryMinutes: parseInt(process.env.QR_TOKEN_EXPIRY_MINUTES, 10) || 60,

  isProduction: process.env.NODE_ENV === 'production',
};
