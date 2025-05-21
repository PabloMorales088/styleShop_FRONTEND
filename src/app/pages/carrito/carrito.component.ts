import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { CarritoDTO } from 'src/app/services/carrito.dto';
import { ProductoService, Producto } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Router } from '@angular/router';

interface CarritoItemExtendido {
  carrito: CarritoDTO;
  producto: Producto;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: CarritoItemExtendido[] = [];

  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioService.obtenerPorEmail(email).subscribe(usuario => {
      this.carritoService.obtenerCarrito(usuario.id!).subscribe(carritoItems => {
        this.items = [];
        carritoItems.forEach(c => {
          this.productoService.obtenerPorId(c.productoId).subscribe(p => {
            this.items.push({ carrito: c, producto: p });
          });
        });
      });
    });
  }

  eliminar(id: number): void {
    this.carritoService.eliminarDelCarrito(id).subscribe(() => {
      this.items = this.items.filter(i => i.carrito.id !== id);
    });
  }

  confirmarPedido(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioService.obtenerPorEmail(email).subscribe(usuario => {
      this.pedidoService.confirmarPedido(usuario.id!).subscribe({
        next: (mensaje: string) => {
          alert(mensaje);
          this.items = [];
        },
        error: err => {
          console.error('Error del backend:', err);
          alert('Error al confirmar pedido: ' + (err.error || 'Error desconocido'));
        }
      });
    });
  }
}
