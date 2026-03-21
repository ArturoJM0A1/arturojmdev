import { createHashRouter } from "react-router-dom";
import PortfolioLayout from "./layouts/PortfolioLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import SkillsPage from "./pages/SkillsPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import CertificationsPage from "./pages/CertificationsPage.jsx";
import CommentsPage from "./pages/CommentsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export const router = createHashRouter([
  {
    path: "/",
    element: <PortfolioLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "sobre-mi",
        element: <AboutPage />,
      },
      {
        path: "habilidades",
        element: <SkillsPage />,
      },
      {
        path: "proyectos",
        element: <ProjectsPage />,
      },
      {
        path: "certificaciones",
        element: <CertificationsPage />,
      },
      {
        path: "comentarios",
        element: <CommentsPage />,
      },
      {
        path: "contacto",
        element: <ContactPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
