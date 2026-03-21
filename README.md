# Portafolio y CV Web de Arturo Juarez Monroy

Aplicacion web desarrollada con React y Vite para presentar de forma visual, navegable y profesional el perfil de Arturo Juarez Monroy como ingeniero de software. El proyecto funciona como curriculum interactivo, portafolio de proyectos, escaparate de certificaciones y punto de contacto, todo dentro de una sola experiencia responsive con modos claro y oscuro.

Ademas de su version web, el repositorio incluye configuracion para ejecutarse como aplicacion de escritorio con Electron, lo que lo convierte en una base flexible para presentacion personal, demostraciones locales o distribucion empaquetada en Windows.

## Objetivo del proyecto

Este portafolio esta pensado para reunir en un solo sitio los elementos mas importantes del perfil profesional:

- Presentacion general y resumen del perfil.
- Experiencia y enfoque en desarrollo de software.
- Habilidades tecnicas y personales.
- Proyectos academicos e independientes con enlaces y videos.
- Certificaciones y reconocimientos en formato visual.
- Formulario de comentarios con almacenamiento en Firebase.
- Canales de contacto directos.

La idea principal es que cualquier persona pueda recorrer el perfil de manera clara, rapida y atractiva sin depender de un PDF tradicional como unico medio de presentacion.

## Caracteristicas principales

- Interfaz construida con React 19 y Vite.
- Navegacion por secciones mediante `react-router-dom`.
- Tema claro y oscuro con selector visual en el encabezado.
- Menu de navegacion desplegable y responsive.
- Portada con pantalla de bienvenida, animaciones y particulas de fondo.
- Pagina de habilidades separada entre habilidades tecnicas y personales.
- Seccion de proyectos con orden ascendente o descendente.
- Filtro de proyectos favoritos.
- Apertura de videos de proyectos dentro de un modal.
- Carrusel de certificaciones generado automaticamente a partir de imagenes dentro de `public/certificadosyreconocimientos`.
- Vista ampliada de certificados en modal.
- Seccion de comentarios conectada a Firebase Firestore.
- Persistencia local del ultimo comentario enviado mediante `localStorage`.
- Version web y posibilidad de empaquetado de escritorio con Electron.

## Stack tecnologico

### Frontend

- React 19
- Vite 7
- React Router DOM 7
- CSS personalizado

### Servicios y utilidades

- Firebase / Firestore para comentarios
- html2pdf.js como dependencia del proyecto

### Escritorio

- Electron
- electron-builder

## Estructura general del sitio

La aplicacion esta organizada por rutas dentro de un layout principal que comparte encabezado, sidebar, pie de pagina, reloj, particulas y logica comun de tema.

### Rutas disponibles

- `/` -> Inicio
- `/sobre-mi` -> Informacion general del perfil
- `/habilidades` -> Habilidades tecnicas y personales
- `/proyectos` -> Portafolio de proyectos
- `/certificaciones` -> Certificaciones y reconocimientos
- `/comentarios` -> Formulario de comentarios
- `/contacto` -> Canales de contacto

### Secciones destacadas

#### Inicio

La pagina principal integra una vista general del perfil, accesos rapidos a las secciones del sitio y el bloque de educacion. Funciona como punto de entrada para explorar el resto del portafolio.

#### Sobre mi

Presenta un resumen profesional centrado en desarrollo web full stack, interfaces dinamicas, APIs, paneles administrativos y soluciones basadas en datos.

#### Habilidades

Agrupa el stack principal en tres bloques:

- Lenguajes: JavaScript, Python, PHP, Java, C++ / C, SQL y TypeScript.
- Frameworks y librerias: React, React Native, Astro, Next.js, Node.js, Firebase, Vue, Tailwind CSS y Bootstrap.
- Herramientas complementarias: MySQL Workbench, WordPress, Power BI, Canvas, 3ds Max, Unity, AutoCAD y Excel.

