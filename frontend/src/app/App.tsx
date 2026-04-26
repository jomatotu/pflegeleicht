import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { UploadPage } from "./pages/UploadPage";
import { ResultPage } from "./pages/ResultPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ScrollToTop } from "./components/ScrollToTop";
import {ConfirmationPage} from "./pages/ConfirmationPage";
import {ReadyPage} from "./pages/ReadyPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="fixed top-0 left-0 w-full z-50 bg-red-600 text-white text-center font-bold py-2 text-sm tracking-wide shadow-md">
        ⚠️ DEMO-SYSTEM – Diese Seite dient ausschließlich zu Demonstrationszwecken ⚠️
           Bitte keinen echten Daten eingeben / hochladen.
      </div>
      <div className="pt-10">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/ready" element={<ReadyPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}