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
  isCategoriaEspecial = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const categoriaId = +id;

        this.isCategoriaEspecial = categoriaId === 1;

        this.categoriaService.obtenerPorId(categoriaId).subscribe(cat => {
          this.categoriaSeleccionada = cat;
        });

        this.productoService.filtrarPorCategoria(categoriaId).subscribe(productos => {
          this.productos = productos;
        });
      }
    });
  }

  verDetalle(id: number): void {
    this.router.navigate(['/productos', id]);
  }

  agregarAlCarrito(productoId: number): void {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    this.usuarioService.obtenerPorEmail(email).subscribe(usuario => {
      this.carritoService.agregarAlCarrito({
        usuarioId: usuario.id!,
        productoId,
        cantidad: 1,
        talla: 'M'
      }).subscribe({
        next: () => this.mensaje = '🛒 Producto añadido al carrito',
        error: () => this.mensaje = '❌ Error al añadir al carrito'
      });
    });
  }
}
