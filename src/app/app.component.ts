import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { takeUntil} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'userFeedsApp';
  loggedInSubscription: Subscription;
  destroySubscription$: Subject<boolean> = new Subject();
  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }
  ngOnInit() {
    this.loggedInSubscription = this.authService.loggedIn$
    .pipe(takeUntil(this.destroySubscription$))
    .subscribe((state: any) => {
      // if (state) {
      //   this.router.navigate(['/user-dashboard']);
      // } else {
      //   this.router.navigate(['/login']);
      // }
    });
  }
}
