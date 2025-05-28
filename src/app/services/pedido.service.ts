import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Modelo de un detalle dentro de un pedido
export interface PedidoDetalle {
  nombreProducto: string;
  imagen: string;
  precio: number;
  talla: string;
  cantidad: number;
}

// Modelo del pedido completo
export interface Pedido {
  id: number;
  total: number;
  estado: string;
  fecha: string;
  detalles: PedidoDetalle[];
}

@Injectable({ providedIn: 'root' }) // Servicio disponible a nivel global
export class PedidoService {
  private apiUrl = `${environment.apiUrl}/api/pedidos`;

  constructor(private http: HttpClient) {}

  // Llama al backend para confirmar el pedido de un usuario
  confirmarPedido(usuarioId: number) {
    return this.http.post(`${this.apiUrl}/confirmar?usuarioId=${usuarioId}`, null, {
      responseType: 'text', // Espera un string como respuesta (mensaje)
    });
  }

  // Recupera todos los pedidos de un usuario
  obtenerPedidosPorUsuario(usuarioId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }
}
