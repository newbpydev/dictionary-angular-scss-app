import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && !!window.localStorage;
  }

  // isLocalStorageAvailable(): boolean {
  //   try {
  //     return typeof window !== 'undefined' && !!window.localStorage;
  //   } catch (e) {
  //     return false;
  //   }
  // }

  setItem(key: string, value: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string): any {
    if (this.isLocalStorageAvailable()) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
  }
}
