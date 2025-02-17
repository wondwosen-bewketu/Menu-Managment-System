import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const config = {
  app: {
    name: process.env.APP_NAME || 'NestJS Application',
    port: parseInt(process.env.PORT, 10) || 3000,
    environment: process.env.NODE_ENV || 'development',
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  security: {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders:
        process.env.CORS_ALLOWED_HEADERS || 'Content-Type, Authorization',
    },
  },
};
