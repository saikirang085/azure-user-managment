import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  email_regexPattern: string = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  password_regexPattern: string = '^(?=.*?[#?!@$%^&*-]).{8,}$';
  constructor() { }

  checkPassword(group: FormGroup) {
    const password = group.controls['password'].value;
    const confirmPassword = group.controls['password_confirm'].value;

    if (password !== confirmPassword) {
      return { matchPassword: true };
    }
  }
}
