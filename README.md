# Gustavo-Mujica-Sprint-7-Angular

# Star Wars

## Descripción 📄

Este repositorio contiene los recursos de una aplicación web para explorar información sobre naves espaciales de Star Wars.



## Características ✨

- **Exploración de Starships**: Permite explorar información detallada sobre diversas naves espaciales de Star Wars.
- **Autenticación de Usuarios**: Funcionalidad de inicio de sesión y registro.
- **Navegación Segura**: Uso de Guards para proteger rutas que requieren autenticación.
- **Interacción con la API de Star Wars**: Consumo de datos desde la API de Star Wars.

## Interacción con la API de Star Wars 🌌

Este proyecto utiliza la [API de Star Wars](https://swapi.dev/documentation) para obtener información sobre naves espaciales. Puedes explorar la documentación para conocer los endpoints disponibles y la estructura de los datos.

Además, las imágenes de las naves espaciales se obtienen de [Star Wars Visual Guide](https://starwars-visualguide.com/assets/img/starships/). Puedes acceder a las imágenes utilizando enlaces como este: [Imagen de la Nave 5](https://starwars-visualguide.com/assets/img/starships/5.jpg).



## Tecnologías Utilizadas 💻

- TypeScript
- HTML5
- SCSS 
- [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## Requisitos 📋

- Node.js y npm instalados en tu sistema. Puedes descargarlos desde [nodejs.org](https://nodejs.org/).
- Angular CLI instalado globalmente. Puedes instalarlo con el siguiente comando:

```bash
npm install -g @angular/cli
```

## Instalación 🛠️

1. Clona el repositorio:
```bash
git clone https://github.com/GusFDLPBarcelona/Gustavo-Mujica-Sprint-7-Angular.git
```

2. Ingresa al directorio del proyecto:
```bash
cd star_wars
```

3. Instala las dependencias:
```bash
npm install
```

4. Levanta el servidor JSON en el puerto 3000:

```bash
npx json-server-auth db.json
```


## Ejecución ▶️
Ejecuta la aplicación con el siguiente comando:
```bash
ng serve -o
```


## Uso 🚀
- login y registro.
- Navegar: Utilizar el menú de navegación para explorar diferentes categorías como Pilotos, naves y películas.
