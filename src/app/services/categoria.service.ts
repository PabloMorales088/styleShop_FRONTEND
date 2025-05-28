import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Modelo de categoría que incluye ID y nombre
export interface Categoria {
  id: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' }) // Servicio disponible a nivel global
export class CategoriaService {
  private API_URL = `${environment.apiUrl}/api/categorias`; // Ruta base para las peticiones

  constructor(private http: HttpClient) {}

  // Obtener lista completa de categorías
  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API_URL);
  }

  // Obtener una categoría específica por su ID
  obtenerPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API_URL}/${id}`);
  }
}
