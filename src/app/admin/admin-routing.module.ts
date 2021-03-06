import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UsersComponent } from './users/users.component';
import { FeedsComponent } from './feeds/feeds.component';

const routes: Routes = [
  {
      path: 'admin', component: DashboardComponent, canActivate: [AuthGuard],
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'users' },
        { path: 'users', pathMatch: 'full', component: UsersComponent, canActivate: [AuthGuard] },
        { path: 'feeds', pathMatch: 'full', component: FeedsComponent, canActivate: [AuthGuard] },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
