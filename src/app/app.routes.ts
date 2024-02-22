import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ParentComponent } from './Components/parent/parent.component';
import { MoviesComponent } from './Components/movies/movies.component';
import { MovieDetailsComponent } from './Components/movie-details/movie-details.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { NewProductComponent } from './Components/admin/new-product/new-product.component';
import { AdminComponent } from './Components/admin/admin.component';
import { OrderComponent } from './Components/admin/order/order.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './Guard/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutUsComponent, canActivate: [authGuard] },
  { path: 'contact', component: ContactUsComponent, canActivate: [authGuard] },
  { path: 'products', component: ParentComponent, canActivate: [authGuard] },
  { path: 'productDetails/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'movies', component: MoviesComponent, canActivate: [authGuard] },
  {
    path: 'movieDetails/:id',
    component: MovieDetailsComponent,
    canActivate: [authGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'newProduct',
        component: NewProductComponent,
        canActivate: [authGuard],
      },
      { path: 'order', component: OrderComponent, canActivate: [authGuard] },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
