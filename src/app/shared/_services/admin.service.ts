import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private router: Router
  ) { }

  getAllusers() {
    return this.http.get(`users`)
    .pipe(catchError(this.utilService.handleError)); 
  }
}
