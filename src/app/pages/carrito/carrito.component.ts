import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { CarritoDTO } from 'src/app/services/carrito.dto';
import { ProductoService, Producto } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Router } from '@angular/router';

// Interfaz que combina datos del carrito y del producto correspondiente
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
      this.router.navigate(['/login']); // Si no hay sesión, redirige al login
      return;
    }

    // Obtiene el usuario por su email y carga los productos del carrito
    this.usuarioService.obtenerPorEmail(email).subscribe(usuario => {
      this.carritoService.obtenerCarrito(usuario.id!).subscribe(carritoItems => {
        this.items = [];

        // Por cada ítem en el carrito, se busca el producto asociado
        carritoItems.forEach(c => {
          this.productoService.obtenerPorId(c.productoId).subscribe(p => {
            this.items.push({ carrito: c, producto: p });
          });
        });
      });
    });
  }

  // Elimina un ítem del carrito por su ID
  eliminar(id: number): void {
    this.carritoService.eliminarDelCarrito(id).subscribe(() => {
      this.items = this.items.filter(i => i.carrito.id !== id); // Actualiza la lista local
    });
  }

  // Abre la pasarela de pago y calcula el total a pagar
  abrirPasarela(): void {
    this.totalAPagar = this.items.reduce((total, item) =>
      total + item.producto.precio * item.carrito.cantidad, 0
    );
    this.mostrarPasarela = true;
    this.metodoPago = 'tarjeta';
    this.pagoExitoso = false;
  }

  // Cierra la pasarela y reinicia estados de pago
  cerrarPasarela(): void {
    this.mostrarPasarela = false;
    this.procesando = false;
  }

  // Cambia el método de pago seleccionado
  seleccionarMetodo(metodo: 'tarjeta' | 'paypal'): void {
    this.metodoPago = metodo;
  }

  // Simula el procesamiento del pago con un retraso artificial
  confirmarPagoSimulado(): void {
    this.procesando = true;

    // Simula espera de 2 segundos para "procesar"
    setTimeout(() => {
      this.procesando = false;
      this.pagoExitoso = true;

      // Espera un poco antes de confirmar el pedido
      setTimeout(() => {
        this.finalizarPedido();
      }, 1800);
    }, 2000);
  }

  // Finaliza el pedido confirmándolo en el backend y limpiando el carrito
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

          // El mensaje de éxito se borra después de 4 segundos
          setTimeout(() => {
            this.mensajeExito = null;
          }, 4000);
        },
        error: err => {
          alert('Error al confirmar pedido: ' + (err.error || 'Desconocido'));
        }
      });
    });
  }
}
