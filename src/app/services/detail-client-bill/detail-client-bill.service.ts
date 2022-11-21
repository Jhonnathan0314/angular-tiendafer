import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailClientBill } from 'src/app/models/detail-client-bill.model';

@Injectable({
  providedIn: 'root'
})
export class DetailClientBillService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<DetailClientBill[]>{
    let URL = "/api/detailclientbills";
    return this.http.get<DetailClientBill[]>(URL);
  }

  findById(id: number): Observable<DetailClientBill>{
    let URL = "/api/detailclientbill/" + id;
    return this.http.get<DetailClientBill>(URL);
  }

  create(detailClientBill: DetailClientBill, idProduct: number, 
    idClientBill: number): Observable<DetailClientBill> {

    let URL = "/api/detailclientbill/product/" + idProduct + 
    "/clientbill/" + idClientBill;

    return this.http.post<DetailClientBill>(URL, detailClientBill);
  }

  update(detailClientBill: DetailClientBill, idDetailClientBill: number, 
    idProduct: number, idClientBill: number): Observable<DetailClientBill> {

    let URL = "/api/detailclientbill/" + idDetailClientBill + 
    "/product/" + idProduct + "/clientbill/" + idClientBill;

    return this.http.put<DetailClientBill>(URL, detailClientBill);
  }

  deleteById(id: number): Observable<any>{
    let URL = "/api/detailclientbill/" + id;
    return this.http.delete<any>(URL);
  }
}
