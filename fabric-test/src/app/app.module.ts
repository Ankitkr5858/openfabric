import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './views/product/products/products.component';
import { AddProductComponent } from './views/product/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditProductComponent } from './views/product/edit-product/edit-product.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { LoginComponent } from './views/user/login/login.component';
import { ViewProductComponent } from './views/product/view-product/view-product.component';
import { SignupComponent } from './views/user/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ViewProductComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteDialogComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
