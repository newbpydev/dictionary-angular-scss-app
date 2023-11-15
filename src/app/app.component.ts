import { Subscription } from 'rxjs';

import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  signal,
  SimpleChanges,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DefinitionCardComponent } from './components/card/definition-card/definition-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchbarComponent } from './components/forms/searchbar/searchbar.component';
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
    DefinitionCardComponent,
    FooterComponent,
  ],
  // templateUrl: './app.component.html',
  template: /*html*/ `
    <main class="main" [ngClass]="[isDark ? 'dark' : '', 'monkey']">
      <app-main-nav />

      <app-searchbar />

      <app-word-display />

      <app-definition-card />

      <app-footer />

      <router-outlet></router-outlet>
    </main>
  `,
  // styleUrl: './app.component.scss',
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
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  isDark = false;
  private subscription: Subscription;
  // private isBrowser: boolean;

  constructor(
    private sharedService: SharedService,
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.subscription = this.sharedService.isDark$.subscribe(
      (isDark) => (this.isDark = isDark)
    );
  }

  ngOnInit(): void {
    // this.updateBodyClass();
    console.log('on init');

    if (isPlatformBrowser(this.platformId)) {
      const isDark = this.storageService.getItem('isDark');
      console.log('isDark?????', isDark);

      this.sharedService.setIsDark(isDark);
      this.subscription = this.sharedService.isDark$.subscribe(
        (state) => (this.isDark = state)
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('in th view init');
    // const test = this.storageService.getItem('isDark');
    // console.log(test);
    // if (test) {
    //   console.log('it has something', test);
    // } else {
    //   console.log('I will need to add it');
    //   this.storageService.setItem('isDark', false);
    // }
  }
}
