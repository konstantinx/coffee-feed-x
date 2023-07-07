import { appConfig } from '../configs/app';

export class AuthService {
  public static async login() {
    return fetch(`${appConfig.apiUrl}/api/login`, {
      method: 'POST',
      credentials: 'include',
    });
  }
}
