import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Interfaz que define la estructura del objeto Usuario
export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' }) // Servicio accesible a nivel global
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Envío de datos para registrar un nuevo usuario
  registrar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/registro`, usuario);
  }

  // Solicitud de inicio de sesión: devuelve un token JWT
  login(usuario: Usuario): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, usuario);
  }

  // Obtención de un usuario por su email
  obtenerPorEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/api/usuarios/email/${email}`);
  }
}
