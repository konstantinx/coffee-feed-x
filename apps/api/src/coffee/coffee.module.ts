import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { RandomCoffeeService } from './random-coffee.service';
import { CoffeeService } from './coffee.service';
import { CacheService } from './cache/cache.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CoffeeController],
  providers: [RandomCoffeeService, CoffeeService, CacheService],
})
export class CoffeeModule {}
