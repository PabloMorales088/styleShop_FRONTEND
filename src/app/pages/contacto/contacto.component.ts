import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto', // Selector utilizado en el HTML para representar este componente
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  // Objeto que almacena los datos del formulario de contacto
  feedback = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  // Variable para mostrar el mensaje de éxito tras enviar el formulario
  enviado = false;

  // Simula el envío de feedback (por ahora solo lo muestra en consola)
  enviarFeedback(): void {
    console.log('Feedback enviado:', this.feedback); // Muestra los datos en consola
    this.enviado = true; // Muestra el mensaje de agradecimiento

    // Después de 4 segundos, limpia el formulario y oculta el mensaje
    setTimeout(() => {
      this.enviado = false;
      this.feedback = { nombre: '', email: '', mensaje: '' };
    }, 4000);
  }
}
