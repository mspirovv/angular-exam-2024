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
  searchQuery: string = '';  // Стринг за търсене
  searchResults: Product[] = [];  // Продукти, които ще се показват
  isLoading: boolean = false;  // Индикатор за зареждане
  currentPage: number = 1;  // Текуща страница
  totalPages: number = 1;  // Общо страници

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // При отваряне на компонента, вземаме параметрите от URL-а
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';  // Ако няма query параметър, използваме празен стринг
      this.currentPage = +params['page'] || 1;  // Ако няма page параметър, използваме 1

      // Ако няма търсене, зареждаме продуктите от каталога
      if (!this.searchQuery.trim()) {
        this.loadCatalogProducts();
      } else {
        this.performSearch();  // Ако има търсене, извършваме търсенето
      }
    });
  }

  // Метод за извършване на търсене
  performSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.isLoading = true;

    // Извършваме търсенето с query и текущата страница
    this.apiService.searchProducts(this.searchQuery, this.currentPage).subscribe(
      response => {
        this.searchResults = response.products;  // Съхраняваме резултатите
        this.totalPages = response.totalPages;  // Съхраняваме броя на страниците
        this.isLoading = false;

        // Обновяване на URL-то със съответните параметри
        this.updateUrl();
      },
      error => {
        this.isLoading = false;
        console.error('Error during search', error);
      }
    );
  }

  // Метод за зареждане на продуктите от каталога
  loadCatalogProducts(): void {
    this.isLoading = true;

    // Заявка за всички продукти от каталога
    this.apiService.getProducts(this.currentPage).subscribe(
      response => {
        this.searchResults = response.products;  // Продуктите, които се връщат
        this.totalPages = response.totalPages;  // Броя на страниците
        this.isLoading = false;

        // Обновяване на URL-то със съответните параметри
        this.updateUrl();
      },
      error => {
        this.isLoading = false;
        console.error('Error loading catalog products', error);
      }
    );
  }

  // Метод за промяна на страницата
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;  // Проверяваме дали страницата е валидна

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },  // Променяме параметъра за текущата страница
      queryParamsHandling: 'merge'  // Запазваме другите параметри в URL
    });

    this.currentPage = page;

    if (this.searchQuery.trim()) {
      this.performSearch();  // Ако има търсене, извършваме ново търсене
    } else {
      this.loadCatalogProducts();  // Ако няма търсене, зареждаме каталога
    }
  }

  // Функция за проследяване на идентификатора на продукта в ngFor
  trackByProductId(index: number, product: any): number {
    return product.id;  // Или използвай друг уникален идентификатор за продуктите
  }

  // Метод за актуализиране на URL-то с query параметрите
  updateUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        query: this.searchQuery,
        page: this.currentPage
      },
      queryParamsHandling: 'merge'  // Запазваме другите параметри в URL
    });
  }
}
