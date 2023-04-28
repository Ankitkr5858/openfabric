import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../Models/Products/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000', {
      headers: {
        Authorization: `bearer ${localStorage.getItem('Token')}`,
      },
    });
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/${id}`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('Token')}`,
      },
    });
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/', product, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('Token')}`,
      },
    });
  }
  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>('http://localhost:3000/', product, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('Token')}`,
      },
    });
  }
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`http://localhost:3000/${id}`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('Token')}`,
      },
    });
  }
}
