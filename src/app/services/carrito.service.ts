import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarritoDTO } from './carrito.dto';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' }) // Servicio inyectable a nivel global
export class CarritoService {
  private apiUrl = `${environment.apiUrl}/api/carrito`;

  // Emisor de eventos para actualizar el contador del carrito
  carritoActualizado$ = new Subject<void>();

  // Emisor de mensajes tipo "toast"
  toastNotificacion$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  obtenerCarrito(usuarioId: number) {
    return this.http.get<CarritoDTO[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  agregarAlCarrito(dto: CarritoDTO) {
    return this.http.post<CarritoDTO>(this.apiUrl, dto).pipe(
      tap(() => {
        this.toastNotificacion$.next('Producto añadido al carrito'); // Notifi al usuario
        this.carritoActualizado$.next(); // Actualiza iconos/contador
      })
    );
  }

  actualizarCarrito(id: number, dto: CarritoDTO) {
    return this.http.put<CarritoDTO>(`${this.apiUrl}/${id}`, dto).pipe(
      tap(() => this.carritoActualizado$.next())
    );
  }

  eliminarDelCarrito(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.carritoActualizado$.next())
    );
  }
}
