import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from 'src/app/services/producto.service';
import { CategoriaService, Categoria } from 'src/app/services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-productos',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  mensaje = '';

  slides = [
    {
      imagen: 'assets/img/banner1.png',
    },
    {
      imagen: 'assets/img/banner2.png',
      titulo: 'Colección Streetwear 2025',
      subtitulo: 'Exprésate con prendas únicas'    
    },
    {
      imagen: 'assets/img/banner3.png',
       titulo: 'Always Comfort',
      subtitulo: 'Disponemos de la mejor calidad en nuestros productos'
    }
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false,
    fade: true,
    cssEase: 'ease-in-out'
  };

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    public router: Router,
    private carritoService: CarritoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(cats => {
      this.categorias = cats;
    });

    this.route.paramMap.subscribe(params => {
      const categoriaId = params.get('id');
      if (categoriaId) {
        this.productoService.filtrarPorCategoria(+categoriaId).subscribe(data => {
          this.productos = data;
        });
      } else {
        this.productoService.listarNovedades().subscribe(data => {
          this.productos = data;
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
