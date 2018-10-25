import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UsersComponent } from './users/users.component';
import { FeedsComponent } from './feeds/feeds.component';

const routes: Routes = [
  {
      path: 'admin', component: DashboardComponent,
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'users' },
        { path: 'users', pathMatch: 'full', component: UsersComponent },
        { path: 'feeds', pathMatch: 'full', component: FeedsComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
