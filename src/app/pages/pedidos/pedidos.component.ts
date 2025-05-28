import { Component, OnInit } from '@angular/core';
import { PedidoService, Pedido } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  // Lista de pedidos que se mostrará en la vista
  pedidos: Pedido[] = [];

  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificamos si el usuario está autenticado comprobando si hay token JWT
    const token = localStorage.getItem('jwt'); // <- CORREGIDO para usar la clave correcta
    if (!token) {
      // Si no hay token, redirigimos al login
      this.router.navigate(['/login']);
      return;
    }

    // Obtenemos el email del usuario almacenado en localStorage
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    // Obtenemos el objeto usuario por email y luego sus pedidos
    this.usuarioService.obtenerPorEmail(email).subscribe(usuario => {
      // Llamamos al servicio de pedidos para obtener los pedidos del usuario por su ID
      this.pedidoService.obtenerPedidosPorUsuario(usuario.id!).subscribe(data => {
        this.pedidos = data; // Guardamos los pedidos para renderizarlos
      });
    });
  }
}
