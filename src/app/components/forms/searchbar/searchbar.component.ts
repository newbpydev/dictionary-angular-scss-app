import { EMPTY, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CommonModule, Location } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';

import { ApiService } from '../../../api.service';
import { SharedService } from '../../../shared.service';
import { DictionaryResult } from '../../../types/shared';
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
          placeholder="Search for any word..."
          class="searchbar-input"
          [ngClass]="isDark ? 'dark' : ''"
          formControlName="searchInput"
          autofocus
        />
        <app-svg-icon
          icon="search"
          height="15"
          width="15"
          class="searchbar-icon"
          stroke="#A445ED"
        />
      </form>

      @if (searchForm.status === 'INVALID' && !searchForm.pristine) {

      <p class="searchbar__error">Whoops, can't be empty...</p>
      }
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

      &::placeholder {
        opacity: 0.25;
      }

      @include media-query(tablet) {
        font-size: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
      }

      &.dark {
        border: 1px solid $color-dark-gray;
        background-color: $color-dark-gray;
      }

      /* &:focus {
        border: 1px solid $color-purple;
      } */

      &.ng-dirty.ng-invalid {
      border: 1px solid $color-red;
    }
    }

    &-icon {
      position: absolute;
      top: 50%;
      right: 2.445rem;
      transform: translateY(-50%);
    }

    &__error {
      color: $color-red;
      font-size: 1.6rem;
      position: absolute;
      bottom: -2.4rem;

      @include media-query(tablet) {
        font-size: 2rem;
        bottom: -2.8rem;
      }
    }


  }
  `,
})
/* -------------------------------------------------------------------------- */
/*                             Searchbar Component                            */
/* -------------------------------------------------------------------------- */
export class SearchbarComponent implements OnInit, OnDestroy, AfterViewInit {
  searchForm = new FormGroup<{
    searchInput: FormControl<string | null>;
  }>({
    searchInput: new FormControl('', [Validators.required]),
  });
  @Input() isDark = false;

  private sharedService = inject(SharedService);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  private sanitizer = inject(DomSanitizer);

  private apiServiceSubscription: Subscription = EMPTY.subscribe();

  constructor() {
    const currentPath = this.location.path().split('/');
    if (currentPath.length === 3) {
      const searchInput = decodeURI(currentPath[2]);
      this.searchForm.setValue({ searchInput });
      // this.onSubmit();
    }
  }

  ngOnInit() {
    const currentPathDirty = this.location.path().split('/');
    const currentPath = decodeURI(currentPathDirty[2]);
    // console.log(currentPath[2]);
    // if (currentPath.length === 3) {
    //   this.searchForm.setValue({ searchInput: currentPath[2] });
    //   this.onSubmit();
    // }

    /* ------------------------------- router test ------------------------------ */
    this.router.events.subscribe((e) => {
      const newPath = decodeURI(this.location.path().split('/')[2]);
      // const newPath = this.location.path().split('/')[2];

      if (e instanceof NavigationEnd && newPath !== currentPath) {
        console.log(newPath, decodeURI(currentPath));
        // console.log(newPath !== currentPath[2]);
        this.searchForm.setValue({ searchInput: newPath });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.onSubmit();
        // this.router.onSameUrlNavigation = 'reload';
      }
    });

    // console.log(currentPath[2]);
  }

  ngAfterViewInit(): void {
    // const currentPath = this.location.path().split('/');
    // if (currentPath.length === 3) {
    //   const searchInput = decodeURI(currentPath[2]);
    //   this.searchForm.setValue({ searchInput });
    //   this.onSubmit();
    // }
  }

  ngOnDestroy(): void {
    // this.isDarkSubscription.unsubscribe();
    this.apiServiceSubscription.unsubscribe();
    // this.router
  }

  onSubmit() {
    if (this.searchForm.status === 'VALID') {
      this.apiServiceSubscription = this.apiService
        .getDefinition(this.searchForm.value.searchInput)
        .subscribe({
          next: (value) => {
            const results: DictionaryResult[] = value;
            this.sharedService.setDictionaryResults(results);
          },
          // complete() {
          //   console.log('completed');
          // },
          error: (err) => {
            this.sharedService.setDictionaryResults(err.error);
          },
        });

      this.router.navigate(['search', this.searchForm.value.searchInput]);
    }
  }
}
