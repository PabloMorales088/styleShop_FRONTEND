import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService, Producto } from 'src/app/services/producto.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  // Objeto que representa al producto actual
  producto: Producto | null = null;

  // Talla seleccionada por defecto
  tallaSeleccionada: string = 'M';

  // Mensaje informativo para el usuario (éxito o error)
  mensaje = '';

  constructor(
    private route: ActivatedRoute, // Para obtener el ID del producto de la URL
    private productoService: ProductoService, // Para obtener los datos del producto
    private carritoService: CarritoService, // Para añadir al carrito
    private usuarioService: UsuarioService // Para identificar al usuario actual
  ) {}

  ngOnInit(): void {
    // Extraemos el ID del producto desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    // Pedimos al backend los datos del producto
    this.productoService.obtenerPorId(id).subscribe({
      next: data => this.producto = data,
      error: err => console.error('Producto no encontrado', err)
    });
  }

  // Método para añadir el producto actual al carrito
  anadirAlCarrito() {
    const email = localStorage.getItem('userEmail');

    // Si el usuario no ha iniciado sesión o no hay producto cargado
    if (!email || !this.producto) {
      this.mensaje = 'Debes iniciar sesión para añadir al carrito';
      return;
    }

    // Obtenemos los datos del usuario por su email
    this.usuarioService.obtenerPorEmail(email).subscribe({
      next: usuario => {
        // Enviamos la solicitud al backend para agregar el producto al carrito
        this.carritoService.agregarAlCarrito({
          usuarioId: usuario.id!, // usamos el ID del usuario
          productoId: this.producto!.id!, // ID del producto actual
          cantidad: 1, // cantidad fija por defecto
          talla: this.tallaSeleccionada // talla seleccionada por el usuario
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
