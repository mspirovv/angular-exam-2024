import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { PaginatedProducts } from '../../types/paginated-products'; // 

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  products: Product[] = [];      
  currentPage = 1;               
  totalPages = 5;                


  loadPage(page: number) {
    if (page < 1 || page > this.totalPages) return; 

    this.currentPage = page;

    
    this.apiService.getProducts(page, 12).subscribe((data: PaginatedProducts) => {
      this.products = data.products;  
      this.totalPages = data.totalPages; 
    });
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPage(1); 
  }
}
