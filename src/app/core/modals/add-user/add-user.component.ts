import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ValidationService } from 'src/app/shared/_services/validation.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UtilService } from 'src/app/shared/_services/util.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  signUpForm: FormGroup;
  errorMsg: any;
  errorUpload: boolean;
  fileName: any;
  @ViewChild('uploadLogoFile') uploadLogoFile: any;
  imageUrl: SafeResourceUrl;
  imageFile: any;
  passwordMismatch: boolean;
  profileData: any;
  imageObj: string | ArrayBuffer;
  constructor(
    private router: Router,
    private authService: AuthService,
    private utilService: UtilService,
    private sanitizer: DomSanitizer,
    private validationService: ValidationService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  getErrorMessage(control) {
    return this.signUpForm.controls[control].touched && this.signUpForm.controls[control].hasError('required')  ? `${control} required` :
    this.signUpForm.controls[control].touched && this.signUpForm.controls[control].hasError('pattern') ? `Please enter a valid ${control}` : '';
  }

  signup() {
    this.errorMsg = '';
    if(this.signUpForm.valid && !this.errorUpload) {
      this.authService.signup(this.signUpForm.value).subscribe((res: any) => {
        if(res) {
          this.dialogRef.close(true);
        } else {
          this.errorMsg = res && res.message ? res.message : 'Error while adding User';  
        }
      }, err => {
        this.errorMsg = err && err.message ? err.message : 'Error while adding User';
      })
    }
  }

  editUser() {
    this.errorMsg = '';
    let userData = this.profileData;
    userData.firstName = this.signUpForm.value.firstName ? this.signUpForm.value.firstName : userData.firstName;
    userData.lastName = this.signUpForm.value.lastName ? this.signUpForm.value.lastName : userData.lastName;
    userData.email = this.signUpForm.value.email ? this.signUpForm.value.email : userData.email;
    userData.image = this.signUpForm.value.image ? this.signUpForm.value.image : userData.image;
    if(this.signUpForm.valid && !this.errorUpload) {
      this.authService.editUser(userData).subscribe((res: any) => {
        if(res) {
          this.dialogRef.close(true);
        } else {
          this.errorMsg = res && res.message ? res.message : 'Error while updating User';  
        }
      }, err => {
        this.errorMsg = err && err.message ? err.message : 'Error while updating User';
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
      var myReader:FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.imageObj = myReader.result;
        console.log('this.imageObj:::', this.imageObj);
        let imageFile = {
          imagedata: this.imageObj,
          name: this.fileName
        }
        this.authService.SavePersonImage(imageFile).subscribe((res: any) => {
          if (res) {
            this.signUpForm.get('image').setValue(res.message);
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
      myReader.readAsDataURL(this.imageFile);

    }

  }

  resetFileInput(element?) {
    this[element].nativeElement.value = "";
  }

  getUserData() {
    this.authService.getUserData(this.data.userId).subscribe((res: any) => {
      if(res) {
        this.profileData = res;
        this.imageUrl = this.profileData.image;
        this.initForm(this.profileData);
      }
    }, err => {
      console.log('error while getting user:::', err);
    })
  }

  initForm(data?) {
    this.signUpForm = new FormGroup({
      id: new FormControl(data ? data.id : ''),
      firstName: new FormControl(data ? data.firstName : '', [Validators.required]),
      lastName: new FormControl(data ? data.lastName : '', [Validators.required]),
      image: new FormControl(data ? data.image : '', [Validators.required]),
      email: new FormControl({value: data ? data.email : '', disabled: data && data.email ? true : false}, [Validators.required, Validators.pattern(this.validationService.email_regexPattern)]),
    });
  }

  ngOnInit() {
    this.initForm();
    if(this.data.type != 'add') {
      this.getUserData();
    }
  }

}
