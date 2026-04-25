import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { CheckCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function ResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [consentGiven, setConsentGiven] = useState(false);
  const grade = searchParams.get("grade");

  useEffect(() => {
    if (!grade) {
      navigate("/");
    }
  }, [grade, navigate]);

  const handleContinue = () => {
    if (grade) {
      navigate(`/services?grade=${grade}`);
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

      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-2xl border-2 border-teal-200 p-8 shadow-lg">
            <div className="text-center space-y-6 py-8">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
              <div className="space-y-2">
                <p className="text-xl text-gray-700">Pflegegrad erkannt:</p>
                <p className="text-6xl text-green-700 font-bold">Pflegegrad {grade}</p>
                <p className="text-lg text-gray-600 mt-4">
                  Willkommen zurück! Wir haben deinen Bescheid erfolgreich ausgewertet.
                </p>
              </div>

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
                onClick={handleContinue}
                disabled={!consentGiven}
                size="lg"
                className="w-full max-w-md h-14 text-lg bg-teal-600 hover:bg-teal-700 mt-8 disabled:opacity-50"
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
