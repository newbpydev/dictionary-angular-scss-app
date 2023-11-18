import { Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from '../../../api.service';
import { Meaning } from '../../../types/shared';
import { DefinitionCardComponent } from '../../card/definition-card/definition-card.component';

@Component({
  selector: 'app-definition-card-list',
  standalone: true,
  imports: [CommonModule, DefinitionCardComponent, HttpClientModule],
  template: `
    <section class="container">definition-card-list works!</section>
  `,
  styles: ``,
})
export class DefinitionCardListComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  meanings: Meaning[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscription = this.apiService.getDefinition().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('There was an error', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
