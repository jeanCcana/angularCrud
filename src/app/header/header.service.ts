import { Injectable } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(nomApe: string): Observable<Cliente[]> {
    return this.http.post<Cliente[]>(`${this.urlEndPoint}/buscar`, nomApe)
  }

}
