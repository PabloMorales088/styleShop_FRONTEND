# 🛍️ StyleShop - Frontend Angular

Este es el **frontend de StyleShop**, una tienda online de ropa streetwear. Ha sido desarrollado con **Angular 15** y diseñado para integrarse con la API REST del backend (Spring Boot). Permite a los usuarios explorar productos, gestionar el carrito, realizar pedidos y mucho más.

---

## 🚀 Tecnologías utilizadas

- Angular 15
- TypeScript
- HTML5 + CSS3 (estilo moderno y adaptado a dark mode)
- Angular Router
- Angular Forms
- FontAwesome (íconos)
- Slick Carousel (carrusel de portada)
- RxJS (observables y reactividad)
- Bootstrap opcional (solo si se añade manualmente)
- Comunicación con la API vía `HttpClient`
- Interceptor para manejo de tokens JWT
- Variables de entorno con `environment.ts`

---

## 📁 Estructura del proyecto

```bash
src/
├── app/
│   ├── pages/               # Componentes de interfaz: login, productos, carrito, contacto...
│   ├── services/            # Servicios para interactuar con la API
│   ├── interceptors/        # Interceptor JWT
│   └── app-routing.module.ts
│   └── app.module.ts
├── assets/                  # Imágenes, logos, etc.
├── environments/            # Configuración de entornos (dev y prod)
│   ├── environment.ts       # Desarrollo (localhost)
│   └── environment.prod.ts  # Producción
└── index.html, main.ts, etc
```

---

## 🛡️ Seguridad y Autenticación

- Manejo de autenticación por **JWT**
- El token se guarda en `localStorage`
- Interceptor personalizado añade el token a cada petición
- Acceso restringido a rutas protegidas si no hay token

---

## 📦 Funcionalidades principales

- Registro y Login de usuario
- Visualización de productos por categoría
- Vista de detalle de producto
- Añadir productos al carrito
- Eliminar productos del carrito
- Simulación de pasarela de pago
- Confirmación de pedido
- Visualización del historial de pedidos
- Página de contacto y mapa embebido (Google Maps)
- Diseño responsive con animaciones y estilos personalizados

---

## 🧠 Uso de environment.ts

El archivo `environment.ts` permite configurar fácilmente el endpoint de la API sin tocar los servicios:

```ts
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

En producción se usa `environment.prod.ts`.

---

## 🛠️ Instalación y ejecución local

1. Clona este repositorio:

```bash
git clone https://github.com/PabloMorales088/styleShop_FRONTEND.git
cd styleShop_FRONTEND
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el servidor de desarrollo:

```bash
ng serve
```

4. Accede a `http://localhost:4200` en tu navegador.

⚠️ Asegúrate de tener el backend (`StyleShop_BACKEND`) y el contenedor de MySQL+phpMyAdmin corriendo para que la app funcione correctamente.

---

## 🧪 Entorno de desarrollo

- IDE utilizado: **Visual Studio Code**
- Comando de compilación:

```bash
ng build --configuration production
```

---

## 🙋 Autor

- **Pablo Morales de los Santos**
- GitHub: [PabloMorales088](https://github.com/PabloMorales088)

---

## ✅ Estado

✅ Proyecto funcional y preparado para entrega como **Trabajo de Fin de Grado**.
