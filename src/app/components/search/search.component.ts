import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';  
  searchResults: Product[] = [];  
  isLoading: boolean = false;  
  currentPage: number = 1;  
  totalPages: number = 1; 

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';  
      this.currentPage = +params['page'] || 1;  

      if (!this.searchQuery.trim()) {
        this.loadCatalogProducts();
      } else {
        this.performSearch();  
      }
    });
  }

  performSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.isLoading = true;

    this.apiService.searchProducts(this.searchQuery, this.currentPage).subscribe(
      response => {
        this.searchResults = response.products;  
        this.totalPages = response.totalPages;  
        this.isLoading = false;

       
        this.updateUrl();
      },
      error => {
        this.isLoading = false;
        console.error('Error during search', error);
      }
    );
  }

  
  loadCatalogProducts(): void {
    this.isLoading = true;

    this.apiService.getProducts(this.currentPage).subscribe(
      response => {
        this.searchResults = response.products;  
        this.totalPages = response.totalPages; 
        this.isLoading = false;


        this.updateUrl();
      },
      error => {
        this.isLoading = false;
        console.error('Error loading catalog products', error);
      }
    );
  }


  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;  

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },  
      queryParamsHandling: 'merge'  
    });

    this.currentPage = page;

    if (this.searchQuery.trim()) {
      this.performSearch();  
    } else {
      this.loadCatalogProducts();  
    }
  }

 
  trackByProductId(index: number, product: any): number {
    return product.id; 
  }

  updateUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        query: this.searchQuery,
        page: this.currentPage
      },
      queryParamsHandling: 'merge'  
    });
  }
}
