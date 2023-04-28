import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './views/product/products/products.component';
import { AddProductComponent } from './views/product/add-product/add-product.component';
import { EditProductComponent } from './views/product/edit-product/edit-product.component';
import { LoginComponent } from './views/user/login/login.component';
import { ViewProductComponent } from './views/product/view-product/view-product.component';
import { SignupComponent } from './views/user/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'view-product',
        component: ViewProductComponent,
      },
      {
        path: 'add-product',
        component: AddProductComponent,
      },
      {
        path: 'edit-product/:id',
        component: EditProductComponent,
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
