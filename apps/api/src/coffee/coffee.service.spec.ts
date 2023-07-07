import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeService } from './coffee.service';
import { CacheService } from './cache/cache.service';
import { RandomCoffeeService } from './random-coffee.service';
import { HttpService } from '@nestjs/axios';

describe('CoffeeService', () => {
  let service: CoffeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeService, CacheService, RandomCoffeeService, HttpService],
    }).compile();

    service = module.get<CoffeeService>(CoffeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
