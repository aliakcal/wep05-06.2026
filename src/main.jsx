// =============================================
// main.jsx - Uygulamanın Başlangıç Noktası
// =============================================
// React ve Bootstrap burada import edilir.
// Bu dosya index.html içindeki #root div'ine
// React uygulamasını bağlar.
// =============================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Bootstrap CSS - tüm Bootstrap stilleri burada yüklenir
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";

// #root div'ini bul ve React uygulamasını bağla
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
