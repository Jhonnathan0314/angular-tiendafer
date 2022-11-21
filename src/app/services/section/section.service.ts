import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from 'src/app/models/section.model';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Section[]>{
    let URL = "/api/sections";
    return this.http.get<Section[]>(URL);
  }

  findById(id: number): Observable<Section>{
    let URL = "/api/section/" + id;
    return this.http.get<Section>(URL);
  }

  create(section: Section): Observable<Section> {
    let URL = "/api/section";
    return this.http.post<Section>(URL, section);
  }

  update(section: Section, idSection: number): Observable<Section> {
    let URL = "/api/section/" + idSection;
    return this.http.put<Section>(URL, section);
  }

  deleteById(id: number): Observable<any>{
    let URL = "/api/section/" + id;
    return this.http.delete<any>(URL);
  }
}
