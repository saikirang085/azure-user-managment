import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ValidationService } from '../shared/_services/validation.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  errorMsg: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private validationService: ValidationService
  ) { }


  getErrorMessage(control) {
    return this.signUpForm.controls[control].hasError('required') ? `${control} required` :
    this.signUpForm.controls[control].hasError('pattern') ? `Please enter a valid ${control}` : '';
  }

  login() {
    if(this.signUpForm.valid) {
      this.authService.login(this.signUpForm.value).subscribe((res: any) => {
        if(res.error == 0) {
          this.router.navigate(['/user/dashboard']);
        }
      }, err => {
        this.errorMsg = err && err.message ? err.message : 'Error while login';
      })
    }
  }

  initForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.validationService.email_regexPattern)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.validationService.password_regexPattern)]),
    })
  }

  ngOnInit() {
    this.initForm();
  }


}
