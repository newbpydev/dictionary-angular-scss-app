// import { DictionaryResult } from './../../types/shared';
import { Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import {
  Component,
  DoCheck,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { NotFoundComponent } from '../../components/error/not-found/not-found.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DefinitionCardListComponent } from '../../components/lists/definition-card-list/definition-card-list.component';
import { WordDisplayComponent } from '../../components/word-display/word-display.component';
import { SharedService } from '../../shared.service';
import { DictionaryError, DictionaryResult } from '../../types/shared';

@Component({
  selector: 'app-definition-section',
  standalone: true,
  imports: [
    CommonModule,
    WordDisplayComponent,
    DefinitionCardListComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  template: `
    <ng-container>
      @if (isDictionaryResult(searchResults)) {
      <app-word-display
        [keyword]="searchResults[0].word"
        [phonetic]="searchResults[0].phonetic"
      />
      <app-definition-card-list [meanings]="searchResults[0].meanings" />
      <app-footer [sourceLink]="searchResults[0].sourceUrls[0]" />
      } @else if (isDictionaryError(searchResults)) {
      <app-not-found [error]="searchResults" />
      }
    </ng-container>
  `,
  styles: ``,
})
export class DefinitionSectionComponent implements OnInit, OnDestroy {
  searchResults: DictionaryError | DictionaryResult[] = [];
  sharedService = inject(SharedService);
  @Input() keyword: string = '';

  private searchResultsSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.searchResultsSubscription =
      this.sharedService.dictionaryResults$.subscribe(
        (results) => (this.searchResults = results)
      );
  }

  ngOnDestroy(): void {
    this.searchResultsSubscription?.unsubscribe();
  }

  isDictionaryResult(value: unknown): value is DictionaryResult[] {
    const result = value as DictionaryResult[];
    return Boolean(result.length) && typeof result[0]?.word === 'string';
  }

  isDictionaryError(value: unknown): value is DictionaryError {
    const result = value as DictionaryError;
    return Boolean(result) && typeof result.message === 'string';
  }
}
