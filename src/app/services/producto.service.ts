// src/app/services/producto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  listarTodos() {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  listarNovedades() {
    return this.http.get<Producto[]>(`${this.apiUrl}?categoriaId=1`);
  }

  obtenerPorId(id: number) {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  filtrarPorCategoria(categoriaId: number) {
    return this.http.get<Producto[]>(`${this.apiUrl}?categoriaId=${categoriaId}`);
  }
}
