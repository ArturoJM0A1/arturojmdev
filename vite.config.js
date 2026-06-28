import { readdirSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const virtualCertificationModuleId = "virtual:certifications";
const resolvedCertificationModuleId = `\0${virtualCertificationModuleId}`;
const certificationDirectory = path.resolve(
  __dirname,
  "public/certificadosyreconocimientos",
);
const allowedImageExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".gif",
  ".svg",
]);

function getCertificationFiles() {
  try {
    const entries = readdirSync(certificationDirectory, { withFileTypes: true });
    const result = {};

    const categoryOrder = [
      "Frontend",
      "Backend",
      "Full Stack",
      "DevOps y Herramientas",
      "Metodologías",
      "Inteligencia Artificial",
      "Ciencia de Datos",
      "Diseño UX-UI",
      "Lenguajes",
    ];

    const subdirectories = entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .sort((left, right) => {
        const leftIdx = categoryOrder.indexOf(left);
        const rightIdx = categoryOrder.indexOf(right);
        return (leftIdx === -1 ? 999 : leftIdx) - (rightIdx === -1 ? 999 : rightIdx);
      });

    for (const dir of subdirectories) {
      const dirPath = path.join(certificationDirectory, dir);
      const files = readdirSync(dirPath, { withFileTypes: true })
        .filter((entry) => {
          const extension = path.extname(entry.name).toLowerCase();
          return (
            entry.isFile() &&
            !entry.name.startsWith(".") &&
            allowedImageExtensions.has(extension)
          );
        })
        .map((entry) => entry.name)
        .sort((left, right) =>
          left.localeCompare(right, "es", { numeric: true, sensitivity: "base" }),
        );

      if (files.length > 0) {
        result[dir] = files;
      }
    }

    return result;
  } catch {
    return {};
  }
}

function certificationsPlugin() {
  return {
    name: "certifications-plugin",
    resolveId(id) {
      if (id === virtualCertificationModuleId) {
        return resolvedCertificationModuleId;
      }

      return null;
    },
    load(id) {
      if (id !== resolvedCertificationModuleId) {
        return null;
      }
      return `export default ${JSON.stringify(getCertificationFiles())};`;
    },
    handleHotUpdate({ file, server }) {
      if (!file.startsWith(certificationDirectory)) {
        return;
      }

      server.ws.send({ type: "full-reload" });
      return [];
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), certificationsPlugin()],
  base: "./",
});
