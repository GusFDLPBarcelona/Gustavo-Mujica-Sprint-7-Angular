# Star Wars Starships Explorer

Aplicación Angular para explorar naves espaciales del universo Star Wars: listado con scroll, detalle de cada nave con sus especificaciones, pilotos y películas en las que aparece. Incluye registro y login con autenticación JWT.

## Demo

🔗 [Ver demo en GitHub Pages](https://gusfdlpbarcelona.github.io/Gustavo-Mujica-Sprint-7-Angular/)

> ⚠️ El login y registro **no funcionan en la demo pública** — requieren un backend local (ver sección [Autenticación](#autenticación-local) más abajo). En GitHub Pages podrás ver el home y la animación de introducción, pero no se podrá pasar de ahí sin un backend corriendo en local.

## Características

- **Listado de naves**: carga con scroll infinito desde la API de Star Wars.
- **Detalle de nave**: especificaciones completas, pilotos y películas en las que aparece.
- **Autenticación**: registro y login con JWT, rutas protegidas mediante guard.
- **Crawl de introducción**: animación estilo Star Wars en la pantalla de inicio.

## Tecnologías

- Angular 18 (standalone components, `@if`/`@for`)
- TypeScript
- [json-server](https://github.com/typicode/json-server) + [json-server-auth](https://github.com/jeremyben/json-server-auth) como backend local de autenticación
- [SWAPI](https://swapi.py4e.com/) (Star Wars API)

## Instalación y ejecución

1. Clona el repositorio e instala las dependencias:
   ```bash
   git clone https://github.com/gusfdlpbarcelona/Gustavo-Mujica-Sprint-7-Angular.git
   cd Gustavo-Mujica-Sprint-7-Angular
   npm install
   ```

2. Levanta el backend de autenticación en un terminal (puerto 3000):
   ```bash
   npx json-server-auth --watch db.json --port 3000
   ```

3. En otro terminal, levanta la aplicación Angular:
   ```bash
   npm start
   ```

4. Abre `http://localhost:4200`.

### Autenticación local

Las contraseñas del `db.json` de ejemplo están hasheadas — no hay forma de conocer la contraseña en texto plano de ninguna cuenta existente. Para probar el login:

1. Con el backend corriendo, entra en **Sign up** y regístrate con tus propios datos.
2. Inicia sesión con la cuenta que acabas de crear.
3. Ya puedes navegar a **Starships** y ver el listado y los detalles de cada nave.

## Sobre las APIs externas

Este proyecto depende de dos servicios externos que con el tiempo dejaron de estar disponibles tal como se usaban originalmente:

- **`swapi.dev`** (API de datos): el dominio fue vendido y su certificado SSL expiró. Se sustituyó por **`swapi.py4e.com`**, una réplica de la misma API que sigue funcionando.
- **`starwars-visualguide.com`** (imágenes): el dominio fue adquirido por una empresa ajena a Star Wars y ya no sirve imágenes. A día de hoy no se ha encontrado un servicio equivalente que permita mantener el código original funcionando con imágenes. Como consecuencia, las fotos de naves, pilotos y películas no cargan — se muestra un placeholder ("No picture, there is.") en su lugar. **Los datos (nombres, specs, títulos) sí cargan con normalidad**, solo las imágenes se ven afectadas. Esta situación se explica también dentro de la propia aplicación, en el crawl de la pantalla de inicio.

## Una curiosidad técnica

Durante el desarrollo, varios elementos (el logo, el menú de navegación, la card de detalle de nave) parecían visualmente descentrados al compararlos entre pantallas. Midiendo con `getBoundingClientRect()` en DevTools se confirmó que **todos estaban correctamente centrados por CSS** — la diferencia percibida se debía a la barra de scroll, que en páginas con contenido largo le resta ancho disponible al viewport y desplaza unos píxeles el centro real respecto al centro "visual" de la ventana. Una buena muestra de por qué medir es mejor que fiarse del ojo.

## Estructura de navegación

```
Home (crawl) → Login / Register → Starships (listado, requiere login)
                                        ↓
                                  Detalle de nave (specs, pilotos, películas)
```
