import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../shared/_services/util.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile: any;

  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private router: Router
  ) { 
    // If authenticated, set local profile property
    // and update login status subject.
    // If not authenticated but there are still items
    // in localStorage, log out.
    const user = localStorage.getItem('profile');

    if (user) {
      this.userProfile = JSON.parse(user);
      this.setLoggedIn(true);
    } else if (!user) {
      this.setLoggedIn(false);
      this.logout();
    }

  }

  login(data) {
    return this.http.post(`login`, data)
    .pipe(catchError(this.utilService.handleError)); 
  }

  forgotPassword(data) {
    return this.http.get(`forgotPassword?email=${data.email}`)
    .pipe(catchError(this.utilService.handleError)); 
  }

  resetPassword(data) {
    return this.http.post(`resetPassword`, data)
    .pipe(catchError(this.utilService.handleError)); 
  }

  signup(data) {
    return this.http.post(`addUser`, data)
    .pipe(catchError(this.utilService.handleError)); 
  }

  editUser(data) {
    return this.http.post(`editUser`, data)
    .pipe(catchError(this.utilService.handleError)); 
  }

  getUserData(userId) {
    return this.http.get(`fetchUser?id=${userId}`)
    .pipe(catchError(this.utilService.handleError)); 
  }

  SavePersonImage(data) {
    return this.http.post(`SavePersonImage`, data)
    .pipe(catchError(this.utilService.handleError)); 
  }

  _setSession(profile) {
    // Save session data and update login status subject
    // profile.brandId = 7257;
    localStorage.setItem('profile', JSON.stringify(profile));
    // this.setBrandId = profile.brandId;
    this.userProfile = profile;
    // Update login status in loggedIn$ stream
    this.setLoggedIn(true);
  }


  setLoggedIn(value: any) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  get isLoggedIn() {
    return this.loggedIn$.asObservable();
  }

  logout(status?) {
    localStorage.clear();
    sessionStorage.clear();
    this.userProfile = undefined;
    this.setLoggedIn(false);
    // Return to homepage
    // if (status == 401) {
    //   this.router.navigate(['/landing-page']);
    // }
  }

  get getProfile(): any {
    // Check if current time is past access token's expiration
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) : null;
  }

}
