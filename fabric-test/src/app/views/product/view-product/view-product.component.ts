import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/Models/Products/Product';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent {
  ELEMENT_DATA: Product[] = [];

  displayedColumns: string[] = ['id', 'name', 'items', 'actions'];
  dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);
  constructor(
    private productService: ProductsService,
    public dialog: MatDialog
  ) {}
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  ngOnInit() {
    this.productService.getProducts().subscribe((res) => {
      this.dataSource = new MatTableDataSource<Product>(res);
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  DeleteDialog(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: id },
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.productService.getProducts().subscribe((res) => {
        this.dataSource = new MatTableDataSource<Product>(res);
      });
    });
  }
}
