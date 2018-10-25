import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  email_regexPattern: string = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  password_regexPattern: string = '^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,}$';
  constructor() { }
}
