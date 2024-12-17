import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { profileDetails } from '../../types/user';
import { UserService } from '../../services/user.service';
import { Product, ProductResponse } from '../../types/product';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';
import { ErrorMsgComponent } from '../../core/error-msg/error-msg.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,ErrorMsgComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEditMode: boolean = false;
  products: Product[] = [];
  hasError: boolean = false;
  
  currentPage: number = 1;
  pageSize: number = 5; 
  totalProducts: number = 0; 
  totalPages: number = 0; 


  profileDetails: profileDetails = {
    username: '',
    email: '',
  };

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    password: new FormControl('', [Validators.minLength(6)]),
  });

  constructor(private userService: UserService, private apiService: ApiService, private errorMsgService: ErrorMsgService) {}

  ngOnInit(): void {
    // const { username, email } = this.userService.user!;
    // this.profileDetails = { username, email };

    // this.form.setValue({
    //   username,
    //   email,
    //   password: '',
    // });
    this.userService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.hasError = false;
          this.errorMsgService.clearError();
          const { _id, username, email, password } = user!;
          this.profileDetails = { username, email };
          console.log(user)
                console.log('Cookies:', document.cookie);


          this.loadUserProducts();
        }
      },
      error: () => {
        this.hasError = true;
      },
    });


  }


  loadUserProducts(): void {
  
    this.apiService.getUserProducts(this.currentPage, this.pageSize).subscribe(
      (response: ProductResponse) => {
        this.products = response.products;
        this.totalProducts = response.totalProducts || 0;
        this.totalPages = Math.max(Math.ceil(this.totalProducts / this.pageSize), 1);
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUserProducts(); 
    }
  }


  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }


  handleSave(): void {
    if (this.form.invalid) {
      return;
    }

    const { username, email, password } = this.form.value as profileDetails;

    this.userService.updateProfile(username, email, password).subscribe(() => {
      this.profileDetails = { username, email }; 
      this.toggleEditMode();
    });
  }


  onCancel(event: Event): void {
    event.preventDefault();
    this.form.setValue({
      username: this.profileDetails.username,
      email: this.profileDetails.email,
      password: '',
    });
    this.toggleEditMode();
  }
}
