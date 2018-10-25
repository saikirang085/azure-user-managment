import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../shared/_services/loader.service';
import { LoaderState } from '../../shared/_data-model/loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  show = false;
  private subscription: Subscription;
  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        if(state) {
          this.show = state.show;
        } else {
          this.show = state.show;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
