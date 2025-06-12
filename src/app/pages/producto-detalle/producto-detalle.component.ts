import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService, Producto } from 'src/app/services/producto.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto: Producto | null = null;
  tallaSeleccionada: string = 'M';
  mensaje = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.productoService.obtenerPorId(id).subscribe({
      next: data => this.producto = data,
      error: err => console.error('Producto no encontrado', err)
    });
  }

  anadirAlCarrito() {
    const email = localStorage.getItem('userEmail');

    if (!email) {
      this.mensaje = 'Debes iniciar sesión para añadir al carrito';
      this.router.navigate(['/login']); // Redirección automática al login
      return;
    }

    if (!this.producto) {
      this.mensaje = 'Error: No se puede añadir un producto inexistente';
      return;
    }

    this.usuarioService.obtenerPorEmail(email).subscribe({
      next: usuario => {
        this.carritoService.agregarAlCarrito({
          usuarioId: usuario.id!,
          productoId: this.producto!.id!,
          cantidad: 1,
          talla: this.tallaSeleccionada
        }).subscribe({
          next: () => this.mensaje = '🛒 Producto añadido al carrito',
          error: err => {
            console.error('Error al añadir al carrito', err);
            this.mensaje = '❌ Error al añadir al carrito';
          }
        });
      },
      error: () => {
        this.mensaje = 'No se pudo obtener el usuario';
      }
    });
  }
}
