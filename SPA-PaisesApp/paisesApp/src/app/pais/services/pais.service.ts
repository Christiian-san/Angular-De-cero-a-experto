import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  get httpParams(){
    return new HttpParams().set('fields','name,capital,flags,cca3,population')
  }

  buscarPais(termino: string): Observable<Pais[]> {
    const path = `${this.apiUrl}/name/${termino}`;

    return this.http.get<Pais[]>(path,{ params : this.httpParams});
  }

  buscarCapital(termino: string): Observable<Pais[]> {
    const path = `${this.apiUrl}/capital/${termino}`;

    return this.http.get<Pais[]>(path,{ params : this.httpParams});
  }
  getPaisPorAlpha(id: string): Observable<Pais> {
    const path = `${this.apiUrl}/alpha/${id}`;

    return this.http.get<Pais>(path);
  }

  buscarRegion(region:string): Observable<Pais[]>{
    const path = `${this.apiUrl}/region/${region}`;

    return this.http.get<Pais[]>(path,{ params : this.httpParams});
  }

}
