import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  topProducts: Product[] = []; // Масив за съхранение на топ 5 продуктите

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTopProducts();
  }

  // Извиква метод от сервиза за вземане на топ 5 продукти
  getTopProducts(): void {
    console.log('Изпращам заявка за топ продукти');
    this.apiService.getTopProducts().subscribe(
      (data) => {
        console.log('Топ продукти получени:', data);
        this.topProducts = data;
      },
      (error: string) => {
        console.error('Грешка при извличането на топ продуктите:', error);
      }
    );
  }
  
}