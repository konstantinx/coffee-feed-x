import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Coffee, RandomApiCoffee } from './coffee.types';
import { toCoffee } from './utils';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../config';

@Injectable()
export class RandomCoffeeService {
  private readonly randomCoffeeUrl: string;
  private readonly randomCoffeeImageUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    const appConfig = this.configService.get<AppConfig>('app');

    this.randomCoffeeUrl = appConfig.randomCoffeeUrl;
    this.randomCoffeeImageUrl = appConfig.randomCoffeeImageUrl;
  }

  async getRandomCoffee(): Promise<Coffee> {
    const { data }: { data: RandomApiCoffee } = await firstValueFrom(
      this.httpService.get(this.randomCoffeeUrl)
    );

    return toCoffee(data);
  }

  async getRandomCoffeeImage(): Promise<string> {
    const { data }: { data: { file: string } } = await firstValueFrom(
      this.httpService.get(this.randomCoffeeImageUrl)
    );

    return data.file;
  }
}
