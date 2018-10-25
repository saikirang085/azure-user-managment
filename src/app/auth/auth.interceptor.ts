// src/app/auth/jwt.interceptor.ts
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { LoaderService } from '../shared/_services/loader.service';
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private inj: Injector
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.inj.get(AuthService);
    const loader = this.inj.get(LoaderService);
    loader.show();
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      // loader.hide(); 
      if (event instanceof HttpResponse) {
        loader.hide();
        if (event.url.indexOf('login') > -1 || event.url.indexOf('facebookLogin') > -1 || event.url.indexOf('loginAsUser') > -1) {
          loader.hide();
          if (event.body.error == 0) {
            let token = event.body.responseObj.token;
            delete event.body.responseObj.token;
            let user = event.body.responseObj;
            auth._setSession(token, user);
          }
        }
        // return event;

        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        loader.hide();
        if (err.status === 401) {
          auth.logout(err.status);
          // return event;
          // redirect to the login route
          // or show a modal
        }
      }
    }));
  }
}