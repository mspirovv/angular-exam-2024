import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuestGuard } from './guards/guest.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/catalog',pathMatch: 'full'},
    {path: 'catalog', component: CatalogComponent},
    {path: 'catalog/:id', component: ProductDetailsComponent},
    {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},

];
