import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  setStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getStorageValue(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}


