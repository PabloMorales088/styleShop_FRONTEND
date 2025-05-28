import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductosComponent } from './pages/producto/producto.component';
import { ProductoDetalleComponent } from './pages/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ContactoComponent } from './pages/contacto/contacto.component'; 
import { PedidosComponent } from './pages/pedidos/pedidos.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'productos', pathMatch: 'full' },
      { path: 'productos', component: ProductosComponent },
      { path: 'productos/:id', component: ProductoDetalleComponent },
      { path: 'carrito', component: CarritoComponent },
      { path: 'categorias/:id', component: CategoriasComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'pedidos', component: PedidosComponent }
    ]
  },

  { path: '**', redirectTo: 'productos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
