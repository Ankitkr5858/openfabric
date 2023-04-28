import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/Models/Products/Product';
import { ProductsService } from 'src/app/services/products.service';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  ELEMENT_DATA: Product[] = [];
  mobileQuery: MediaQueryList;
  
  displayedColumns: string[] = ['id', 'name', 'items', 'actions'];
  dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);

  private _mobileQueryListener: () => void;


  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    if (localStorage.getItem('Token') == undefined) {
      this.router.navigate(['/login']);
    }
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  Logout() {
    localStorage.removeItem('Token');
    this.router.navigate(['/login']);
  }
}
