import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  product: Product = {} as Product;
  productId: string | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.loadProduct();
    }
  }

  loadProduct(): void {
    this.apiService.getProductById(this.productId!).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  onEditProduct(form: any): void {
    // Вземи данните от формата
    const formValues = form.value;
  
    // Създай обновен продукт с данни от формата
    const updatedProduct: Product = {
      _id: this.product._id,  // Може да го задържиш от текущия продукт
      productName: formValues.productName,  // Вземи стойността от формата
      description: formValues.description,
      productCategory: formValues.productCategory,
      productImage: formValues.productImage,
      userId: this.product.userId,  // Може да бъде същото, ако не го променяш
      created_at: this.product.created_at,
      updatedAt: new Date().toISOString(),  // Обновената дата
      __v: this.product.__v,
      subscribers: this.product.subscribers || [],  // Ако не са дефинирани
      reviews: this.product.reviews || []  // Ако не са дефинирани
    };
    console.log(formValues)
  
    console.log('Updated product being sent:', updatedProduct);
  
    // Изпрати обновените данни на сървъра
    this.apiService.editProduct(this.product._id, updatedProduct).subscribe(
      (updatedProduct) => {
        console.log('Product updated successfully:', updatedProduct);
        this.product = updatedProduct;  // Обнови продукта в компонента
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error updating product', error);
      }
    );
  }

  cancelEdit(): void {
    this.router.navigate(['/catalog']); // Navigate to products list
  }
}