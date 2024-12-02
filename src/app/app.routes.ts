import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';

export const routes: Routes = [
    {path: '', redirectTo: '/catalog',pathMatch: 'full'},
    {path: 'catalog', component: CatalogComponent},
    {path: 'catalog/:id', component: ProductDetailsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'error', component: ErrorMsgComponent}

];
