import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Modelo que representa un producto
export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  talla: string;
  stock: number;
  imagen: string;
  categoriaId: number;
}

@Injectable({ providedIn: 'root' }) // Servicio disponible globalmente
export class ProductoService {
  private apiUrl = `${environment.apiUrl}/api/productos`;

  constructor(private http: HttpClient) {}

  // Obtiene todos los productos disponibles
  listarTodos() {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Lista productos de la categoría marcada como "novedades" (ID = 1)
  listarNovedades() {
    return this.http.get<Producto[]>(`${this.apiUrl}?categoriaId=1`);
  }

  // Obtiene los detalles de un producto por su ID
  obtenerPorId(id: number) {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Filtra productos por una categoría específica
  filtrarPorCategoria(categoriaId: number) {
    return this.http.get<Producto[]>(`${this.apiUrl}?categoriaId=${categoriaId}`);
  }
}
