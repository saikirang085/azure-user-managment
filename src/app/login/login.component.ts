import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../shared/_services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoaderService } from '../shared/_services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService,
    private validationService: ValidationService
  ) { }


  getErrorMessage(control) {
    return this.loginForm.controls[control].hasError('required') ? `${control} required` :
    this.loginForm.controls[control].hasError('pattern') ? `Please enter a valid ${control}` : '';
  }

  login() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        if(res.error == 0) {
          this.router.navigate(['/user/dashboard']);
        }
      }, err => {
        this.errorMsg = err && err.message ? err.message : 'Error while login';
      })
    }
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.validationService.email_regexPattern)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.validationService.password_regexPattern)]),
    })
  }

  ngOnInit() {
    this.initForm();
  }

}
