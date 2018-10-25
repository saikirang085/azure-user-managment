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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoaderComponent
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
