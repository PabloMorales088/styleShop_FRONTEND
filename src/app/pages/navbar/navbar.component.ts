import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService, Categoria } from 'src/app/services/categoria.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categorias: Categoria[] = []; // Lista de categorías para el menú desplegable
  mostrarCategorias = false; // Controla la visibilidad del dropdown
  cantidadCarrito = 0; // Total de ítems en el carrito
  userEmail: string | null = null; // Email del usuario autenticado

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    // Obtiene el email del usuario desde localStorage si está logueado
    this.userEmail = localStorage.getItem('userEmail');

    // Carga las categorías para el menú desplegable
    this.categoriaService.listarCategorias().subscribe(data => {
      this.categorias = data;
    });

    // Si hay usuario logueado, obtiene su ID y actualiza el contador del carrito
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.usuarioService.obtenerPorEmail(email).subscribe(usuario => {
        if (usuario.id !== undefined) {
          this.actualizarContador(usuario.id);

          // Se suscribe al observable emitido cuando el carrito cambia (agrega, elimina, etc.)
          this.carritoService.carritoActualizado$.subscribe(() => {
            this.actualizarContador(usuario.id!);
          });
        }
      });
    }
  }

  // Calcula el total de ítems en el carrito sumando cantidades de cada entrada
  private actualizarContador(usuarioId: number): void {
    this.carritoService.obtenerCarrito(usuarioId).subscribe(items => {
      this.cantidadCarrito = items.reduce((acc, item) => acc + item.cantidad, 0);
    });
  }

  // Redirige a distintas vistas usando el router
  goToInicio(): void {
    this.router.navigate(['/productos']);
  }

  irCarrito(): void {
    this.router.navigate(['/carrito']);
  }

  irContacto(): void {
    this.router.navigate(['/contacto']);
  }

  irPedidos(): void {
    const token = localStorage.getItem('jwt');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/pedidos']);
    }
  }

  // Al hacer clic en una categoría se navega y se oculta el menú desplegable
  verCategoria(id: number): void {
    this.router.navigate(['/categorias', id]);
    this.mostrarCategorias = false;
  }
}
