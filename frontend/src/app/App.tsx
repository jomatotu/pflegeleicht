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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/ready" element={<ReadyPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}