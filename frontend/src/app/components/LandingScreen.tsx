import { useState } from "react";
import { Button } from "./ui/button";
import { Upload, CheckCircle } from "lucide-react";

interface LandingScreenProps {
  onContinue: (grade: number) => void;
}

export function LandingScreen({ onContinue }: LandingScreenProps) {
  const [uploaded, setUploaded] = useState(false);
  const [grade, setGrade] = useState<number | null>(null);

  const handleFileUpload = () => {
    // Simulate document scan
    setTimeout(() => {
      const mockGrade = 3; // Simulate detected grade
      setGrade(mockGrade);
      setUploaded(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl text-blue-900">
            Ihr Weg zur Pflege-Unterstützung
          </h1>
          <p className="text-xl text-gray-700">
            Laden Sie einfach Ihren Pflegegrad-Bescheid hoch. Unser System erkennt Ihre Ansprüche
            automatisch, damit Sie sofort die passende Hilfe erhalten.
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-blue-200 p-8 shadow-lg space-y-6">
          {!uploaded ? (
            <>
              <h2 className="text-2xl text-center text-blue-900">Dokument hierher ziehen</h2>
              <p className="text-center text-gray-600">
                Laden Sie Ihren Pflegegrad-Bescheid oder eine Vollmacht als PDF oder Foto hoch.
              </p>
              <label className="flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-blue-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                <Upload className="w-20 h-20 text-blue-500 mb-4" />
                <span className="text-lg text-blue-700 mb-2">Datei auswählen</span>
                <span className="text-sm text-gray-500">
                  Max. Dateigröße: 10MB (PDF, JPG, PNG)
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                />
              </label>
            </>
          ) : (
            <div className="text-center space-y-6 py-8">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
              <div className="space-y-2">
                <p className="text-xl text-gray-700">Pflegegrad erkannt:</p>
                <p className="text-6xl text-green-700 font-bold">Pflegegrad {grade}</p>
                <p className="text-lg text-gray-600 mt-4">
                  Willkommen zurück! Wir haben Ihren Bescheid erfolgreich ausgewertet.
                </p>
              </div>
              <Button
                onClick={() => grade && onContinue(grade)}
                size="lg"
                className="w-full max-w-md h-14 text-lg bg-blue-600 hover:bg-blue-700 mt-8"
              >
                Weiter zu den Leistungen
              </Button>
            </div>
          )}
        </div>

        {!uploaded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-blue-900 mb-1">
                  Datenschutz garantiert
                </h3>
                <p className="text-xs text-gray-600">
                  Ihre Daten werden nach deutschem Datenschutzstandard verschlüsselt und nur zur
                  Leistungserbringung verwendet.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-blue-900 mb-1">
                  Kein Bescheid zur Hand?
                </h3>
                <p className="text-xs text-gray-600">
                  Sie können auch eine Vollmacht hochladen oder unsere Berater direkt
                  kontaktieren.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