Tambien incluye habilidades personales como creatividad, adaptabilidad, enfoque en el detalle, compromiso con la calidad y resiliencia.

#### Proyectos

Muestra proyectos academicos e independientes en tarjetas con descripcion, fecha, enlaces a repositorios, sitios o videos, y controles de orden y favoritos.

Entre los proyectos incluidos se encuentran:

- Piramides de Tula con A-Frame
- Sitio web del bar El Mezcalito
- Portal Turistico de Hidalgo
- IEEE Student Web Hub
- Recetario
- Aplicacion de Mapas Personalizados (SIG Hidalgo)
- Chat con IA Local (Ollama + Next.js)
- Aplicacion de Venta de Refrescos
- Sistema de gestion de gastos personales

#### Certificaciones

La seccion de certificaciones no esta hardcodeada manualmente una por una. El proyecto usa un modulo virtual de Vite que lee automaticamente los archivos de imagen en `public/certificadosyreconocimientos`, los ordena y los transforma en un carrusel navegable.

Cada certificacion puede abrirse en pantalla completa dentro de un modal para facilitar su consulta.

#### Comentarios

La pagina de comentarios permite que una persona deje su nombre, correo opcional y mensaje. La informacion se envia a la coleccion `comments` de Firestore y, ademas, se guarda localmente el ultimo comentario enviado para mostrarlo de inmediato en la interfaz.

#### Contacto

Incluye accesos directos a:

- Correo
- LinkedIn
- GitHub
- WhatsApp

## Arquitectura del proyecto

La estructura del repositorio sigue una organizacion clara por paginas, componentes y layout:

```text
.
|-- public/
|   |-- certificadosyreconocimientos/
|   |-- avatar*.png
|   |-- Curriculum Arturo JM.pdf
|-- src/
|   |-- components/
|   |-- layouts/
|   |-- pages/
|   |-- App.css
|   |-- index.css
|   |-- router.jsx
|   |-- firebase.js
|   |-- CommentSection.jsx
|   |-- particulasfondo.jsx
|-- main.cjs
|-- vite.config.js
|-- package.json
```

### Archivos clave

- `src/router.jsx`
  Define las rutas principales del portafolio.

- `src/layouts/PortfolioLayout.jsx`
  Centraliza el layout base, el cambio de tema, la pantalla de bienvenida, el modal de video y elementos globales de la interfaz.

- `src/components/ProjectsSection.jsx`
  Contiene la lista de proyectos, el ordenamiento y el filtro de favoritos.

- `src/CertificationsCarousel.jsx`
  Construye el carrusel de certificados y su modal de vista ampliada.

- `src/CommentSection.jsx`
  Gestiona el formulario de comentarios y su escritura en Firestore.

- `src/firebase.js`
  Inicializa Firebase y exporta la instancia de Firestore.

- `vite.config.js`
  Agrega un plugin personalizado para detectar automaticamente certificaciones desde el directorio publico.

- `main.cjs`
  Permite abrir la aplicacion como ventana de Electron.

## Requisitos previos

Para ejecutar este proyecto de manera local se recomienda contar con:

- Node.js 20 o superior
- npm

## Instalacion

Clona el repositorio e instala dependencias:

```bash
npm install
```

## Ejecucion en desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite levantara la aplicacion en la direccion local que indique la terminal, normalmente:

```bash
http://localhost:5173
```

## Compilacion para produccion

Para generar la carpeta `dist`:

```bash
npm run build
```

Para previsualizar la build:

```bash
npm run preview
```

## Ejecutar como aplicacion de escritorio

El proyecto tambien puede abrirse con Electron.

### En desarrollo

Electron carga la URL local de Vite cuando la aplicacion no esta empaquetada, por lo que normalmente se trabaja con dos procesos:

1. Levantar Vite con `npm run dev`
2. En otra terminal, abrir Electron con `npm run start`

### Empaquetado

Para generar una build de escritorio:

```bash
npm run dist
```

La configuracion actual de `electron-builder` define:

