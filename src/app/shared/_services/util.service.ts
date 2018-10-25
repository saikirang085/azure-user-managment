import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
// import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError({
        error: 1,
        message: 'Unauthorized',
        responseObj: null
      });
    }
    else if (error.status === 404) {
      return throwError({
        error: 1,
        message: 'Not found',
        responseObj: null
      });
    }
    else if (error.status === 500) {
      return throwError(error.error);
    }
    else {
      return throwError(error.error);
    }
  }
}
