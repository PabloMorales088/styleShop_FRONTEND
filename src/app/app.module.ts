import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductoDetalleComponent } from './pages/producto-detalle/producto-detalle.component';
import { ProductosComponent } from './pages/producto/producto.component'; // CORREGIDO
import { ContactoComponent } from './pages/contacto/contacto.component';
import { UsuarioInfoComponent } from './pages/usuario-info/usuario-info.component';
import { LayoutComponent } from './pages/layout/layout.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarritoComponent,
    PedidosComponent,
    LoginComponent,
    RegisterComponent,
    CategoriasComponent,
    ProductoDetalleComponent,
    ProductosComponent, 
    ContactoComponent,
    UsuarioInfoComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,           
    SlickCarouselModule     
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
