import {
  CallHandler,
  ExecutionContext,
  Injectable, Logger,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { TooManyRequestsException } from '../exceptions/too-many-requests.exception';

@Injectable()
export class OneRequestPerSessionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(OneRequestPerSessionInterceptor.name);
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const sid = context.switchToHttp().getRequest().cookies.sid;
    const requestPath = context.switchToHttp().getRequest().url;
    const httpMethod = context.switchToHttp().getRequest().method;
    const lockKey = `session:${sid}:request:${httpMethod}:${requestPath}:lock`;
    const result = await this.redis.set(lockKey, 1, 'EX', 10, 'NX');

    if (result === null) {
      const message = 'Attempt to execute more than 1 request at a time for same session.';
      this.logger.error(`${message} Session ID: ${sid}`)
      throw new TooManyRequestsException(message);
    }

    return next.handle().pipe(
      tap(async (): Promise<void> => {
        await this.redis.del(lockKey);
      })
    );
  }
}
