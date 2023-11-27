import { BehaviorSubject, Subject } from 'rxjs';

import { Injectable, OnDestroy } from '@angular/core';

import { StorageService } from './storage.service';
import { DictionaryError, DictionaryResult, FontType } from './types/shared';

@Injectable({
  providedIn: 'root',
})
export class SharedService implements OnDestroy {
  /* --------------------------------- isDark --------------------------------- */
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  isDark$ = this.isDarkSubject.asObservable();

  setIsDark(value: boolean) {
    this.isDarkSubject.next(value);
  }

  /* ------------------------------ selectedFont ------------------------------ */
  private selectedFontSubject = new BehaviorSubject<FontType>('sans serif');
  selectedFont$ = this.selectedFontSubject.asObservable();

  setSelectedFont(value: FontType) {
    this.selectedFontSubject.next(value);
  }

  /* ---------------------------- dictionaryResults --------------------------- */
  private dictionaryResultsSubject = new BehaviorSubject<
    DictionaryResult[] | DictionaryError
  >([]);
  dictionaryResults$ = this.dictionaryResultsSubject.asObservable();

  setDictionaryResults(value: DictionaryResult[] | DictionaryError) {
    this.dictionaryResultsSubject.next(value);
  }

  /* -------------------------------- audioUrl -------------------------------- */
  private audioUrlSubject = new BehaviorSubject<string>('');
  audioUrl$ = this.audioUrlSubject.asObservable();

  getAudioUrlObservable() {
    this.dictionaryResults$.subscribe((res) => {
      if (res instanceof Array) {
        const url = res[0].phonetics.find(
          (phon) => phon.sourceUrl?.length
        )?.audio;
        this.audioUrlSubject.next(url ? url : 'wrong');
      }
    });
  }

  /* ------------------------------ ngUnsubscribe ----------------------------- */
  private ngUnsubscribe = new Subject<void>();

  // constructor(private storageService: StorageService) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
