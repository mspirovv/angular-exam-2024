import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants';
import { ErrorMsgComponent } from '../review-form/error-msg/error-msg.component';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';




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
    this.userService.login(email,password).subscribe(() => {
      this.router.navigate(['/'])
    }
  );
  }
}
