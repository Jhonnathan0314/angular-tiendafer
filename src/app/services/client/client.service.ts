import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Client[]>{
    let URL = "/api/clients";
    return this.http.get<Client[]>(URL);
  }

  findById(id: number): Observable<Client>{
    let URL = "/api/client/" + id;
    return this.http.get<Client>(URL);
  }

  create(client: Client): Observable<Client> {
    let URL = "/api/client";
    return this.http.post<Client>(URL, client);
  }

  update(client: Client, id: number): Observable<Client> {
    let URL = "/api/client/" + id;
    return this.http.put<Client>(URL, client);
  }

  deleteById(id: number): Observable<any>{
    let URL = "/api/client/" + id;
    return this.http.delete<any>(URL);
  }
}
