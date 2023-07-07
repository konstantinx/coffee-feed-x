import { Coffee } from '../types/coffee';
import { AuthService } from './auth-service';
import { appConfig } from '../configs/app';

const ERROR_MESSAGE = 'The request was not completed successfully';

export class CoffeeService {
  public static async getCoffeeFeed(
    offset = 0,
    limit = appConfig.apiLimit
  ): Promise<Coffee[]> {
    if (offset === 0) {
      await AuthService.login();
    }

    const queryParams = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
    }).toString();

    const response = await fetch(
      `${appConfig.apiUrl}/api/coffees?${queryParams}`,
      { credentials: 'include' }
    );

    if (response.ok) {
      return (await response.json()) as Coffee[];
    }

    throw new Error(ERROR_MESSAGE);
  }

  public static async addCoffee(): Promise<Coffee> {
    const response = await fetch(`${appConfig.apiUrl}/api/coffees`, {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      return (await response.json()) as Coffee;
    }

    throw new Error(ERROR_MESSAGE);
  }

  public static async initialCoffeeFeed(): Promise<Coffee[]> {
    await AuthService.login();
    return CoffeeService.getCoffeeFeed();
  }
}
