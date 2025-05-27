import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  mensaje = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  iniciarSesion() {
    this.usuarioService.login({
      nombre: '',
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        const token = res.token;
        if (token) {
          localStorage.setItem('jwt', token);
          localStorage.setItem('userEmail', this.email);
          this.router.navigate(['/productos']);
        } else {
          this.mensaje = 'No se recibió el token del servidor';
        }
      },
      error: () => {
        this.mensaje = 'Correo o contraseña incorrectos';
      }
    });
  }
}
