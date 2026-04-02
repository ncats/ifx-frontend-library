import { isPlatformBrowser } from '@angular/common';
import {
  computed,
  inject,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  platformId: InjectionToken<NonNullable<unknown>> = inject(
    PLATFORM_ID,
  ) as InjectionToken<NonNullable<unknown>>;
  isBrowser = computed(() => isPlatformBrowser(this.platformId));

  clearLocalStorage() {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  removeItem(key: string) {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  setItem(key: string, data: string) {
    if (this.isBrowser()) {
      localStorage.setItem(key, data);
    }
  }

  fetchFromStorage(key: string): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(key);
    } else return null;
  }
}
