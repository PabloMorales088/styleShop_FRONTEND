import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface PedidoDetalle {
  nombreProducto: string;
  imagen: string;
  precio: number;
  talla: string;
  cantidad: number;
}

export interface Pedido {
  id: number;
  total: number;
  estado: string;
  fecha: string;
  detalles: PedidoDetalle[];
}

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = `${environment.apiUrl}/api/pedidos`;

  constructor(private http: HttpClient) {}

  confirmarPedido(usuarioId: number) {
    return this.http.post(`${this.apiUrl}/confirmar?usuarioId=${usuarioId}`, null, {
      responseType: 'text',
    });
  }

  obtenerPedidosPorUsuario(usuarioId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }
}
