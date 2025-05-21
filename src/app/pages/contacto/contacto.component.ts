import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  feedback = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  enviado = false;

  enviarFeedback(): void {
    console.log('📝 Feedback enviado:', this.feedback);
    this.enviado = true;

    setTimeout(() => {
      this.enviado = false;
      this.feedback = { nombre: '', email: '', mensaje: '' };
    }, 4000);
  }
}
