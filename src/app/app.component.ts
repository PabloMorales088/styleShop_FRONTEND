import { Component } from '@angular/core';
import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mostrarToast = false;
  mensajeToast = '';

  constructor(private carritoService: CarritoService) {
    this.carritoService.toastNotificacion$.subscribe(mensaje => {
      this.mensajeToast = mensaje;
      this.mostrarToast = true;
      setTimeout(() => this.mostrarToast = false, 3500);
    });
  }

  cerrarToast() {
    this.mostrarToast = false;
  }
}
