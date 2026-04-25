import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Upload } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function UploadPage() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);

      setTimeout(() => {
        const mockGrade = 3;
        navigate(`/result?grade=${mockGrade}`);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onHomeClick={() => navigate("/")}
        showHomeButton={false}
        showLoginButton={true}
        currentStep={1}
        showStepper={true}
        onLoginClick={() => {}}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-3xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl text-teal-900">
              Willkommen bei PflegeLeicht
            </h1>
            <p className="text-xl text-gray-600">
              Laden Sie Ihr Pflegegutachten hoch, um zu beginnen
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-teal-200 p-8 shadow-lg space-y-6">
            <h2 className="text-2xl text-center text-teal-900">
              Laden Sie Ihren Pflegegutachten hoch.
            </h2>

            <label className="flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-teal-300 rounded-xl cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-all">
              <Upload className="w-20 h-20 text-teal-500 mb-4" />
              <span className="text-lg text-teal-700 mb-2">
                {uploading ? "Wird hochgeladen..." : "Datei auswählen"}
              </span>
              <span className="text-sm text-gray-500">
                Max. Dateigröße: 10MB (PDF, JPG, PNG)
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-teal-50 rounded-lg p-4 flex items-start gap-3">
              <div className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1">✓</div>
              <div>
                <h3 className="text-sm font-medium text-teal-900 mb-1">
                  Datenschutz garantiert
                </h3>
                <p className="text-xs text-gray-600">
                  Ihre Daten werden verschlüsselt und nur zur Leistungserbringung verwendet.
                </p>
              </div>
            </div>
            <div className="bg-teal-50 rounded-lg p-4 flex items-start gap-3">
              <div className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1">✓</div>
              <div>
                <h3 className="text-sm font-medium text-teal-900 mb-1">
                  Fragen?
                </h3>
                <p className="text-xs text-gray-600">
                  Kein Problem – rufen Sie uns einfach an.
                </p>
              </div>
            </div>
            <div className="bg-teal-50 rounded-lg p-4 flex items-start gap-3">
              <div className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1">✓</div>
              <div>
                <h3 className="text-sm font-medium text-teal-900 mb-1">
                  Keine Möglichkeit fürs Hochladen?
                </h3>
                <p className="text-xs text-gray-600">
                  Schicken Sie das Gutachten bequem per Post an uns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
