import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Payment[]>{
    let URL = "/api/payments";
    return this.http.get<Payment[]>(URL);
  }

  findById(id: number): Observable<Payment>{
    let URL = "/api/payment/" + id;
    return this.http.get<Payment>(URL);
  }

  create(payment: Payment, idClient: number): Observable<Payment> {
    let URL = "/api/payment/client/" + idClient;
    return this.http.post<Payment>(URL, payment);
  }
}
