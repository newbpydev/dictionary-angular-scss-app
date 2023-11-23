import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { DictionaryError, DictionaryResult, FontType } from './types/shared';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  isDark$ = this.isDarkSubject.asObservable();

  private selectedFontSubject = new BehaviorSubject<FontType>('sans serif');
  selectedFont$ = this.selectedFontSubject.asObservable();

  private dictionaryResultsSubject = new BehaviorSubject<
    DictionaryResult[] | DictionaryError
  >([]);
  dictionaryResults$ = this.dictionaryResultsSubject.asObservable();

  // constructor(private storageService: StorageService) {}

  setIsDark(value: boolean) {
    this.isDarkSubject.next(value);
  }

  setSelectedFont(value: FontType) {
    this.selectedFontSubject.next(value);
  }

  setDictionaryResults(value: DictionaryResult[] | DictionaryError) {
    this.dictionaryResultsSubject.next(value);
  }
}
