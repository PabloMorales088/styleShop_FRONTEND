import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Propiedades enlazadas al formulario mediante [(ngModel)]
  email = '';
  password = '';
  mensaje = ''; // Mensaje para mostrar errores o notificaciones

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  // Método ejecutado al enviar el formulario de login
  iniciarSesion() {
    this.usuarioService.login({
      nombre: '', // El backend ignora esto en login, por eso se deja vacío
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        const token = res.token;

        // Si el servidor devuelve el token correctamente
        if (token) {
          localStorage.setItem('jwt', token); // Guarda el JWT para futuras peticiones
          localStorage.setItem('userEmail', this.email); // Guarda el email para identificar al usuario
          this.router.navigate(['/productos']); // Redirige al usuario tras login exitoso
        } else {
          this.mensaje = 'No se recibió el token del servidor'; // Fallback por si el backend no responde como se espera
        }
      },
      error: () => {
        this.mensaje = 'CORREO O CONTRASEÑA INCORRECTOS';
      }
    });
  }
}
