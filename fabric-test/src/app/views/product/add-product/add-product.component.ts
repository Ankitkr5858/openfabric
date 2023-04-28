import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/Products/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  AddProductForm = new FormGroup({
    name: new FormControl('Name'),
    noOfItems: new FormControl(0),
    description: new FormControl('desc'),
  });
  nameError: string = '';
  itemError: string = '';
  descriptionError: string = '';
  AddProduct() {
    this.nameError = '';
    this.itemError = '';
    this.descriptionError = '';
    let errorCount = 0;
    if (this.AddProductForm.value.name == '') {
      this.nameError = 'Name is required';
      errorCount++;
    }
    if (this.AddProductForm.value.noOfItems! <= 0) {
      this.itemError = 'Item should be greater than 0';
      errorCount++;
    }
    if (this.AddProductForm.value.description == '') {
      this.descriptionError = 'Description is required';
      errorCount++;
    }
    if (errorCount > 0) {
      return;
    }
    var product: Product = {
      name: this.AddProductForm.value.name!,
      noOfItems: this.AddProductForm.value.noOfItems!,
      description: this.AddProductForm.value.description!,
    };

    this.productService.addProduct(product).subscribe((res) => {
      this.router.navigate(['/view-product']);
    });
  }
}
