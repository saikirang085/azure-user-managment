import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../shared/_services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoaderService } from '../shared/_services/loader.service';
import { UtilService } from '../shared/_services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: any;
  isAdmin: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private utilService: UtilService,
    private loaderService: LoaderService,
    private validationService: ValidationService
  ) { }


  getErrorMessage(control) {
    return this.loginForm.controls[control].touched && this.loginForm.controls[control].hasError('required') ? `${control} required` :
    this.loginForm.controls[control].touched && this.loginForm.controls[control].hasError('pattern') ? `Please enter a valid ${control}` : '';
  }

  login() {
    if(this.loginForm.valid) {
      this.errorMsg = '';
      let loginObj = this.utilService.deepCopy(this.loginForm.value);
      let loginData = this.utilService.deepCopy(this.loginForm.value);
      loginData.role = this.isAdmin ? 'admin' : 'user';
      this.authService.login(loginData).subscribe((res: any) => {
        if(res.data) {
          if(this.isAdmin) {
            this.router.navigate(['/admin/users']);
          } else {
            this.router.navigate(['/admin/users']);
            // this.router.navigate(['/user/user-dashboard']);
          }
        } else {
          this.errorMsg = res && res.message ? res.message : 'Error while login';  
        }
      }, err => {
        this.errorMsg = err && err.message ? err.message : 'Error while login';
      })
    }
  }


  initForm() {
    if(this.authService.getProfile) {
      this.router.navigate(['/admin/users']);
    }
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.validationService.email_regexPattern)]),
      password: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    let urlSchema = location.pathname;
    if(urlSchema && urlSchema.indexOf('/admin') > -1) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.initForm();
  }

}
