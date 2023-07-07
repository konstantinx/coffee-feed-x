import {
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { uid } from 'uid';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply
  ) {
    let sid = req.cookies.sid;

    if (sid) {
      this.logger.warn(
        `Found an existing session. No new one will be generated. Session ID: ${sid}`
      );
      return;
    }

    sid = uid(32);

    res.setCookie('sid', sid, {
      expires: new Date(Date.now() + 1000 * 60 * 24 * 30),
      sameSite: 'none',
      path: '/',
      secure: true,
      httpOnly: false,
    });

    this.logger.log(
      `New session is created and set in the request cookie. Session ID: ${sid}`
    );
  }
}
