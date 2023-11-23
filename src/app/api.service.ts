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

  constructor() {}

  getDefinition(keyword?: string | null): Observable<DictionaryResult[]> {
    console.log(keyword);
    return this.http
      .get<DictionaryResult[]>('http://localhost:3000/definition')
      .pipe(catchError(this.handleError));
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
    );
  }
}
