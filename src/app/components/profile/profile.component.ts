import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { profileDetails } from '../../types/user';
import { UserService } from '../../services/user.service';
import { Product, ProductResponse } from '../../types/product';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] // Поправено: styleUrl -> styleUrls
})
export class ProfileComponent implements OnInit {

  isEditMode: boolean = false;
  products: Product[] = [];
  
  // Параметри за пагинация
  currentPage: number = 1; // Текуща страница
  pageSize: number = 5; // Продукти на страница
  totalProducts: number = 0; // Общо продукти
  totalPages: number = 0; // Общо страници

  // Детайли на профила
  profileDetails: profileDetails = {
    username: '',
    email: '',
  };

  // Създаване на формуляра
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    password: new FormControl('', [Validators.minLength(6)]),
  });

  constructor(private userService: UserService, private apiService: ApiService) {}

  ngOnInit(): void {
    // Зареждане на информацията за потребителя
    const { username, email } = this.userService.user!;
    this.profileDetails = { username, email };

    this.form.setValue({
      username,
      email,
      password: '',
    });

    console.log('Calling loadUserProducts');
    this.loadUserProducts();
  }

  // Зареждане на продуктите на потребителя
  loadUserProducts(): void {
    console.log('Sending request to fetch products');
    this.apiService.getUserProducts(this.currentPage, this.pageSize).subscribe(
      (response: ProductResponse) => {
        console.log('Loaded products:', response);
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
