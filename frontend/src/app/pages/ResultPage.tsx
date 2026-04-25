import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { CheckCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [consentGiven, setConsentGiven] = useState(false);
  const grade = (location.state as { grade?: number | string } | null)?.grade;
  const parsedGrade =
    typeof grade === "number"
      ? grade
      : typeof grade === "string"
        ? parseInt(grade, 10)
        : NaN;

  useEffect(() => {
    if (Number.isNaN(parsedGrade)) {
      navigate("/");
    }
  }, [parsedGrade, navigate]);

  const handleContinue = () => {
    if (!Number.isNaN(parsedGrade)) {
      navigate("/services", { state: { grade: parsedGrade } });
    }
  };

  if (Number.isNaN(parsedGrade)) {
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
          <div className="bg-white rounded-2xl border-2 border-teal-200 shadow-lg px-[32px] py-[5px]">
            <div className="text-center space-y-6 p-[0px]">
              <p className="text-xl text-gray-700 px-[0px] py-[5px]">Pflegegrad erkannt:</p>
              <div className="flex items-center justify-center gap-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <p className="text-6xl text-green-700 font-bold">Pflegegrad {parsedGrade}</p>
              </div>
              <p className="text-lg text-gray-600 mt-4">
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
                className="w-full max-w-md h-14 text-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 mx-[0px] my-[10px]"
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
