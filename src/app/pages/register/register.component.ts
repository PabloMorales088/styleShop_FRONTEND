import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  mensaje = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  registrar() {
    this.usuarioService.registrar({
      nombre: this.nombre,
      email: this.email,
      password: this.password
    }).subscribe({
      next: res => {
        localStorage.setItem('userEmail', this.email);
        this.router.navigate(['/login']);
      },
      error: err => {
        this.mensaje = typeof err.error === 'string' ? err.error : 'ERROR AL REGISTRARSE';
      }
    });
  }
}
