import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AnonymousGuardService } from '../shared/guards/anonymous.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AnonymousGuardService] },
  {path: 'admin/login', component: LoginComponent, canActivate: [AnonymousGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
