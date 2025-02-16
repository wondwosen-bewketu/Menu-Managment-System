// src/config/configuration.ts
import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface AppConfig {
  nodeEnv: string;
  port: number;
  database: DatabaseConfig;
  security: SecurityConfig;
  api: ApiConfig;
  menu: MenuConfig;
}

export interface DatabaseConfig {
  url: string;
  logging: boolean;
}

export interface SecurityConfig {
  corsOrigin: string[];
  rateLimit: number;
}

export interface ApiConfig {
  prefix: string;
  version: string;
  debug: boolean;
}

export interface MenuConfig {
  maxDepth: number;
  defaultQueryDepth: number;
  nameMaxLength: number;
  nameMinLength: number;
}

export default registerAs(
  'app',
  (): AppConfig => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      url: process.env.DATABASE_URL,
      logging: process.env.DATABASE_LOGGING === 'true',
    },
    security: {
      corsOrigin: process.env.CORS_ORIGIN?.split(',') || ['*'],
      rateLimit: parseInt(process.env.RATE_LIMIT) || 100,
    },
    api: {
      prefix: process.env.API_PREFIX || 'api',
      version: process.env.API_VERSION || '1.0',
      debug: process.env.API_DEBUG === 'true',
    },
    menu: {
      maxDepth: parseInt(process.env.MENU_MAX_DEPTH) || 5,
      defaultQueryDepth: parseInt(process.env.MENU_DEFAULT_QUERY_DEPTH) || 2,
      nameMaxLength: parseInt(process.env.MENU_NAME_MAX_LENGTH) || 50,
      nameMinLength: parseInt(process.env.MENU_NAME_MIN_LENGTH) || 2,
    },
  }),
);

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  DATABASE_URL: Joi.string().required(),
  DATABASE_LOGGING: Joi.boolean().default(false),
  CORS_ORIGIN: Joi.string().optional(),
  RATE_LIMIT: Joi.number().default(100),
  API_PREFIX: Joi.string().default('api'),
  API_VERSION: Joi.string().default('1.0'),
  API_DEBUG: Joi.boolean().default(false),
  MENU_MAX_DEPTH: Joi.number().min(1).max(10).default(5),
  MENU_DEFAULT_QUERY_DEPTH: Joi.number().min(1).max(5).default(2),
  MENU_NAME_MAX_LENGTH: Joi.number().min(5).max(100).default(50),
  MENU_NAME_MIN_LENGTH: Joi.number().min(2).max(20).default(2),
});
