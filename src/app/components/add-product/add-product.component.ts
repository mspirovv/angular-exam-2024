import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule, NgForm } from '@angular/forms';





@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  constructor(private apiService: ApiService , private router: Router ,) {}

  addProduct(form: NgForm) {
    if (form.invalid) {
      console.error('Form is invalid:', form.value);
      return;
    }
  
    const { productName, description, productCategory, productImage } = form.value;
    console.log('Sending payload:', { productName, description,productCategory,productImage });
  
    this.apiService.createProduct(productName, description,productCategory,productImage).subscribe(
      response => {
        console.log('Product created successfully:', response);
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error creating product:', error);
      }
    );
  }
  

  }


