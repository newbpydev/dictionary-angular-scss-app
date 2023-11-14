import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DefinitionCardComponent } from './components/card/definition-card/definition-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchbarComponent } from './components/forms/searchbar/searchbar.component';
import { MainNavComponent } from './components/navigation/main-nav/main-nav.component';
import { WordDisplayComponent } from './components/word-display/word-display.component';

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
    <main class="main container" [ngClass]="isDark ? 'dark' : ''">
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

      & .dark {
        color: $color-white;
        background-color: $color-black;
      }
    }
  `,
})
export class AppComponent implements OnInit {
  isDark = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.updateBodyClass();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
  }

  updateBodyClass() {
    const bodyClass = 'dark';
    if (this.isDark) {
      this.renderer.addClass(this.document.body, bodyClass);
    } else {
      this.renderer.removeClass(this.document.body, bodyClass);
    }
  }
}
