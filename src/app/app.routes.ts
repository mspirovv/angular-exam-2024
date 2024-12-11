import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page-404/page-404.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'catalog/:id', component: ProductDetailsComponent, },
    { path: 'edit-product/:id', component: EditProductComponent,  },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, }, 
    { path: 'error', component: ErrorMsgComponent },
    { path: 'add-product', component: AddProductComponent, }, 
    { path: 'search', component: SearchComponent },
    { path: '**', component: Page404Component }
  ];
  