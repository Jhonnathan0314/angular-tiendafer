import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientBill } from 'src/app/models/client-bill.model';

@Injectable({
  providedIn: 'root'
})
export class ClientBillService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ClientBill[]>{
    let URL = "/api/clientbills";
    return this.http.get<ClientBill[]>(URL);
  }

  findById(id: number): Observable<ClientBill>{
    let URL = "/api/clientbill/" + id;
    return this.http.get<ClientBill>(URL);
  }

  findByClient(idClient: number): Observable<ClientBill>{
    let URL = "/api/clientbills/client/" + idClient;
    return this.http.get<ClientBill>(URL);
  }

  create(clientBill: ClientBill, idClient: number): Observable<ClientBill> {
    let URL = "/api/clientbill/client/" + idClient;
    return this.http.post<ClientBill>(URL, clientBill);
  }

  addClient(idClientBill: number, idClient: number): Observable<ClientBill> {
    let URL = "/api/clientbill/" + idClientBill + "/client/" + idClient;
    return this.http.put<ClientBill>(URL, {});
  }

  deleteById(id: number): Observable<any>{
    let URL = "/api/clientbill/" + id;
    return this.http.delete<any>(URL);
  }
}
