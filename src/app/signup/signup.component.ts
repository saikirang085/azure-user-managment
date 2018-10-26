import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ValidationService } from '../shared/_services/validation.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtilService } from '../shared/_services/util.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  errorMsg: any;
  errorUpload: boolean;
  fileName: any;
  @ViewChild('uploadLogoFile') uploadLogoFile: any;
  imageUrl: SafeResourceUrl;
  imageFile: any;
  passwordMismatch: boolean;
  constructor(
    private router: Router,
    private authService: AuthService,
    private utilService: UtilService,
    private sanitizer: DomSanitizer,
    private validationService: ValidationService
  ) { }


  getErrorMessage(control) {
    return this.signUpForm.controls[control].touched && this.signUpForm.controls[control].hasError('required')  ? `${control} required` :
    this.signUpForm.controls[control].touched && this.signUpForm.controls[control].hasError('pattern') ? `Please enter a valid ${control}` : '';
  }

  signup() {
    if(this.signUpForm.valid && !this.errorUpload) {
      this.authService.signup(this.utilService.encryptValue(this.signUpForm.value, ['password', 'confirmPassword'])).subscribe((res: any) => {
        if(res.error == 0) {
          this.router.navigate(['/user/dashboard']);
        } else {
          this.errorMsg = res && res.message ? res.message : 'Error while signup';  
        }
      }, err => {
        this.errorMsg = err && err.message ? err.message : 'Error while signup';
      })
    }
  }

  fileChanged(event: any, control?, uploadType?) {
    let fileList: FileList = event.target.files;
    this.imageFile = event.target.files[0];
    let image = URL.createObjectURL(event.target.files[0]);
    if (fileList.length > 0 && (this.imageFile.type === 'image/png' || this.imageFile.type === 'image/jpg' || this.imageFile.type === 'image/jpeg')) {
        this.errorUpload = false;
        // this.errorMsg = '';
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(image);
    } else {
      this.errorUpload = true;
      this.imageUrl = null;
      // this.errorMsg = 'Please upload Images only';
      this.resetFileInput('uploadLogoFile');
    }
    let formData: any = new FormData();
    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    } else {
      var file = new Blob([], { type: 'image/jpg' });
      formData.append('image', file, null);
    }
    this.fileName = this.imageFile.name;
    if (!this.errorUpload) {
      this.utilService.uploadFile(formData, this.fileName).subscribe((res) => {
        if (res.error == 0) {
          this[control].get('profilePicture').patchValue(res.responseObj);
          this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(image);
          this.fileName = this.imageFile.name;
          this.resetFileInput('uploadLogoFile');
        }
      }, error => {
        // this.errorMsg = error && error.message ? error.message : 'Error';
        this.resetFileInput('uploadLogoFile');
        setTimeout(() => {
          // this.errorMsg = '';
          this.fileName = '';
        }, 2000);
      })
    }

  }

  resetFileInput(element?) {
    this[element].nativeElement.value = "";
  }

  initForm() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.validationService.email_regexPattern)]),
      role: new FormControl('user', [Validators.required, Validators.pattern(this.validationService.email_regexPattern)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.validationService.password_regexPattern)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(this.validationService.password_regexPattern)]),
    });
    this.signUpForm.controls['confirmPassword'].valueChanges.subscribe(value => {
      if(this.signUpForm.get('confirmPassword').value && this.signUpForm.get('password').value && this.signUpForm.get('confirmPassword').value == this.signUpForm.controls['password'].value) {
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
