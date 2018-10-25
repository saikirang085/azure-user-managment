import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../shared/_services/validation.service';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UtilService } from '../shared/_services/util.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errorMsg: any;
  passwordMismatch: boolean;
  resetToken: any;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private utilService: UtilService,
    private validationService: ValidationService
  ) { 
    this.resetToken = this.route.snapshot.queryParams['token'] || '';
  }

  getErrorMessage(control) {
    return this.resetPasswordForm.controls[control].touched && this.resetPasswordForm.controls[control].hasError('required') ? `${control} required` :
    this.resetPasswordForm.controls[control].touched && this.resetPasswordForm.controls[control].hasError('pattern') ? `Please enter a valid ${control}` : '';
  }

  resetPassword() {
    if(this.resetPasswordForm.valid) {
      this.authService.resetPassword(this.utilService.encryptValue(this.resetPasswordForm.value, ['password', 'confirmPassword'])).subscribe((res: any) => {
        if(res.error == 0) {
          this.router.navigate(['/login']);
        } else {
          this.errorMsg = res && res.message ? res.message : 'Error while reset password';  
        }
      }, err => {
        this.errorMsg = err && err.message ? err.message : 'Error while reset password';
      })
    }
  }

  initForm() {
    this.resetPasswordForm = new FormGroup({
      resetToken: new FormControl(this.resetToken ? this.resetToken : ''),
      password: new FormControl('', [Validators.required, Validators.pattern(this.validationService.password_regexPattern)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(this.validationService.password_regexPattern)])
    })
    this.resetPasswordForm.controls['confirmPassword'].valueChanges.subscribe(value => {
      if(this.resetPasswordForm.get('confirmPassword').value && this.resetPasswordForm.get('password').value && this.resetPasswordForm.get('confirmPassword').value == this.resetPasswordForm.controls['password'].value) {
        this.passwordMismatch = false;
      } else {
        this.passwordMismatch = true;
      }
    })
  }

  ngOnInit() {
    this.initForm();
  }

}
