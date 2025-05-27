import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-info',
  templateUrl: './usuario-info.component.html',
  styleUrls: ['./usuario-info.component.css']
})
export class UsuarioInfoComponent {
  mostrarMenu = false;

  get userEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  toggleMenu(): void {
    this.mostrarMenu = !this.mostrarMenu;
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
  }

  irAPedidos(): void {
    this.mostrarMenu = false;
    window.location.href = '/pedidos';
  }
}
