import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../shared/_services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  errorMsg: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private validationService: ValidationService
  ) {

   }

  getErrorMessage(control) {
    return this.forgotPasswordForm.controls[control].touched && this.forgotPasswordForm.controls[control].hasError('required') ? `${control} required` :
    this.forgotPasswordForm.controls[control].touched && this.forgotPasswordForm.controls[control].hasError('pattern') ? `Please enter a valid ${control}` : '';
  }

  forgotPassword() {
    if(this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe((res: any) => {
        if(res.error == 0) {
          this.router.navigate(['/login']);
        } else {
          this.errorMsg = res && res.message ? res.message : 'Error while forgot password';  
        }
      }, err => {
        this.errorMsg = err && err.message ? err.message : 'Error while forgot password';
      })
    }
  }

  initForm() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.validationService.email_regexPattern)])
    })
  }

  ngOnInit() {
    this.initForm();
  }

}
