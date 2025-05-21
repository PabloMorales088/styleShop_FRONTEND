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
  pedidos: Pedido[] = [];

  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const email = localStorage.getItem('userEmail');
    if (!email) return;

    this.usuarioService.obtenerPorEmail(email).subscribe(usuario => {
      this.pedidoService.obtenerPedidosPorUsuario(usuario.id!).subscribe(data => {
        this.pedidos = data;
      });
    });
  }
}
