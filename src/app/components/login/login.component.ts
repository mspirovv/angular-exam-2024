import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants';
import {
  setEmailErrorClass,
  setPasswordErrorClass,
} from '../../utils/set.dinamic.class';
import { setButtonAttributes } from '../../utils/buttonStatus';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';
import { ErrorMsgComponent } from '../../core/error-msg/error-msg.component';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,EmailDirective,ErrorMsgComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  domains = DOMAINS;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router, private errorMsgService: ErrorMsgService){
    this.errorMsgService.apiError$.subscribe((err) => {
      this.hasError = !!err;
    });
  }

  login(form:NgForm){
    
    if (form.invalid) {
      console.error('Invalid Login Form!');
      return;
    }

    const {email,password} = form.value;
    
    this.userService.login(email, password).subscribe({
      next: () => {
        this.hasError = false;
        this.errorMsgService.clearError();
        this.router.navigate(['/home']);
        form.reset();
      },
      error: (error: any) => {
        this.hasError = true;
        this.errorMessage = error.message; 
        this.errorMsgService.setError(this.errorMessage); 
      },
    });
  }

  setEmailClass(email: any) {
    return setEmailErrorClass(email);
  }
  
  setPasswordClass(password: any) {
    return setPasswordErrorClass(password);
  }

  setButton(form: any) {
    return setButtonAttributes(form);
  }
  
}


