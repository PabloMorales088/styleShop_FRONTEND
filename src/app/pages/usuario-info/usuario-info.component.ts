import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-info', // Nombre del componente para usarlo en HTML
  templateUrl: './usuario-info.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./usuario-info.component.css']   // Ruta a los estilos del componente
})
export class UsuarioInfoComponent {
  // Variable que controla la visibilidad del menú desplegable
  mostrarMenu = false;

  // Getter que devuelve el email del usuario almacenado en localStorage
  get userEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  // Método que alterna la visibilidad del menú (abre/cierra)
  toggleMenu(): void {
    this.mostrarMenu = !this.mostrarMenu;
  }

  // Método que cierra la sesión del usuario
  // Elimina el token y el email almacenado y redirige al login
  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userEmail');
    window.location.href = '/login'; // Se usa reload total en vez de router.navigate para limpieza completa
  }

  // Método que redirige a la página de pedidos del usuario
  irAPedidos(): void {
    this.mostrarMenu = false; // Cierra el menú antes de redirigir
    window.location.href = '/pedidos'; // Redirección a pedidos
  }
}
