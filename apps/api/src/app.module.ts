import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CoffeeModule } from './coffee/coffee.module';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configOptions, { AppConfig, RedisConfig } from './config';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    AuthModule,
    CoffeeModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService
      ): Promise<RedisModuleOptions> => {
        const redisConfig = configService.get<RedisConfig>('redis');

        return {
          config: {
            host: redisConfig.host,
            port: redisConfig.port,
          },
        };
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisConfig = configService.get<RedisConfig>('redis');
        const appConfig = configService.get<AppConfig>('app');

        return {
          ttl: appConfig.apiLimiter.ttl,
          limit: appConfig.apiLimiter.limit,
          storage: new ThrottlerStorageRedisService(
            new Redis({
              host: redisConfig.host,
              port: redisConfig.port,
            })
          ),
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
