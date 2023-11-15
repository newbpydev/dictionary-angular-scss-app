import { Subscription } from 'rxjs';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DefinitionCardComponent } from './components/card/definition-card/definition-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchbarComponent } from './components/forms/searchbar/searchbar.component';
import { DefinitionCardListComponent } from './components/lists/definition-card-list/definition-card-list.component';
import { MainNavComponent } from './components/navigation/main-nav/main-nav.component';
import { WordDisplayComponent } from './components/word-display/word-display.component';
import { SharedService } from './shared.service';
import { StorageService } from './storage.service';

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
    <main class="main" [ngClass]="[isDark ? 'dark' : '', 'monkey']">
      <app-main-nav />

      <app-searchbar />

      <app-word-display />

      <app-definition-card-list />

      <app-footer />

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

      &.dark {
        background-color: $color-black;
        color: $color-white;
      }
    }
  `,
})
/* -------------------------------------------------------------------------- */
/*                                App Component                               */
/* -------------------------------------------------------------------------- */
export class AppComponent implements OnInit, OnDestroy {
  isDark = false;
  private subscription: Subscription;

  /* ------------------------------- Constructor ------------------------------ */
  constructor(
    private sharedService: SharedService,
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.subscription = this.sharedService.isDark$.subscribe(
      (isDark) => (this.isDark = isDark)
    );
  }

  /* --------------------------------- OnInit --------------------------------- */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isDark = this.storageService.getItem('isDark');
      this.sharedService.setIsDark(isDark);
      this.subscription = this.sharedService.isDark$.subscribe(
        (state) => (this.isDark = state)
      );
    }
  }

  /* -------------------------------- OnDestroy ------------------------------- */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
