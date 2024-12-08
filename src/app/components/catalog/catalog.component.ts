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

  products: Product[] = [];      // Продуктите, които ще се показват
  currentPage = 1;               // Текущата страница
  totalPages = 5;                // Общо количество страници, което трябва да се актуализира

  // Функция за зареждане на страница
  loadPage(page: number) {
    if (page < 1 || page > this.totalPages) return;  // Проверка дали страницата е валидна

    this.currentPage = page;

    // Извикване на API-то с пагинация
    this.apiService.getProducts(page, 12).subscribe((data: PaginatedProducts) => {
      this.products = data.products;  // Масив с продукти
      this.totalPages = data.totalPages;  // Общо количество страници
    });
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPage(1);  // Зареждаме първата страница
  }
}
