import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.apiService.getProductById(productId).subscribe(
        (data: Product) => {
          this.product = data; 
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }
  
  
  onDeleteProduct(): void {
    const confirmDelete = confirm('Сигурни ли сте, че искате да изтриете този продукт?');
    if (confirmDelete) {
      this.apiService.deleteProduct(this.product._id).subscribe(
        () => {
          alert('Продуктът е успешно изтрит!');
          this.router.navigate(['/catalog']); // Пренасочва към списъка с продукти
        },
        (error) => {
          console.error('Грешка при изтриването:', error);
          alert('Възникна грешка при изтриването на продукта.');
        }
      );
    }
  }
  
}
