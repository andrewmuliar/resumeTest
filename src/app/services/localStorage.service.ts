import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly localStorageName = 'resume';

  constructor() {}

  saveToLocalStorage(record: Record<string, any>) {
    const storage = localStorage.getItem(this.localStorageName);
    if (storage) {
      const parsedStorage = JSON.parse(storage);
      const updated = JSON.stringify({ ...parsedStorage, ...record });
      localStorage.setItem(this.localStorageName, updated);
    } else {
      localStorage.setItem(this.localStorageName, JSON.stringify(record));
    }
  }

  getDataFromStorage() {
    const data = localStorage.getItem(this.localStorageName);
    if (data) {
      return JSON.parse(data);
    }
    return {};
  }

  isStorageEmpty(): boolean {
    const data = this.getDataFromStorage();
    return !Object.keys(data).length;
  }
}
