import {registerAs} from '@nestjs/config';
import * as Joi from 'joi';

export interface AppConfig {
  globalApiPrefix: string;
  port: number;
  randomCoffeeUrl: string;
  randomCoffeeImageUrl: string;
  apiLimiter: {
    ttl: number;
    limit: number;
  }
}

export const appValidationSchema = {
  GLOBAL_API_PREFIX: Joi.string().default('api'),
  PORT: Joi.number().default(3000),
  RANDOM_COFFEE_URL: Joi.string().default('https://random-data-api.com/api/coffee/random_coffee'),
  RANDOM_COFFEE_IMAGE_URL: Joi.string().default('https://loremflickr.com/json/500/500/coffee,bean'),
  API_LIMITER_TTL: Joi.number().default(60),
  API_LIMITER_LIMIT: Joi.number().default(1000),
};

export const appConfigFactory = registerAs<AppConfig>(
  'app',
  (): AppConfig => ({
    globalApiPrefix: process.env.GLOBAL_API_PREFIX,
    port: +(process.env.PORT as string),
    randomCoffeeUrl: process.env.RANDOM_COFFEE_URL,
    randomCoffeeImageUrl: process.env.RANDOM_COFFEE_IMAGE_URL,
    apiLimiter: {
      ttl: +(process.env.API_LIMITER_TTL as string),
      limit: +(process.env.API_LIMITER_LIMIT as string),
    },
  }),
);
