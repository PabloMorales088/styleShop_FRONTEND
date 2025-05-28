import { Component } from '@angular/core';
import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  // Controla si el toast debe mostrarse
  mostrarToast = false;

  // Mensaje que se mostrará en el toast
  mensajeToast = '';

  // Inyección del servicio de carrito en el constructor
  constructor(private carritoService: CarritoService) {
    // Se suscribe al observable 'toastNotificacion$' para mostrar un mensaje cuando se emita
    this.carritoService.toastNotificacion$.subscribe(mensaje => {
      this.mensajeToast = mensaje;   // Establece el mensaje recibido
      this.mostrarToast = true;      // Muestra el toast

      // Oculta el toast automáticamente después de 3.5 segundos
      setTimeout(() => this.mostrarToast = false, 3500);
    });
  }

  // Cierra manualmente el toast si el usuario hace clic en la X
  cerrarToast() {
    this.mostrarToast = false;
  }
}
