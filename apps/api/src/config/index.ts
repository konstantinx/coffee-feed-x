import {ConfigModuleOptions} from '@nestjs/config';
import * as Joi from 'joi';
import {appConfigFactory, appValidationSchema} from './app.config';
import {redisConfigFactory, redisValidationSchema} from './redis.config';


export {AppConfig} from './app.config';
export {RedisConfig} from './redis.config';

const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  ignoreEnvFile: true,
  validationSchema: Joi.object({
    ...appValidationSchema,
    ...redisValidationSchema,
  }),
  load: [
    appConfigFactory,
    redisConfigFactory,
  ],
};

export default configOptions;

