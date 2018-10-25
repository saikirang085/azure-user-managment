import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class AnonymousGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn
      .pipe(take(1))
      .pipe(map((isLoggedIn: any) => {
        if (next.queryParams && next.queryParams['val']) {
          this.authService.logout();
          return true;
        } else {
          if (isLoggedIn && isLoggedIn.loggedIn) {
            this.router.navigate(['/landing-page']);
            return false;
          }
        }
        return true;
      }));
  }
}
