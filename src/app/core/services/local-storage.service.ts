import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserData } from '../../auth/login/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  setUserData(userData: UserData): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }

  getUserData(): UserData {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : [];
    }
    return {} as UserData;
  }

  removeLocalStorageData(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('userType');
    }
  }
}
