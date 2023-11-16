import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  isDark$ = this.isDarkSubject.asObservable();
  // selectedFont =

  constructor(private storageService: StorageService) {}

  setIsDark(value: boolean) {
    this.isDarkSubject.next(value);
  }
}
