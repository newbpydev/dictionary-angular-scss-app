import { Subscription } from 'rxjs';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DoCheck,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ApiService } from './api.service';
import { FooterComponent } from './components/footer/footer.component';
import { SearchbarComponent } from './components/forms/searchbar/searchbar.component';
import { DefinitionCardListComponent } from './components/lists/definition-card-list/definition-card-list.component';
import { MainNavComponent } from './components/navigation/main-nav/main-nav.component';
import { WordDisplayComponent } from './components/word-display/word-display.component';
import { SharedService } from './shared.service';
import { StorageService } from './storage.service';
import { DictionaryError, DictionaryResult, FontType } from './types/shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainNavComponent,
    SearchbarComponent,
    WordDisplayComponent,
    DefinitionCardListComponent,
    FooterComponent,
  ],

  /* -------------------------------------------------------------------------- */
  /*                                  Template                                  */
  /* -------------------------------------------------------------------------- */
  template: /*html*/ `
    <main
      class="main"
      [ngClass]="[
        isDark ? 'dark' : '',
        selectedFont === 'sans serif' ? 'sans-serif' : '',
        selectedFont === 'serif' ? 'serif' : '',
        selectedFont === 'mono' ? 'mono' : ''
      ]"
    >
      <app-main-nav />
      <app-searchbar [isDark]="isDark" />

      <router-outlet></router-outlet>
    </main>
  `,

  /* -------------------------------------------------------------------------- */
  /*                                   Styles                                   */
  /* -------------------------------------------------------------------------- */
  styles: `
    @import './utilities/_variables.scss';

    .main {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 100vh;

      &.dark {
        background-color: $color-black;
        color: $color-white;
      }

      &.sans-serif {
        font-family: $font-inter;
      }

      &.serif {
        font-family: $font-lora;
      }

      &.mono {
        font-family: $font-inconsolata;
      }
    }
  `,
})
/* -------------------------------------------------------------------------- */
/*                                App Component                               */
/* -------------------------------------------------------------------------- */
export class AppComponent implements OnInit, OnDestroy {
  isDark = false;
  selectedFont: FontType = 'sans serif';
  dictionaryResult: DictionaryResult[] | DictionaryError = [];

  private isDarkSubscription: Subscription;
  private selectedFontSubscription: Subscription;
  private dictionaryResultSubscription: Subscription;

  /* ------------------------------- Constructor ------------------------------ */
  constructor(
    private sharedService: SharedService,
    private storageService: StorageService,
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isDarkSubscription = this.sharedService.isDark$.subscribe(
      (isDark) => (this.isDark = isDark)
    );

    this.selectedFontSubscription = this.sharedService.selectedFont$.subscribe(
      (selectedFont) => (this.selectedFont = selectedFont)
    );

    this.dictionaryResultSubscription =
      this.sharedService.dictionaryResults$.subscribe(
        (results) => (this.dictionaryResult = results)
      );
  }

  /* --------------------------------- OnInit --------------------------------- */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isDark = this.storageService.getItem('isDark');
      const selectedFont = this.storageService.getItem('selectedFont');

      this.sharedService.setIsDark(isDark);
      this.sharedService.setSelectedFont(selectedFont);

      this.isDarkSubscription = this.sharedService.isDark$.subscribe(
        (state) => (this.isDark = state)
      );
    }

    this.dictionaryResultSubscription =
      this.sharedService.dictionaryResults$.subscribe(
        (results) => (this.dictionaryResult = results)
      );
  }

  // ngDoCheck(): void {
  //   console.log('app:do check');
  //   console.log(this.dictionaryResult);
  //   console.log(this.dictionaryResultSubscription);
  // }

  /* -------------------------------- OnDestroy ------------------------------- */
  ngOnDestroy(): void {
    this.isDarkSubscription.unsubscribe();
    this.selectedFontSubscription.unsubscribe();
    this.dictionaryResultSubscription.unsubscribe();
  }
}
