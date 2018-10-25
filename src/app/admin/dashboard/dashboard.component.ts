import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  navLinks: any[] = [
    { path: '/admin/users', label: 'Users'},
    { path: '/admin/feeds', label: 'Feeds'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
