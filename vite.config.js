// =============================================
// vite.config.js - Vite Yapılandırması
// =============================================
// base: GitHub Pages'de doğru çalışması için
// repo adını buraya yazman gerekiyor.
// Örnek: "/todo-app/" eğer repo adın todo-app ise
// =============================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // GitHub Pages için önemli!
  // GitHub Pages URL'i: https://kullaniciadi.github.io/REPO_ADI/
  // base değeri = "/REPO_ADI/"
  base: "/wep05-06.2026/",
});
