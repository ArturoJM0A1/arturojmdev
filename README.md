# Arturo Juárez Monroy - Curriculum y portafolio de proyectos

Aplicación web desarrollada con **React 19** + **Vite 7** que funciona como currículum interactivo, portafolio de proyectos, galería de certificaciones, gestor de comentarios y punto de contacto. Incluye modo claro/oscuro, animaciones GSAP, escenas 3D con Three.js/Spline, cursor con shader WebGL personalizado, reproductor de música y versión de escritorio con **Electron**.

**Hosting:** [https://arturojuarezmonroy.vercel.app](https://arturojuarezmonroy.vercel.app)

---

## Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|---|---|---|
| React | ^19.2.0 | UI framework |
| React DOM | ^19.2.0 | Renderizado DOM |
| React Router DOM | ^7.13.1 | Navegación hash-based (compatible con Electron) |
| Vite | ^7.3.1 | Bundler / dev server |
| Tailwind CSS v4 | ^4.2.2 | Utilidades CSS (uso mínimo; predomina CSS personalizado) |
| GSAP + ScrollTrigger | ^3.14.2 | Animaciones con scroll |
| Three.js | ^0.183.2 | Escena 3D PartyLights + GhostCursor |
| Spline (@splinetool/react-spline) | ^4.1.0 | Escena 3D de bienvenida |

### Servicios / Utilidades

| Tecnología | Propósito |
|---|---|
| Firebase Firestore | Almacenamiento de comentarios |
| html2pdf.js | Descarga de CV en PDF |
| Font Awesome 6.5.2 (CDN) | Iconos |

### Escritorio

| Tecnología | Propósito |
|---|---|
| Electron ^41.0.3 | Desktop wrapper |
| electron-builder ^26.8.1 | NSIS installer for Windows |

### Calidad

| Herramienta | Propósito |
|---|---|
| ESLint ^9.39.1 | Linting |
| PostCSS + Autoprefixer | Procesamiento CSS |
| @vitejs/plugin-react | React Fast Refresh |
| @tailwindcss/vite | Integración Tailwind v4 en Vite |

---

## Rutas

Todas las rutas usan **hash router** (createHashRouter) para compatibilidad con Electron. Cada página se carga con React.lazy + Suspense (componente ContentLoader animado).

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | HomePage | Página principal: tarjetas de acceso rápido + AboutSection |
| `/sobre-mi` | AboutPage | Información personal, CodeEditor interactivo, EducationSection |
| `/habilidades` | SkillsPage | Habilidades técnicas y personales, DevStackPulse |
| `/experiencia` | ExperiencePage | Experiencia laboral (4 roles) |
| `/certificaciones` | CertificationsPage | Galería de certificados |
| `/proyectos` | ProjectsPage | Portafolio de proyectos con filtros |
| `/actualmente` | CurrentlyPage | Actividades actuales (en construcción) |
| `/comentarios` | CommentsPage | Módulo de comentarios con Firebase |
| `/contacto` | ContactPage | Canales de contacto (6 vías) |
| `*` | NotFoundPage | Página 404 |

**Menú de navegación** (10 items):

1. Recorrido → `/` (end route)
2. Sobre mí → `/sobre-mi`
3. Habilidades → `/habilidades`
4. Experiencia → `/experiencia`
5. Certificaciones → `/certificaciones`
6. Proyectos → `/proyectos`
7. Actualmente → `/actualmente`
8. Comentarios → `/comentarios`
9. Contacto → `/contacto`
10. Jugar → https://starlightnoreturn.vercel.app (externa, abre en nueva pestaña)
---

## Características Principales

### 1. Pantalla de Bienvenida (Welcome Overlay)

- Escena 3D con Spline (@splinetool/react-spline)
- Título: "Arturo Juárez Monroy", subtítulo: "Ingeniería en Software"
- Botón "Entrar" con animación de pulso
- Avatares (avatar2.png, avatar5.png) que cambian al hacer hover
- Respeta prefers-reduced-motion

### 2. Modo Oscuro / Claro

- Alternancia con botón ThemeGlyph (SVG inline 64x64)
- Persistencia en localStorage
- CSS custom properties para todos los colores

### 3. Partículas de Fondo (particulasfondo.jsx)

- Canvas con sistema de partículas
- Modo oscuro: 116 partículas con estela verde #00ff88
- Modo claro: 22 partículas con estela azul #9ed8ff + capas de nubes
- Interacción con el ratón (atracción/repulsión)

### 4. PartyLights (Three.js 3D)

- Escena 3D con esferas flotantes en hilos (luces de fiesta)
- Shaders personalizados (vertex + fragment) para brillo pulsante
- Modo oscuro: ambiente #080810, acento #00ff88
- Modo claro: ambiente #93c5fd, acento #2563eb
- Responsive: calidad reducida en móvil

### 5. GhostCursor (Cursor WebGL)

- Reemplaza el cursor del ratón por un orbe fantasmal
- Shaders con ruido Simplex, glow, distorsión ondulada
- Uniformes: u_time, u_ratio, u_pointer, u_smile, u_main_color, u_border_color, u_flat_color
- Respeta prefers-reduced-motion

### 6. Perfil con Fotos por Año

- Carrusel de 4 fotos (2023–2026) en public/fotosanios/
- Navegación anterior/siguiente con indicador de año
- Efecto ProfileLetterRain (Matrix rain) sobre la foto

### 7. Reproductor de Música

- Pista: public/music.mp3
- Botón play/pause con barra de progreso y duración
- Tooltip informativo en el primer uso: "Quieres escuchar la musica del portafolio?"

### 8. CodeEditor Interactivo

- Editor simulado tipo VS Code con 3 pestañas de archivo:
  - about.js — Objeto developer con nombre, edad, país, rol, email, LinkedIn
  - skills.json — 8 habilidades con nombre, nivel (0–100) y keywords
  - info.ts — Objeto con escuela, carrera, año de egreso, número de certificaciones
- Barra lateral, números de línea, coloreado de sintaxis

### 9. Sección "Acerca de" (AboutSection)

- Texto dividido en 60 palabras con animación GSAP (stagger con blur desde abajo)
- Integra el CodeEditor

### 10. Proyectos

- Cargados desde public/projects.json (14 proyectos)
- Orden ascendente/descendente por año
- Filtro de favoritos (★)
- Enlaces a: repositorio GitHub, video YouTube, sitio externo
- Modal de video con iframe (YouTube embed)
- Componente ProjectActionChrome con decoraciones de estrellas

### 11. Certificaciones Dinámicas

- Plugin Vite personalizado (certifications-plugin) crea el módulo virtual virtual:certifications
- Escanea public/certificadosyreconocimientos/ en busca de imágenes
- Formatos soportados: PNG, JPG, JPEG, WebP, AVIF, GIF, SVG
- Carrusel horizontal con botones anterior/siguiente
- Modal para vista completa
- Alt text generado automáticamente del nombre del archivo
- 25 certificaciones actualmente

### 12. Comentarios con Firebase

- Conexión a Firebase Firestore (colección comments)
- Formulario: nombre, email (opcional), comentario
- Soporte para bloques de código con triple backtick + lenguaje
- Inline code resaltado
- Último comentario guardado en localStorage para visualización inmediata

### 13. Contacto

6 canales de contacto con iconos Font Awesome:

| Canal | Valor |
|---|---|
| Correo | juarezmonroyarturo574@gmail.com |
| LinkedIn | linkedin.com/in/arturojuarezmonroy |
| GitHub | ArturoJM0A1 |
| YouTube | Arturo Juarez Monroy |
| WhatsApp | +52 1 773 680 2105 |

### 14. Experiencia Laboral

4 roles documentados:

| Puesto | Empresa | Periodo | Tecnologías |
|---|---|---|---|
| Desarrollador Backend | INBURSA Grupo Financiero | May 2026 – Jun 2026 | Java, Hibernate, HQL, Spring Boot, Oracle, PL/SQL |
| Desarrollador Full Stack React | Independiente | Abr 2025 – Feb 2026 | React, TypeScript, Node.js, PostgreSQL, REST APIs |
| Desarrollo PHP y WordPress | Grupo Alternativas Solucione | Jul 2024 – Dic 2024 | PHP, WordPress, MySQL, APIs |
| Desarrollador de Software | Gobierno del Estado de Hidalgo | Ene 2023 – Ago 2023 | PHP, CSS, JavaScript, MySQL |

### 15. Habilidades

Técnicas (3 grupos):

- Lenguajes: JavaScript, Python, PHP, Java, C, C++, SQL, TypeScript (8)
- Frameworks / Librerías: React, React Native, Astro, Next.js, Node.js, Firebase, Vue, Tailwind CSS, Bootstrap (9)
- Otros: MySQL Workbench, WordPress, Power BI, Canvas, 3ds Max, Unity, AutoCAD, Excel (8)

Personales (3): Creatividad, Comunicación, Adaptabilidad

DevStackPulse: Widget de experiencia con 6 lenguajes en barras:

| Lenguaje | % |
|---|---|
| JavaScript | 73 |
| React | 70 |
| SQL | 64 |
| Tailwind | 60 |
| Java | 56 |
| Python | 42 |

### 16. Educación

- Ingeniería en Software — Universidad Autónoma del Estado de Hidalgo (2020–2024)
- EducationBadge: SVG animado con GSAP (graduación, halo, chispas, anillos)

### 17. HeroCat

- Gato decorativo hecho completamente con CSS (pseudo-elementos)
- Cuerpo, cabeza, orejas, ojos, bigotes, cola
- Animación de respiración
- Colores adaptables a modo claro/oscuro

### 18. Botón Cohete (Scroll-to-Top)

- Botón fijo abajo a la derecha
- Emoji 🚀 con rotación en hover
- Gradiente animado
- window.scrollTo({ top: 0, behavior: 'smooth' })

### 19. Loader Animado (ContentLoader)

- Anillos concéntricos con haz rotatorio
- Texto "Sistema activo", label y caption
- Accesible: role="status", aria-live="polite", aria-busy="true"

### 20. Efectos de Scroll (PortfolioLayoutScrollFx)

- GSAP ScrollTrigger anima el icono de tema (se mueve, rota, escala al hacer scroll)

---

## Proyectos (14 en total)

Los datos se definen en `public/projects.json`. Cada proyecto puede incluir:

- favorite: true — marcado como favorito
- inDevelopment: true — muestra indicador de desarrollo
- links[] — array de enlaces (repo, video, sitio externo)

| # | Proyecto | Año | Favorito |
|---|---|---|---|
| 1 | Pirámides de Tula con A-Frame | 2023 | |
| 2 | Sitio Web del bar "El Mezcalito" | 2023 | |
| 3 | Portal Turístico de Hidalgo | 2024 | |
| 4 | Sitio web IEEE Student Web Hub | 2024 | |
| 5 | Recetario | 2024 | |
| 6 | Aplicación de Mapas Personalizados (SIG Hidalgo) | 2025 | ★ |
| 7 | Chat con IA Local (Ollama + Next.js) | 2026 | |
| 8 | Aplicación de Venta de Refrescos | 2026 | |
| 9 | Catálogos de Excel a elementos Web | 2026 | |
| 10 | Detector de Objetos PWA en tiempo real | 2026 | ★ |
| 11 | Sistema de Reservaciones de Servicios Técnicos | 2026 | |
| 12 | Experiencia VR con Control por Voz | 2023 | ★ |
| 13 | Generador de Ciudades 3D con Three.js | 2026 | ★ |
| 14 | Starlight: No Return (videojuego arcade) | 2026 | ★ (en desarrollo) |

---

## Instalación y Uso

```bash
# Clonar repositorio
git clone <repo-url>
cd arturojmdev

# Instalar dependencias
npm install

# Desarrollo
npm run dev        # http://localhost:5173

# Build producción
npm run build      # Salida en dist/

# Vista previa del build
npm run preview
```

### Escritorio (Electron)

```bash
# Abrir en ventana de Electron
npm run start

# Empaquetar instalador NSIS para Windows
npm run dist
```

---

## Estructura del Proyecto

```
arturojmdev/
├── index.html                 # Entry HTML (meta tags, JSON-LD Schema, Font Awesome CDN)
├── main.cjs                   # Electron main process (BrowserWindow 1000x700)
├── package.json               # Scripts, dependencias, configuración
├── vite.config.js             # Vite + plugins React/Tailwind/certifications-plugin
├── eslint.config.js           # Configuración ESLint
├── postcss.config.js          # PostCSS + Autoprefixer
├── tailwind.config.js         # Tailwind v4 config
│
├── public/                    # Archivos estáticos
│   ├── projects.json                   # Datos de proyectos
│   ├── music.mp3                       # Pista de audio
│   ├── JuarezMonroyArturo CV.pdf       # CV descargable
│   ├── JuarezMonroyArturo CV.docx
│   ├── artsearch2.png                  # Favicon
│   ├── avatar1.png                     # Avatar
│   ├── avatar2.png                     # Avatar (hover en welcome)
│   ├── avatar3.png                     # Avatar
│   ├── avatar4.png                     # Avatar
│   ├── avatar5.png                     # Avatar (hover en welcome + footer)
│   ├── dancedarktmode.gif              # GIF modo oscuro
│   ├── dancelightmode.gif              # GIF modo claro
│   ├── iampixelimage.jpg
│   ├── Songs.png
│   ├── vprevia.png
│   ├── vite.svg
│   ├── robots.txt
│   ├── fotosanios/                     # Fotos de perfil por año
│   ├── experienciaempresas/           # Logos de empresas
│   └── certificadosyreconocimientos/  # 25 imágenes de certificados
│
├── src/
│   ├── main.jsx                     # Entry point React (StrictMode)
│   ├── App.jsx                      # RouterProvider
│   ├── router.jsx                   # HashRouter con 10 rutas lazy-loaded
│   ├── menuNavigation.js            # Items de navegación + scrollToSection()
│   ├── firebase.js                  # Configuración Firebase
│   │
│   ├── layouts/
│   │   └── PortfolioLayout.jsx      # Layout principal (tema, audio, modales, botón cohete)
│   │
│   ├── pages/
│   │   ├── HomePage.jsx             # QuickLinks + AboutSection
│   │   ├── AboutPage.jsx            # AboutSection + EducationSection
│   │   ├── SkillsPage.jsx           # SkillsContent (variant=page)
│   │   ├── ExperiencePage.jsx       # ExperienceSection (4 roles)
│   │   ├── CertificationsPage.jsx   # CertificationsCarousel
│   │   ├── ProjectsPage.jsx         # ProjectsSection
│   │   ├── CurrentlyPage.jsx        # Sección "En construcción"
│   │   ├── CommentsPage.jsx         # CommentSection
│   │   ├── ContactPage.jsx          # ContactPanel
│   │   └── NotFoundPage.jsx         # 404
│   │
│   ├── components/
│   │   ├── SiteHeader.jsx           # Barra de navegación + HeroCat
│   │   ├── SidebarInfo.jsx          # Foto por año, audio, skills compacto, CV
│   │   ├── AboutSection.jsx         # Texto animado + CodeEditor
│   │   ├── CodeEditor.jsx           # Editor VS Code simulado
│   │   ├── CodeEditor.css           # Estilos del editor
│   │   ├── EducationSection.jsx     # Información académica
│   │   ├── EducationBadge.jsx       # SVG animado de graduación
│   │   ├── ExperienceSection.jsx    # 4 experiencias laborales
│   │   ├── SkillsContent.jsx        # Grupos de habilidades + DevStackPulse
│   │   ├── DevStackPulse.jsx        # Widget de experiencia en barras
│   │   ├── DevStackPulse.css        # Estilos del widget
│   │   ├── ProjectsSection.jsx      # Lista de proyectos con filtros
│   │   ├── ContactPanel.jsx         # 6 tarjetas de contacto
│   │   ├── PageIntro.jsx            # Encabezado reutilizable
│   │   ├── ContentLoader.jsx        # Loader animado
│   │   ├── GhostCursor.jsx          # Cursor WebGL con shaders
│   │   ├── PartyLights.jsx          # Escena Three.js 3D
│   │   ├── ProfileLetterRain.jsx    # Lluvia Matrix sobre la foto
│   │   ├── HeroCat.css              # Gato decorativo CSS
│   │   └── SidebarInfo.css          # Estilos del sidebar
│   │
│   ├── CertificationsCarousel.jsx   # Carrusel de certificados
│   ├── CommentSection.jsx           # Comentarios con Firebase
│   ├── particulasfondo.jsx          # Partículas de fondo
│   ├── PortfolioLayoutScrollFx.jsx  # ScrollTrigger en layout
│   │
│   ├── assets/
│   │   ├── sprite.svg               # Iconos SVG para habilidades
│   │   ├── react.svg
│   │   └── 22.jpg
│   │
│   ├── App.css                      # ~10,000+ líneas — estilos globales
│   ├── index.css                    # Tailwind v4 imports + base styles
│   └── cohetegoup.css               # Botón cohete scroll-to-top
│
├── dist/                            # Build de producción
├── node_modules/
├── tools/
├── vscode/
├── .git/
├── .gitattributes
├── .gitignore
└── .vscode/
```

---

## CSS Architecture

- **App.css** (~10,000+ líneas): Contiene todas las variables CSS (:root y .dark-mode), estilos de componentes, keyframes de animación, modales, formularios, botones, layout responsivo. Es el archivo de estilos principal.
- **index.css**: Importa Tailwind v4, define el variant dark personalizado, estilos base y footer.
- **cohetegoup.css**: Botón cohete fijo.
- **HeroCat.css**: Gato CSS-only.
- **SidebarInfo.css**: Controles de foto y audio.
- **DevStackPulse.css**: Widget de experiencia.
- **CodeEditor.css**: Editor VS Code simulado.

**Custom Properties** (temas claro/oscuro):

- `--primary-{light,dark}`, `--secondary-{light,dark}`, `--accent-{light,dark}`
- `--bg-{light,dark}`, `--surface-{light,dark}`, `--text-{light,dark}`
- `--border-{light,dark}`, `--shadow-glow`, `--gradient-1`, `--gradient-2`
- `--font-primary: 'Orbitron'`, `--font-body: 'Tajawal'`, `--font-code: 'Fira Code'`

**Google Fonts:**

- Orbitron (400, 600, 700)
- Tajawal (300, 400, 500, 600)
- Fira Code (300, 400, 500)
- Share Tech Mono, Exo 2 (para DevStackPulse)

---

## Módulo Virtual: Certificaciones

El plugin `certifications-plugin` en `vite.config.js` crea el módulo virtual `virtual:certifications` que exporta un array con los nombres de archivo de imagen en `public/certificadosyreconocimientos/`. Soporta HMR: al agregar o quitar imágenes, el carrusel se actualiza automáticamente.

```js
import certificados from 'virtual:certifications';
// certificados = ['Crea experiencias 3D increíbles con Vue.png', ...]
```

---

## Firebase Config

Ejemplo de configuración (reemplaza con tus propios datos):

```js
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.firebasestorage.app",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};
```

Colección Firestore: `comments`.

---

## Certificados (25)

Lista completa de certificaciones en `public/certificadosyreconocimientos/`:

1. Crea experiencias 3D increíbles con Vue.png
2. Crea una PWA de Detección de Objetos con Angular 19 y TensorFlow js.png
3. Curso de Astro y Headless CMS.png
4. Curso de Tailwind desde Cero.png
5. Curso Intensivo de Model Context Protocol.png
6. Desarrollo Web con IA.png
7. Enterprise Full Stack with Spring Boot 4 and Angular 21.png
8. Figma para Devs.png
9. Frontend Developer (React).png
10. Fullstack Application Dev.png
11. Fundamentos de ChatGPT.png
12. Fundamentos de Scrum.png
13. GSAP desde Cero.png
14. Introducción a los Sistemas de Diseño.png
15. Introducción a la IA para Developers.png
16. Introducción a la ingeniería en AI.png
17. Introduction to Modern AI.png
18. JavaScript.png
19. Partner NDG Linux Unhatched.png
20. Prompting responsable maximiza la IA en tu negocio.png
21. Python Essentials 1.png
22. Qué hacemos realmente cuando hacemos Data Science.png
23. Spring Boot 4 y Java 25 Desarrolla APIs REST Profesionales.jpg
24. Taller GIT y GITHUB.jpeg
25. Utility Types en TypeScript.png

---

## Accesibilidad

- `prefers-reduced-motion` respetado en: GhostCursor, PartyLights, Particles, ProfileLetterRain, WelcomeOverlay, EducationBadge, AboutSection
- `role="status"`, `aria-live="polite"`, `aria-busy="true"` en ContentLoader
- Navegación por teclado en menú hamburguesa (Escape para cerrar)
- Modales con `<dialog>` (Escape para cerrar)

---

## Scripts Disponibles

| Script | Comando | Descripción |
|---|---|---|
| dev | `vite` | Servidor de desarrollo |
| build | `vite build` | Build producción |
| preview | `vite preview` | Vista previa del build |
| start | `electron main.cjs` | Abrir en Electron |
| dist | `electron-builder` | Empaquetar instalador Windows |
| lint | `eslint .` | Análisis de código |

---

## Autor

**Arturo Juárez Monroy**

| Canal | Enlace |
|---|---|
| GitHub | [ArturoJM0A1](https://github.com/ArturoJM0A1) |
| LinkedIn | [arturojuarezmonroy](https://www.linkedin.com/in/arturojuarezmonroy) |
| YouTube | [Arturo Juarez Monroy](https://www.youtube.com/@arturojuarezmonroy3951) |
| Correo | juarezmonroyarturo574@gmail.com |
| WhatsApp | +52 1 773 680 2105 |
| Web | [https://arturojuarezmonroy.vercel.app](https://arturojuarezmonroy.vercel.app) |
