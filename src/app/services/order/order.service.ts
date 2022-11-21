import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderBill } from 'src/app/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<OrderBill[]>{
    let URL = "/api/orderbills";
    return this.http.get<OrderBill[]>(URL);
  }

  findById(id: number): Observable<OrderBill>{
    let URL = "/api/orderbill/" + id;
    return this.http.get<OrderBill>(URL);
  }

  findBySupplier(idSupplier: number): Observable<OrderBill>{
    let URL = "/api/orderbills/supplier/" + idSupplier;
    return this.http.get<OrderBill>(URL);
  }

  create(orderBill: OrderBill, idSupplier: number): Observable<OrderBill> {
    let URL = "/api/orderbill/supplier/" + idSupplier;
    return this.http.post<OrderBill>(URL, orderBill);
  }

  deleteById(id: number): Observable<any>{
    let URL = "/api/orderbill/" + id;
    return this.http.delete<any>(URL);
  }
}
