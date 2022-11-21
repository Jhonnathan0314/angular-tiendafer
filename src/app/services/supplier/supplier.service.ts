import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Supplier[]>{
    let URL = "/api/suppliers";
    return this.http.get<Supplier[]>(URL);
  }

  findById(id: number): Observable<Supplier>{
    let URL = "/api/supplier/" + id;
    return this.http.get<Supplier>(URL);
  }

  create(supplier: Supplier): Observable<Supplier> {
    let URL = "/api/supplier";
    return this.http.post<Supplier>(URL, supplier);
  }

  update(supplier: Supplier, id: number): Observable<Supplier> {
    let URL = "/api/supplier/" + id;
    return this.http.put<Supplier>(URL, supplier);
  }

  deleteById(id: number): Observable<any>{
    let URL = "/api/supplier/" + id;
    return this.http.delete<any>(URL);
  }
}
