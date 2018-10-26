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

  deleteUser(user) {
    return this.http.post(`userDelete`, user)
    .pipe(catchError(this.utilService.handleError)); 
  }

  getAllFeeds() {
    return this.http.get(`feeds`)
    .pipe(catchError(this.utilService.handleError)); 
  }

  getUserFeed(feedId) {
    return this.http.get(`fetchFeed?id=${feedId}`)
    .pipe(catchError(this.utilService.handleError)); 
  }

  addFeed(feed) {
    return this.http.post(`addFeed`, feed)
    .pipe(catchError(this.utilService.handleError)); 
  }

  editFeed(feed) {
    return this.http.post(`editFeed`, feed)
    .pipe(catchError(this.utilService.handleError)); 
  }

  deleteFeed(user) {
    return this.http.post(`deleteFeed`, user)
    .pipe(catchError(this.utilService.handleError)); 
  }
}
