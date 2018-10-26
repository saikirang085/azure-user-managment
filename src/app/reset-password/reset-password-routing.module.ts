import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';
import { AnonymousGuardService } from '../shared/guards/anonymous.guard';

const routes: Routes = [
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AnonymousGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
