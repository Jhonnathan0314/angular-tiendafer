import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Product[]>{
    let URL = "/api/products";
    return this.http.get<Product[]>(URL);
  }

  findById(id: number): Observable<Product>{
    let URL = "/api/product/" + id;
    return this.http.get<Product>(URL);
  }

  create(product: Product, idSection: number): Observable<Product> {
    let URL = "/api/product/section/" + idSection;
    return this.http.post<Product>(URL, product);
  }

  update(product: Product, idProduct: number, idSection: number): Observable<Product> {
    let URL = "/api/product/" + idProduct + "/section/" + idSection;
    return this.http.put<Product>(URL, product);
  }

  deleteById(id: number): Observable<any>{
    let URL = "/api/product/" + id;
    return this.http.delete<any>(URL);
  }
}
