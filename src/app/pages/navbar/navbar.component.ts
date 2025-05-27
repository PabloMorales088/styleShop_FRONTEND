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
  categorias: Categoria[] = [];
  mostrarCategorias = false;
  cantidadCarrito = 0;
  userEmail: string | null = null;

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail');

    this.categoriaService.listarCategorias().subscribe(data => {
      this.categorias = data;
    });

    const email = localStorage.getItem('userEmail');
    if (email) {
      this.usuarioService.obtenerPorEmail(email).subscribe(usuario => {
        if (usuario.id !== undefined) {
          this.actualizarContador(usuario.id);
          this.carritoService.carritoActualizado$.subscribe(() => {
            this.actualizarContador(usuario.id!);
          });
        }
      });
    }
  }

  private actualizarContador(usuarioId: number): void {
    this.carritoService.obtenerCarrito(usuarioId).subscribe(items => {
      this.cantidadCarrito = items.reduce((acc, item) => acc + item.cantidad, 0);
    });
  }

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

  verCategoria(id: number): void {
    this.router.navigate(['/categorias', id]);
    this.mostrarCategorias = false;
  }
}
