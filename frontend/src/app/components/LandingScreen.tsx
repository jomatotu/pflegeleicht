import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Upload, CheckCircle } from "lucide-react";
import logo from "../../imports/image.png";
import { Footer } from "./Footer";

interface LandingScreenProps {
  onContinue: (grade: number) => void;
}

export function LandingScreen({ onContinue }: LandingScreenProps) {
  const [uploaded, setUploaded] = useState(false);
  const [grade, setGrade] = useState<number | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);

  const handleFileUpload = () => {
    // Simulate document scan
    setTimeout(() => {
      const mockGrade = 3; // Simulate detected grade
      setGrade(mockGrade);
      setUploaded(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-4">
          
          
        </div>

        <div className="bg-white rounded-2xl border-2 border-teal-200 p-8 shadow-lg space-y-6">
          {!uploaded ? (
            <>
              <h2 className="text-2xl text-center text-teal-900">Laden Sie Ihren Pflegegutachten hoch.</h2>
              <label className="flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-teal-300 rounded-xl cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-all">
                <Upload className="w-20 h-20 text-teal-500 mb-4" />
                <span className="text-lg text-teal-700 mb-2">Datei auswählen</span>
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
                  Willkommen zurück! Wir haben deinen Bescheid erfolgreich ausgewertet.
                </p>
              </div>

              {/* Abtretungserklärung */}
              <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-6 text-left space-y-4 max-w-2xl mx-auto mt-6">
                <h3 className="text-lg text-teal-900 font-medium">Abtretungserklärung</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Damit wir in deinem Namen mit deiner Pflegekasse abrechnen können, benötigen wir
                  deine Zustimmung. Du erteilst uns hiermit die Erlaubnis, die Leistungen des
                  Entlastungsbetrags nach § 45b SGB XI in deinem Namen bei deiner Pflegekasse
                  geltend zu machen und direkt abzurechnen.
                </p>
                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    id="consent"
                    checked={consentGiven}
                    onCheckedChange={(checked) => setConsentGiven(checked === true)}
                    className="mt-1"
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-gray-900 leading-relaxed cursor-pointer"
                  >
                    Ich erteile die Abtretungserklärung und erlaube PflegeLeicht, in meinem Namen
                    mit meiner Pflegekasse abzurechnen. Ich kann diese Erklärung jederzeit
                    widerrufen.
                  </label>
                </div>
              </div>

              <Button
                onClick={() => grade && onContinue(grade)}
                disabled={!consentGiven}
                size="lg"
                className="w-full max-w-md h-14 text-lg bg-teal-600 hover:bg-teal-700 mt-8 disabled:opacity-50"
              >
                Weiter zu den Leistungen
              </Button>
            </div>
          )}
        </div>

        {!uploaded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-teal-50 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-teal-900 mb-1">
                  Datenschutz garantiert
                </h3>
                <p className="text-xs text-gray-600">
                  Ihre Daten werden verschlüsselt und nur zur
                  Leistungserbringung verwendet.
                </p>
              </div>
            </div>
            <div className="bg-teal-50 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
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
              <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
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
        )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
