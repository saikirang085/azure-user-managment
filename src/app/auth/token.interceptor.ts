// src/app/auth/token.interceptor.ts

import { Injectable, Injector, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/_services/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private inj: Injector
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.inj.get(AuthService);
    const loader = this.inj.get(LoaderService);
    const urlRegex = /^(http|https|ftp|www)/;
    const token = auth.getProfile ? JSON.stringify(auth.getProfile) : '';
    loader.show();
    // if (request.url.indexOf('loginAsUser') > -1 && request.body.token) {
    //   request = request.clone({ headers: request.headers.set('x-Auth-Token', `${request.body.token}`) });
    // }

    // Set token if user logged in
    if (token && request.url.indexOf('api.instagram') == -1 && request.url.indexOf('loginAsUser') == -1) {
      request = request.clone({ headers: request.headers.set('x-Auth-Token', `${token}`) });
    }

    // Set header content-type
    if (!request.headers.has('Content-Type') && request.url.indexOf('login') == -1 && request.url.indexOf('api.instagram') == -1) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    if (request.url.indexOf('login') > -1) {
    //   request = request.clone({ headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded') });
      request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    }

    // Setting the accept header
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    // Append base URL
    if (urlRegex.test(request.url) || (request.url) == "../../../assets/i18n/es.json" || (request.url) == "../../../assets/i18n/en.json") {
      request = request.clone({ url: `${request.url}` });
    } else {
      request = request.clone({ url: `${environment.BASE_API}/${request.url}` });
    }
    return next.handle(request);
  }
}