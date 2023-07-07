import { Injectable, Logger, NestMiddleware, Req } from '@nestjs/common';
import { FastifyRequest, FastifyReply} from 'fastify';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(@Req() req: FastifyRequest & { originalUrl?: string}, res: FastifyReply, next) {
    this.logger.log(`Request: ${req.method} ${req.originalUrl}`);
    if(next) {
      next();
    }
  }
}
