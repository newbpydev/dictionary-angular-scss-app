import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DefinitionCardComponent } from './components/card/definition-card/definition-card.component';
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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;
  }
}
