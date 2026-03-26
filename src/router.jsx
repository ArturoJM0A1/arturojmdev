import { Suspense, lazy } from "react";
import { createHashRouter } from "react-router-dom";
import PortfolioLayout from "./layouts/PortfolioLayout.jsx";
import ContentLoader from "./components/ContentLoader.jsx";
import "tailwindcss";
import "tailwind-animations";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const CurrentlyPage = lazy(() => import("./pages/CurrentlyPage.jsx"));
const SkillsPage = lazy(() => import("./pages/SkillsPage.jsx"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage.jsx"));
const CertificationsPage = lazy(() => import("./pages/CertificationsPage.jsx"));
const CommentsPage = lazy(() => import("./pages/CommentsPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

function withLoader(Component, label, caption) {
  return (
    <Suspense fallback={<ContentLoader label={label} caption={caption} />}>
      <Component />
    </Suspense>
  );
}

export const router = createHashRouter([
  {
    path: "/",
    element: <PortfolioLayout />,
    children: [
      {
        index: true,
        element: withLoader(
          HomePage,
          "Cargando inicio",
          "Montando la vista principal del portafolio..."
        ),
      },
      {
        path: "sobre-mi",
        element: withLoader(
          AboutPage,
          "Cargando perfil",
          "Organizando la informacion personal y academica..."
        ),
      },
      {
        path: "habilidades",
        element: withLoader(
          SkillsPage,
          "Cargando habilidades",
          "Sincronizando la seccion tecnica y profesional..."
        ),
      },
      {
        path: "actualmente",
        element: withLoader(
          CurrentlyPage,
          "Cargando actualmente",
          "Preparando la bitacora visual de enfoque actual..."
        ),
      },
      {
        path: "proyectos",
        element: withLoader(
          ProjectsPage,
          "Cargando proyectos",
          "Preparando demos, enlaces y material destacado..."
        ),
      },
      {
        path: "certificaciones",
        element: withLoader(
          CertificationsPage,
          "Cargando certificaciones",
          "Reuniendo constancias y reconocimientos..."
        ),
      },
      {
        path: "comentarios",
        element: withLoader(
          CommentsPage,
          "Cargando comentarios",
          "Abriendo el espacio de retroalimentacion..."
        ),
      },
      {
        path: "contacto",
        element: withLoader(
          ContactPage,
          "Cargando contacto",
          "Activando canales para conectar contigo..."
        ),
      },
      {
        path: "*",
        element: withLoader(
          NotFoundPage,
          "Cargando pagina",
          "Resolviendo la ruta solicitada..."
        ),
      },
    ],
  },
]);
