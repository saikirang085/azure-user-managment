import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AnonymousGuardService } from '../shared/guards/anonymous.guard';

const routes: Routes = [
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AnonymousGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
