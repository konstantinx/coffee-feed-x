import { Injectable, Logger } from '@nestjs/common';
import { CacheService } from './cache/cache.service';
import { RandomCoffeeService } from './random-coffee.service';

@Injectable()
export class CoffeeService {
  private readonly logger = new Logger(CoffeeService.name);

  constructor(
    private cacheService: CacheService,
    private randomCoffeeService: RandomCoffeeService
  ) {}

  async addCoffee(sid: string) {
    const coffee = await this.randomCoffeeService.getRandomCoffee();
    let imageUrl = await this.cacheService.getCoffeeImage(coffee.id);
    if (imageUrl) {
      coffee.imageUrl = imageUrl;
      this.logger.log(
        `The image url from the cache will be used for the coffee object from the random API. Session: ${sid}. Coffee ID: ${coffee.id}. Image URL: ${coffee.imageUrl}`
      );
    } else {
      imageUrl = await this.randomCoffeeService.getRandomCoffeeImage();
      coffee.imageUrl = await this.cacheService.concurrentSetImage(
        coffee.id,
        imageUrl
      );
    }

    await this.cacheService.addToCoffeeFeed(sid, coffee);

    return coffee;
  }

  async getCoffeeFeed(sid: string, offset = 0, limit = 10) {
    const feed = await this.cacheService.getCoffeeFeed(sid, offset, limit);

    if (!feed) {
      const coffee = await this.addCoffee(sid);

      this.logger.log(
        `The coffee list is not in the cache, a new list with a random coffee object will be created and cached. Session: ${sid}`
      );
      return [coffee];
    }

    return feed;
  }
}
