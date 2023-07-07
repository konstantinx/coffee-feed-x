import {
  CanActivate,
  ExecutionContext,
  Injectable, Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const sid = context.switchToHttp().getRequest().cookies.sid;
    if (!sid) {
      const message = 'Attempt to run a request without a Session ID';
      this.logger.error(message);
      throw new UnauthorizedException(message);
    }

    return sid;
  }
}
