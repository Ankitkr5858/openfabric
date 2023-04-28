import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private productService: ProductsService
  ) {}

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
  DeleteItem(id: string) {
    this.productService.deleteProduct(id).subscribe((res) => {
      this.closeDialog();
    });
  }
}
