import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
// import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  environment = environment;
  constructor() { }

  deepCopy(oldObj: any) {
    var newObj = oldObj;
    if (oldObj && typeof oldObj === "object") {
      newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
      for (var i in oldObj) {
        newObj[i] = this.deepCopy(oldObj[i]);
      }
    }
    return newObj;
  }
  
  uploadFile(formData, fileName): any {
    // this.loaderService.show();
    // let url = `file/uploadFile`;
    return Observable.create((observer) => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(xhr.response ? JSON.parse(xhr.response) : '');
            observer.complete();
          } else {
            observer.error(xhr.response ? JSON.parse(xhr.response) : '');
          }
        }
        return () => {
          xhr.abort();
        };
      }
      xhr.open("POST", `${environment.BASE_API}/SavePersonImage/${fileName}`, true)
      xhr.send(formData)
    });
  }

  encryptValue(obj, arr) {
    let modifiedObj = obj;
    if(arr && arr.length) {
        arr.forEach(key => {
          modifiedObj[key] = window.btoa(modifiedObj[key]);
        });
        return modifiedObj;
    }
  }

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
