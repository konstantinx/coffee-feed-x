import _ from 'lodash';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { Coffee } from '../coffee.types';

// Можно попробовать отвязать от логики coffee и сделать сервис более асбтрактым, позволяя кешировать любые сущности.
// Все что связано с coffee сгуппировать в coffee сервие
@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async concurrentSetImage(coffeeId: number, imageUrl: string) {
    const result = await this.redis.set(
      `coffee:${coffeeId}:image`,
      imageUrl,
      'EX',
      60 * 60 * 24,
      'NX'
    );

    if (result === null) {
      const cachedImageUrl = await this.redis.get(`coffee:${coffeeId}:image`);
      this.logger.warn(
        `The race condition during image url caching has been detected. A link to the image from the cache will be used. Coffee ID: ${coffeeId}. Cached Image URL: ${cachedImageUrl}`
      );

      return cachedImageUrl;
    }

    this.logger.log(
      `Image url cached successfully. Coffee ID: ${coffeeId}. Image URL: ${imageUrl}`
    );
    return imageUrl;
  }

  async getCoffeeImage(coffeeId: number): Promise<string> {
    return this.redis.get(`coffee:${coffeeId}:image`);
  }

  async getCoffeeFeed(
    sid: string,
    offset: number,
    limit: number
  ): Promise<Coffee[] | null> {
    const key = `session:${sid}:coffee:feed`;
    const isExist = await this.redis.exists(key);

    if (!isExist) {
      return null;
    }

    const feed = await this.redis.lrange(key, offset, offset + limit - 1);

    return _.map(feed, JSON.parse);
  }

  async addToCoffeeFeed(sid: string, coffee: Coffee) {
    const jsonCoffee = JSON.stringify(coffee);
    const cacheFeedKey = `session:${sid}:coffee:feed`;

    await this.redis.rpush(cacheFeedKey, jsonCoffee);
    await this.redis.expire(cacheFeedKey, 60 * 60 * 24);
    this.logger.log(
      `Coffee feed item added to cache. Session ID: ${sid}. Coffee: ${jsonCoffee}`
    );
  }
}
