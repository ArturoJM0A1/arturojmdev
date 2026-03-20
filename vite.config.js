import { readdirSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
    return readdirSync(certificationDirectory, { withFileTypes: true })
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
        left.localeCompare(right, "es", {
          numeric: true,
          sensitivity: "base",
        }),
      );
  } catch {
    return [];
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
  plugins: [react(), certificationsPlugin()],
  base: "./",
});
