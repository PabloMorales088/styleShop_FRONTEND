import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarritoDTO } from './carrito.dto';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private apiUrl = `${environment.apiUrl}/api/carrito`;

  carritoActualizado$ = new Subject<void>();
  toastNotificacion$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  obtenerCarrito(usuarioId: number) {
    return this.http.get<CarritoDTO[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  agregarAlCarrito(dto: CarritoDTO) {
    return this.http.post<CarritoDTO>(this.apiUrl, dto).pipe(
      tap(() => {
        this.toastNotificacion$.next('Producto añadido al carrito');
        this.carritoActualizado$.next();
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
