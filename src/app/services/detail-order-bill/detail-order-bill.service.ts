import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailOrderBill } from 'src/app/models/detail-order-bill.model';

@Injectable({
  providedIn: 'root'
})
export class DetailOrderBillService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<DetailOrderBill[]>{
    let URL = "/api/detailorderbills";
    return this.http.get<DetailOrderBill[]>(URL);
  }

  findById(id: number): Observable<DetailOrderBill>{
    let URL = "/api/detailorderbill/" + id;
    return this.http.get<DetailOrderBill>(URL);
  }

  create(detailClientBill: DetailOrderBill, idProduct: number, 
    idOrderBill: number): Observable<DetailOrderBill> {

    let URL = "/api/detailorderbill/product/" + idProduct + 
    "/orderbill/" + idOrderBill;

    return this.http.post<DetailOrderBill>(URL, detailClientBill);
  }

  update(detailClientBill: DetailOrderBill, idDetailClientBill: number, 
    idProduct: number, idOrderBill: number): Observable<DetailOrderBill> {

    let URL = "/api/detailorderbill/" + idDetailClientBill + 
    "/product/" + idProduct + "/orderbill/" + idOrderBill;

    return this.http.put<DetailOrderBill>(URL, detailClientBill);
  }

  deleteById(id: number): Observable<any>{
    let URL = "/api/detailorderbill/" + id;
    return this.http.delete<any>(URL);
  }
}
