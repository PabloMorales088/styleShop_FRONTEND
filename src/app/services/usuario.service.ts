import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  registrar(usuario: Usuario): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/auth/registro`, usuario, {
      observe: 'response',
      responseType: 'text' as 'json'
    });
  }

  login(usuario: Usuario): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/auth/login`, usuario, {
      observe: 'response',
      responseType: 'text' as 'json'
    });
  }

  obtenerPorEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/api/usuarios/email/${email}`);
  }
}
