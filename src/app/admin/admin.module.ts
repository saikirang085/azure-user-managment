import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FeedsComponent } from './feeds/feeds.component';
import { AdminService } from '../shared/_services/admin.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  providers: [AdminService],
  declarations: [DashboardComponent, UsersComponent, HeaderComponent, FeedsComponent]
})
export class AdminModule { }
