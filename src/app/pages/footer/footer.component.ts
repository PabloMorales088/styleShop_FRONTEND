import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer', // Selector del componente para su uso en HTML
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  // Propiedad calculada para saber si el usuario ha iniciado sesión
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt'); // Si existe un token, se considera logueado
  }

  // Método para cerrar sesión del usuario
  logout() {
    // Elimina el token y el email guardados en localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('userEmail');

    // Redirige al login forzando recarga completa
    window.location.href = '/login';
  }
}
