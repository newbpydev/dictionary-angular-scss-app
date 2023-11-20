import { Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SharedService } from '../../../shared.service';
import { SvgIconComponent } from '../../ui/icons/svg-icon/svg-icon.component';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SvgIconComponent],
  template: `
    <section class="container searchbar-wrapper">
      <form [formGroup]="searchForm" (ngSubmit)="onSubmit()">
        <input
          type="text"
          placeholder="Keyboard"
          class="searchbar-input"
          [ngClass]="isDark ? 'dark' : ''"
          formControlName="searchInput"
        />
      </form>
      <app-svg-icon
        icon="search"
        height="15"
        width="15"
        class="searchbar-icon"
      />
    </section>
  `,
  styles: `
  @import './utilities/variables';
  @import './utilities/mixins';

  .searchbar {
    &-wrapper {
      position: relative;
      margin-bottom: 2.8rem;

      @include media-query(tablet) {
        margin-bottom: 5rem;
      }

      @include media-query(desktop) {
        margin-bottom: 4.5rem;
      }

    }

    &-input {
      background-color: $color-light;
      width: 100%;
      padding: 1.4rem 4.4rem 1.4rem 2.4rem;
      border-radius: 1.6rem;
      font-size: 1.6rem;
      font-weight: 700;
      border: 1px solid $color-light;
      caret-color: $color-purple;

      /* &:focus {
        border: 1px solid $color-purple;
      } */

      @include media-query(tablet) {
        font-size: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
      }

      &.dark {
        border: 1px solid $color-dark-gray;
        background-color: $color-dark-gray;
      }

      &:focus {
        border: 1px solid $color-purple;
      }
    }

    &-icon {
      position: absolute;
      top: 50%;
      right: 2.445rem;
      transform: translateY(-50%);


    }
  }
  `,
})
export class SearchbarComponent implements OnInit, OnDestroy {
  searchForm = new FormGroup<{ searchInput: FormControl<string | null> }>({
    searchInput: new FormControl('', Validators.required),
  });
  isDark = false;

  private isDarkSubscription: Subscription;

  constructor(private sharedService: SharedService) {
    this.isDarkSubscription = this.sharedService.isDark$.subscribe(
      (isDark) => (this.isDark = isDark)
    );
  }

  ngOnInit() {
    // this.sharedService.isDark$.subscribe((isDark) => (this.isDark = isDark));
  }

  ngOnDestroy(): void {
    this.isDarkSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.searchForm.status === 'VALID') {
      console.log('submitted', this.searchForm.value.searchInput);
    }
  }
}
