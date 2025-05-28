import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService, Categoria } from 'src/app/services/categoria.service';
import { ProductoService, Producto } from 'src/app/services/producto.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categoriaSeleccionada: Categoria | null = null;
  productos: Producto[] = [];
  mensaje = '';
  isCategoriaEspecial = false; // Cambia el diseño de grilla si es una categoría especial (ej: ID 1)

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    // Escucha cambios en los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const categoriaId = +id;

        // Marca como "especial" si es la categoría con ID 1 (ejemplo de lógica de diseño)
        this.isCategoriaEspecial = categoriaId === 1;

        // Obtiene la categoría seleccionada por ID
        this.categoriaService.obtenerPorId(categoriaId).subscribe(cat => {
          this.categoriaSeleccionada = cat;
        });

        // Filtra los productos por la categoría actual
        this.productoService.filtrarPorCategoria(categoriaId).subscribe(productos => {
          this.productos = productos;
        });
      }
    });
  }

  // Navega al detalle del producto
  verDetalle(id: number): void {
    this.router.navigate(['/productos', id]);
  }

  // Agrega un producto al carrito simulando un "quick add"
  agregarAlCarrito(productoId: number): void {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    this.usuarioService.obtenerPorEmail(email).subscribe(usuario => {
      this.carritoService.agregarAlCarrito({
        usuarioId: usuario.id!,
        productoId,
        cantidad: 1, // Agrega 1 por defecto
        talla: 'M'   // Talla fija por defecto
      }).subscribe({
        next: () => this.mensaje = 'Añadido con éxito',
        error: () => this.mensaje = 'Error al añadir al carrito'
      });
    });
  }
}
