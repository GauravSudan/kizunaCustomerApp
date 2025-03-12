import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Store data in sessionStorage
  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // Retrieve data from sessionStorage
  getItem(key: string): any {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Remove data from sessionStorage
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Clear all data in sessionStorage
  clear(): void {
    sessionStorage.clear();
  }
}
