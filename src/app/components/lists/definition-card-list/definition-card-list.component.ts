import { Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from '../../../api.service';
import { DictionaryResult, Meaning } from '../../../types/shared';
import { DefinitionCardComponent } from '../../card/definition-card/definition-card.component';

@Component({
  selector: 'app-definition-card-list',
  standalone: true,
  imports: [CommonModule, DefinitionCardComponent, HttpClientModule],
  template: `
    <section class="container">
      @for (meaning of meanings; track $index) {
      <app-definition-card [meaning]="meaning" />
      }
    </section>
  `,
  styles: ``,
})
export class DefinitionCardListComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  meanings: Meaning[] = [];
  apiService = inject(ApiService);

  // constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscription = this.apiService.getDefinition().subscribe({
      next: (data) => {
        console.log(data);
        this.meanings = data[0].meanings;
      },
      complete() {
        console.log('complete');
      },
      error(error) {
        console.error('There was an error', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
