import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';



@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink,ElapsedTimePipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  currentUserId: string | null = null; 
  isCreator: boolean = false; 
  isLoggedIn: boolean = false
  

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserService
  ) {}

  
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getCurrentUserId(); 
    if (productId) {
      this.getCurrentUserId(); 

      this.apiService.getProductById(productId).subscribe(
        (data: Product) => {
          this.product = data;
          this.isCreator = this.product.userId._id === this.currentUserId; 
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }

  toggleLike() {
    if (!this.currentUserId) {
      console.log("Потребителят не е логнат!");
      return;
    }
  
    const body = {
      productId: this.product._id,
      userId: this.currentUserId
    };
  
    if (this.product.likesCount.includes(this.currentUserId)) {
   
      this.apiService.removeLike(body).subscribe((response) => {
        this.product.likesCount = response.likesCount;
      }, (error) => {
        console.error('Error removing like:', error);
      });
    } else {
  
      this.apiService.addLike(body).subscribe((response) => {
        this.product.likesCount = response.likesCount;
      }, (error) => {
        console.error('Error adding like:', error);
      });
    }
  }
  
  
  
  getCurrentUserId(): void {
    this.userService.getCurrentUser().subscribe(
      (user) => { 
        if (user) {
          this.currentUserId = user._id; 
          this.isLoggedIn = true;
    
        }
      },
      (error) => {
        console.error('Error fetching current user:', error);
        this.isLoggedIn = false;
      }
    );
  }
  
  onDeleteProduct(): void {
    const confirmDelete = confirm('Сигурни ли сте, че искате да изтриете този продукт?');
    if (confirmDelete) {
      this.apiService.deleteProduct(this.product._id).subscribe(
        () => {
          alert('Продуктът е успешно изтрит!');
          this.router.navigate(['/catalog']);
        },
        (error) => {
          console.error('Грешка при изтриването:', error);
          alert('Възникна грешка при изтриването на продукта.');
        }
      );
    }
  }
}