- `appId`: `com.arturo.cv`
- `productName`: `CV Arturo`
- destino de Windows: `nsis`

## Scripts disponibles

```bash
npm run dev      # Inicia Vite en modo desarrollo
npm run build    # Genera la build de produccion
npm run preview  # Sirve la build generada localmente
npm run lint     # Ejecuta ESLint
npm run start    # Abre la app con Electron
npm run dist     # Empaqueta la app con electron-builder
```

## Certificaciones dinamicas

Una de las partes mas practicas del proyecto es la carga automatica de certificados.

Si deseas agregar nuevas certificaciones, solo coloca imagenes validas dentro de:

```text
public/certificadosyreconocimientos
```

El plugin configurado en `vite.config.js`:

- detecta archivos de imagen compatibles
- ignora archivos ocultos
- los ordena alfabeticamente
- fuerza recarga completa cuando detecta cambios

Formatos admitidos:

- `.png`
- `.jpg`
- `.jpeg`
- `.webp`
- `.avif`
- `.gif`
- `.svg`

## Comentarios con Firebase

La seccion de comentarios utiliza Firestore para registrar mensajes enviados desde el formulario.

Actualmente el proyecto inicializa Firebase directamente desde `src/firebase.js`. La coleccion usada es:

```text
comments
```

Cada comentario guarda:

- nombre
- correo electronico opcional
- comentario
- marca de tiempo del servidor

Adicionalmente, el ultimo comentario enviado se guarda en `localStorage` para mostrarse inmediatamente al usuario incluso despues de un refresco local.

## Personalizacion del contenido

Este proyecto puede actualizarse facilmente sin reestructurarlo desde cero.

### Para cambiar proyectos

Edita la lista declarada en:

```text
src/components/ProjectsSection.jsx
```

Desde ahi puedes:

- agregar nuevas tarjetas
- cambiar descripciones
- actualizar enlaces
- marcar proyectos como favoritos
- indicar si un proyecto sigue en desarrollo

### Para cambiar habilidades

Edita:

```text
src/components/SkillsContent.jsx
```

### Para cambiar datos de contacto

Edita:

```text
src/components/ContactPanel.jsx
```

### Para cambiar textos generales del perfil

Revisa principalmente:

- `src/components/AboutSection.jsx`
- `src/components/EducationSection.jsx`
- `src/pages/*`
- `src/layouts/PortfolioLayout.jsx`

## Decisiones tecnicas relevantes

- Se usa `createHashRouter` para facilitar compatibilidad en entornos donde no siempre hay configuracion de servidor para rutas limpias.
- La propiedad `base: "./"` en Vite ayuda a que la build funcione correctamente en escenarios locales y de escritorio.
- El layout centraliza la mayor parte del comportamiento global para mantener paginas mas simples.
- La carga de certificaciones por plugin evita mantener listas manuales dentro del codigo.
- El proyecto esta orientado a presentacion visual, por lo que CSS tiene un papel importante en la experiencia final.

## Posibles mejoras futuras

Estas no son obligatorias para usar el proyecto, pero pueden ser buenas siguientes iteraciones:

- mover configuracion sensible a variables de entorno
- agregar pruebas para componentes clave
- consumir comentarios existentes desde Firestore y listarlos en tiempo real
- incorporar seccion de experiencia profesional mas detallada
- agregar internacionalizacion
- optimizar el peso del bundle principal

## Autor

**Arturo Juarez Monroy**

- GitHub: [ArturoJM0A1](https://github.com/ArturoJM0A1)
- LinkedIn: [arturojuarezmonroy](https://www.linkedin.com/in/arturojuarezmonroy)
- Correo: `juarezmonroyarturo574@gmail.com`

## Licencia y uso

Este repositorio funciona como portafolio personal. Si deseas reutilizar la base para tu propio sitio, lo recomendable es adaptar contenido, estilos, imagenes, enlaces y configuraciones antes de publicarlo como proyecto propio.
