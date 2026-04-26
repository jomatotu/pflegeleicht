import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { CheckCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [consentGiven, setConsentGiven] = useState(false);
  const pdfFile = (location.state as { pdfFile?: File } | null)?.pdfFile;
  const grade = (location.state as { grade?: number | string } | null)?.grade;
  const extractedData = (location.state as { extractedData?: Record<string, unknown> } | null)?.extractedData;

  useEffect(() => {
    if (!grade) {
      navigate("/");
    }
  }, [grade, navigate]);

  const handleContinue = () => {
    if (grade) {
      navigate(`/services`, { state: { pdfFile, grade, extractedData } });
    }
  };

  if (!grade) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onHomeClick={() => navigate("/")}
        showHomeButton={true}
        showLoginButton={false}
        currentStep={1}
        showStepper={true}
        onLoginClick={() => {}}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-2xl border-2 border-teal-200 shadow-lg px-4 py-4 sm:px-8 sm:py-6">
            <div className="text-center space-y-5 sm:space-y-6">
              <p className="text-lg sm:text-xl text-gray-700">Pflegegrad erkannt:</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-green-500" />
                <p className="text-3xl sm:text-4xl md:text-6xl text-green-700 font-bold">Pflegegrad {grade}</p>
              </div>
              <p className="text-base sm:text-lg text-gray-600 mt-4">
                Willkommen zurück! Wir haben deinen Bescheid erfolgreich ausgewertet.
              </p>

              <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-6 text-left space-y-4 max-w-2xl mx-auto mt-6">
                <h3 className="text-lg text-teal-900 font-medium">Abtretungserklärung</h3>
                <p className="text-sm text-gray-700 leading-relaxed">Damit wir in deinem Namen mit deiner Pflegekasse abrechnen können, benötigen wir deine Zustimmung.                </p>
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
                onClick={handleContinue}
                disabled={!consentGiven}
                size="lg"
                className="w-full max-w-md h-14 text-base sm:text-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 my-2"
              >
                Weiter zu den Leistungen
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
