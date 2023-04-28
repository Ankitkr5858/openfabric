import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/Models/Products/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('Token') == undefined) {
      this.router.navigate(['/login']);
    }
    this.route.params.subscribe((params) => {
      this.productService.getProductById(params['id']).subscribe((res) => {
        this.EditProductForm = new FormGroup({
          name: new FormControl(res.name),
          noOfItems: new FormControl(res.noOfItems),
          description: new FormControl(res.description),
        });
      });
    });
  }
  EditProductForm = new FormGroup({
    name: new FormControl('Name'),
    noOfItems: new FormControl(0),
    description: new FormControl('desc'),
  });
  nameError: string = '';
  itemError: string = '';
  descriptionError: string = '';
  EditProduct() {
    this.nameError = '';
    this.itemError = '';
    this.descriptionError = '';
    let errorCount = 0;
    if (this.EditProductForm.value.name == '') {
      this.nameError = 'Name is required';
      errorCount++;
    }
    if (this.EditProductForm.value.noOfItems! <= 0) {
      this.itemError = 'Item should be greater than 0';
      errorCount++;
    }
    if (this.EditProductForm.value.description == '') {
      this.descriptionError = 'Description is required';
      errorCount++;
    }
    if (errorCount > 0) {
      return;
    }
    this.route.params.subscribe((params) => {
      var product: Product = {
        _id: params['id'],
        name: this.EditProductForm.value.name!,
        noOfItems: this.EditProductForm.value.noOfItems!,
        description: this.EditProductForm.value.description!,
      };

      this.productService.editProduct(product).subscribe((res) => {
        this.router.navigate(['/view-product']);
      });
    });
  }
}
