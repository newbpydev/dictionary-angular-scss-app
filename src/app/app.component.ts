import { Subscription } from 'rxjs';

import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  effect,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
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
    <main class="main container" [ngClass]="[isDark ? 'dark' : '', 'monkey']">
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
    }
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  isDark = true;
  private subscription: Subscription;

  constructor(private sharedService: SharedService) {
    this.subscription = this.sharedService.isDark$.subscribe(
      (isDark) => (this.isDark = isDark)
    );
  }

  ngOnInit(): void {
    // this.updateBodyClass();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('onChanges', changes);
    // this.updateBodyClass();
  }

  // logger = effect(() => {
  //   localStorage.setItem('darkMode', JSON.stringify(this.isDark));
  // });

  handleThemeToggle(payload: boolean) {
    this.isDark = !this.isDark;
  }

  // updateBodyClass() {
  //   const bodyClass = 'dark';

  //   if (this.isDark) {
  //     this.renderer.addClass(this.document.body, bodyClass);
  //   } else {
  //     this.renderer.removeClass(this.document.body, bodyClass);
  //   }
  // }
}
