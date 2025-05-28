import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // Este método intercepta todas las peticiones HTTP salientes
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt'); // Recupera el token JWT almacenado en el navegador

    if (token) {
      // Si existe un token, clona la solicitud original y le añade el header Authorization
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Añade el token en el formato que espera el backend
        }
      });
      return next.handle(authReq); // Continúa con la solicitud modificada
    }

    // Si no hay token, la solicitud se envía sin modificaciones
    return next.handle(req);
  }
}
