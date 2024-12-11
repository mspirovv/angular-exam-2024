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
  topProducts: Product[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTopProducts();
  }


  getTopProducts(): void {
    this.apiService.getTopProducts().subscribe(
      (data) => {
        this.topProducts = data;
      },
      (error: string) => {
        console.error('Грешка при извличането на топ продуктите:', error);
      }
    );
  }
  
}