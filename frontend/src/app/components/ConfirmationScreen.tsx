import { Button } from "./ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";

interface ConfirmationScreenProps {
  selectedService: {
    title: string;
    description: string;
  };
  remainingBudget: number;
  onReset: () => void;
}

export function ConfirmationScreen({
  selectedService,
  remainingBudget,
  onReset,
}: ConfirmationScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-2xl w-full text-center space-y-8">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />

        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl text-green-700">Fertig!</h2>
          <p className="text-2xl text-gray-700">
            Wir melden uns innerhalb von 48h bei dir.
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-green-200 p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Deine Wahl:</p>
              <p className="text-2xl text-gray-900">{selectedService.title}</p>
              <p className="text-lg text-gray-600 mt-2">{selectedService.description}</p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">Verbleibendes Budget:</p>
              <p className="text-3xl text-blue-700">{remainingBudget}€</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 space-y-4">
          <p className="text-xl text-gray-700">Fragen?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+4930123456789"
              className="flex items-center gap-2 text-lg text-blue-600 hover:text-blue-700"
            >
              <Phone className="w-5 h-5" />
              030 123 456 789
            </a>
            <a
              href="mailto:hilfe@pflegeleicht.de"
              className="flex items-center gap-2 text-lg text-blue-600 hover:text-blue-700"
            >
              <Mail className="w-5 h-5" />
              hilfe@pflegeleicht.de
            </a>
          </div>
        </div>

        <Button
          onClick={onReset}
          variant="outline"
          className="mt-8"
        >
          Neue Leistung auswählen
        </Button>
      </div>
    </div>
  );
}
