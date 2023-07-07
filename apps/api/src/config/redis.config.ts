import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface RedisConfig {
  port: number;
  host: string;
}

export const redisValidationSchema = {
  REDIS_PORT: Joi.number().default(6379),
  RANDOM_HOST: Joi.string().default('localhost' + ''),
};

export const redisConfigFactory = registerAs<RedisConfig>(
  'redis',
  (): RedisConfig => ({
    port: +(process.env.REDIS_PORT as string),
    host: process.env.RANDOM_HOST,
  })
);
