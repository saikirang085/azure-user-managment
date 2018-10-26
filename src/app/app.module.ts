import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LandingModule } from './landing/landing.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TokenInterceptor } from './auth/token.interceptor';
import { LoaderComponent } from './core/loader/loader.component';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { SignupModule } from './signup/signup.module';
import { AnonymousGuardService } from './shared/guards/anonymous.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { UtilService } from './shared/_services/util.service';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { AdminModule } from './admin/admin.module';
import { AddUserComponent } from './core/modals/add-user/add-user.component';
import { ConfirmComponent } from './core/modals/confirm/confirm.component';
import { AddFeedComponent } from './core/modals/add-feed/add-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    AddUserComponent,
    ConfirmComponent,
    AddFeedComponent
  ],
  entryComponents: [
    AddUserComponent,
    ConfirmComponent,
    AddFeedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    LoginModule,
    ForgotPasswordModule,
    SignupModule,
    LandingModule,
    ResetPasswordModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [
    AnonymousGuardService,
    AuthGuard,
    UtilService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
