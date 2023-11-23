import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FooterComponent } from '../../components/footer/footer.component';
import { DefinitionCardListComponent } from '../../components/lists/definition-card-list/definition-card-list.component';
import { WordDisplayComponent } from '../../components/word-display/word-display.component';

@Component({
  selector: 'app-definition-section',
  standalone: true,
  imports: [
    CommonModule,
    WordDisplayComponent,
    DefinitionCardListComponent,
    FooterComponent,
  ],
  template: `
    <ng-container>
      <app-word-display />
      <app-definition-card-list />
      <app-footer />
    </ng-container>
  `,
  styles: ``,
})
export class DefinitionSectionComponent {}
