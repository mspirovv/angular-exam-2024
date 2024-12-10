import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product = {} as Product;
  productId: string | null = null;
  currentUserId: string | null = null;
  errorMessage: string = '';  

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.loadCurrentUser();  

    if (this.productId) {
      this.loadProduct();
    }
  }

  loadCurrentUser(): void {
    this.userService.getProfile().subscribe(
      (user: any) => {
        this.currentUserId = user.id; 
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
  }

  loadProduct(): void {
    this.apiService.getProductById(this.productId!).subscribe(
      (product: Product) => {
        this.product = product;
        
        if (this.product.userId._id !== this.currentUserId) {
          this.errorMessage = 'You are not authorized to edit this product!';
          return;
        }
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  onEditProduct(form: any): void {
    const formValues = form.value;

    const updatedProduct: Product = {
      _id: this.product._id,  
      productName: formValues.productName, 
      description: formValues.description,
      productCategory: formValues.productCategory,
      productImage: formValues.productImage,
      userId: this.product.userId,
      likesCount: this.product.likesCount,  
      created_at: this.product.created_at,
      updatedAt: new Date().toISOString(), 
      __v: this.product.__v,
      subscribers: this.product.subscribers || [],  
      reviews: this.product.reviews || [] 
    };
    console.log(formValues)
  
    console.log('Updated product being sent:', updatedProduct);
  
    this.apiService.editProduct(this.product._id, updatedProduct).subscribe(
      (updatedProduct) => {
        console.log('Product updated successfully:', updatedProduct);
        this.product = updatedProduct;  
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error updating product', error);
      }
    );
  }

  cancelEdit(): void {
    this.router.navigate(['/catalog']);
  }
}
