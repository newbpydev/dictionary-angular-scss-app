import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { SharedService } from './shared.service';
import { DictionaryResult } from './types/shared';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);
  sharedService = inject(SharedService);

  url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  // url = 'http://localhost:3000/definition';

  getDefinition(keyword?: string | null): Observable<DictionaryResult[]> {
    return (
      this.http
        // .get<DictionaryResult[]>('http://localhost:3000/definition')
        .get<DictionaryResult[]>(this.url + keyword)
      // .pipe(catchError(this.handleError))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // client-side or network error occurred
      console.log('An error occurred', error.error.message);
    } else {
      // the backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
      // () => new Error('Something bad happened; please try again later.')
    );
  }
}
