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
  mensajeExito: string | null = null;
  mostrarPasarela = false;
  totalAPagar = 0;
  metodoPago: 'tarjeta' | 'paypal' = 'tarjeta';
  procesando = false;
  pagoExitoso = false;

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

  abrirPasarela(): void {
    this.totalAPagar = this.items.reduce((total, item) =>
      total + item.producto.precio * item.carrito.cantidad, 0
    );
    this.mostrarPasarela = true;
    this.metodoPago = 'tarjeta';
    this.pagoExitoso = false;
  }

  cerrarPasarela(): void {
    this.mostrarPasarela = false;
    this.procesando = false;
  }

  seleccionarMetodo(metodo: 'tarjeta' | 'paypal'): void {
    this.metodoPago = metodo;
  }

  confirmarPagoSimulado(): void {
    this.procesando = true;
    setTimeout(() => {
      this.procesando = false;
      this.pagoExitoso = true;

      setTimeout(() => {
        this.finalizarPedido();
      }, 1800);
    }, 2000);
  }

  finalizarPedido(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioService.obtenerPorEmail(email).subscribe(usuario => {
      this.pedidoService.confirmarPedido(usuario.id!).subscribe({
        next: (mensaje: string) => {
          this.mensajeExito = 'Pago exitoso. ' + mensaje;
          this.items = [];
          this.mostrarPasarela = false;
          
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        },
        error: err => {
          alert('Error al confirmar pedido: ' + (err.error || 'Desconocido'));
        }
      });
    });
  }
}
