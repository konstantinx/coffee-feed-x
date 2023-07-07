import { Test, TestingModule } from '@nestjs/testing';
import { RandomCoffeeService } from './random-coffee.service';

describe('RandomCoffeeService', () => {
  let service: RandomCoffeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomCoffeeService],
    }).compile();

    service = module.get<RandomCoffeeService>(RandomCoffeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
