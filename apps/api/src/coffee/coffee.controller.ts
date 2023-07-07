import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CoffeeService } from './coffee.service';
import { PaginationParamsDto } from './dtos/pagination-params.dto';
import { OneRequestPerSessionInterceptor } from '../interceptors/one-request-per-session.interceptor';
import { FastifyRequest } from 'fastify';

@Controller('coffees')
@UseGuards(AuthGuard)
export class CoffeeController {
  constructor(private coffeeService: CoffeeService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getCoffeeFeed(
    @Req() req: FastifyRequest,
    @Query() { offset, limit }: PaginationParamsDto
  ) {
    return this.coffeeService.getCoffeeFeed(req.cookies.sid, offset, limit);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  @UseInterceptors(OneRequestPerSessionInterceptor)
  async addCoffee(@Req() req: FastifyRequest) {
    return this.coffeeService.addCoffee(req.cookies.sid);
  }
}
