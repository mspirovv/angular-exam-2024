import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { matchPasswordsValidator } from '../../utils/match-password.validator';
import { setButtonAttributes } from '../../utils/buttonStatus';
import {
  setEmailErrorClass,
  setPasswordErrorClass,
  setRePasswordErrorClass,
  setUsernameErrorClass,
} from '../../utils/set.dinamic.class';
import { UserService } from '../../services/user.service';
import { ErrorMsgComponent } from '../../core/error-msg/error-msg.component';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,ErrorMsgComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

hasError: boolean = false;
constructor(private userService: UserService, private router: Router,   private errorMsgService: ErrorMsgService) {
  this.errorMsgService.apiError$.subscribe((err) => {
    this.hasError = !!err;
  });
}

  form = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(5)]),
    email: new FormControl('',[Validators.required,emailValidator(DOMAINS)]),

  passGroup: new FormGroup({
    password: new FormControl('',[Validators.required,Validators.minLength(5)]),
    rePassword: new FormControl('',[Validators.required]),
  },
{
  validators: [matchPasswordsValidator('password','rePassword')],
})
  });


get passGroup() {
  return this.form.get('passGroup'); 
}
  isFieldTextMissing(controlName: string) {
 return (this.form.get(controlName)?.touched  && 
  this.form.get(controlName)?.errors?.['required']);
 }
get isNotMinLength() {
 return (this.form.get('username')?.touched  && this.form.get('username')?.errors?.['minlength'])
} 
get isEmailNotValid() {
  return (this.form.get('email')?.touched  && this.form.get('email')?.errors?.['emailValidator'])
 } 

 register() {
  if (this.form.invalid) {
    return;
  }
  
  const {
    username,
    email,
    passGroup: {password,rePassword} = {},
  } = this.form.value;

 
  this.userService
  .register(username!, email!, password!, rePassword!)
  .subscribe({
    next: () => {
      this.hasError = false;
      this.errorMsgService.clearError();
      this.router.navigate(['/home']);
      this.form.reset();
    },
    error: () => {
      this.hasError = true;
    },
  });
}

setButton(form: any) {
  return setButtonAttributes(form);
}

setUsernameClass(username: any) {
  return setUsernameErrorClass(username);
}

setEmailClass(email: any) {
  return setEmailErrorClass(email);
}

setPasswordClass(password: any) {
  return setPasswordErrorClass(password);
}

setRePasswordClass(rePassword: any, errors: any) {
  return setRePasswordErrorClass(rePassword, errors);
}
}
