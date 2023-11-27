import { BehaviorSubject, Subject } from 'rxjs';

import { Injectable, OnDestroy } from '@angular/core';

import { StorageService } from './storage.service';
import { DictionaryError, DictionaryResult, FontType } from './types/shared';

@Injectable({
  providedIn: 'root',
})
export class SharedService implements OnDestroy {
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  isDark$ = this.isDarkSubject.asObservable();

  private selectedFontSubject = new BehaviorSubject<FontType>('sans serif');
  selectedFont$ = this.selectedFontSubject.asObservable();

  private dictionaryResultsSubject = new BehaviorSubject<
    DictionaryResult[] | DictionaryError
  >([]);
  dictionaryResults$ = this.dictionaryResultsSubject.asObservable();

  private audioUrlSubject = new BehaviorSubject<string>('');
  audioUrl$ = this.audioUrlSubject.asObservable();

  private ngUnsubscribe = new Subject<void>();

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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

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
}
