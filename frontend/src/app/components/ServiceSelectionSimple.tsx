import { Button } from "./ui/button";
import { Check, ChevronRight, MessageCircle, ShoppingCart, Sparkles, ChefHat, Stethoscope, Home } from "lucide-react";
import logo from "../../imports/image.png";
import { Footer } from "./Footer";

interface Service {
  id: string;
  title: string;
  description: string;
  cost: number;
  monthlyPrice: number;
  icon: React.ReactNode;
}

interface ServiceSelectionSimpleProps {
  totalBudget: number;
  remainingBudget: number;
  selectedServices: Service[];
  onSelectService: (service: Service) => void;
  onRemoveService: (serviceId: string) => void;
  onFinish: () => void;
}

const SERVICES: Service[] = [
  {
    id: "cleaning",
    title: "Ich brauche Hilfe beim Putzen.",
    description: "Haushaltshilfe - Reinigung und Ordnung",
    cost: 125,
    monthlyPrice: 125,
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    id: "shopping",
    title: "Ich brauche Hilfe beim Einkaufen.",
    description: "Einkaufsservice - Begleitung oder Lieferung",
    cost: 60,
    monthlyPrice: 60,
    icon: <ShoppingCart className="w-8 h-8" />,
  },
  {
    id: "doctor",
    title: "Ich brauche Begleitung zum Arzt.",
    description: "Alltagsbegleitung - Arztbesuche und Termine",
    cost: 50,
    monthlyPrice: 50,
    icon: <Stethoscope className="w-8 h-8" />,
  },
  {
    id: "cooking",
    title: "Ich brauche Hilfe beim Kochen.",
    description: "Haushaltshilfe - Mahlzeiten Zubereitung",
    cost: 70,
    monthlyPrice: 70,
    icon: <ChefHat className="w-8 h-8" />,
  },
  {
    id: "talk",
    title: "Ich brauche jemanden, der mit mir redet.",
    description: "Alltagsbegleitung - Gesellschaft und Gespräche",
    cost: 80,
    monthlyPrice: 80,
    icon: <MessageCircle className="w-8 h-8" />,
  },
  {
    id: "allround",
    title: "Ich brauche Einzelbetreuung zuhause.",
    description: "Persönliche Betreuung - Individuelle Unterstützung nach Ihren Bedürfnissen",
    cost: 131,
    monthlyPrice: 131,
    icon: <Home className="w-8 h-8" />,
  },
];

export function ServiceSelectionSimple({
  totalBudget,
  remainingBudget,
  selectedServices,
  onSelectService,
  onRemoveService,
  onFinish,
}: ServiceSelectionSimpleProps) {
  const isServiceSelected = (serviceId: string) =>
    selectedServices.some((s) => s.id === serviceId);

  const usedBudget = totalBudget - remainingBudget;
  const isOverBudget = remainingBudget < 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Budget Display */}
      <div className="bg-white border-b shadow-sm sticky top-[80px] z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl text-teal-900">Was brauchst du?</h2>
          <div className={`text-right rounded-lg px-6 py-3 border ${
            isOverBudget
              ? "bg-orange-50 border-orange-200"
              : "bg-teal-50 border-teal-200"
          }`}>
            <div className="text-xs text-gray-600 uppercase mb-1">Dein Budget pro monat</div>
            <div className={`text-3xl ${isOverBudget ? "text-orange-700" : "text-teal-700"}`}>
              {remainingBudget.toFixed(2)} €
            </div>
            <div className="text-xs text-gray-500">von {totalBudget.toFixed(2)} €</div>
            {isOverBudget && (
              <div className="mt-2 pt-2 border-t border-orange-300">
                <div className="text-xs text-orange-700 font-medium">Eigenbeteiligung:</div>
                <div className="text-lg text-orange-700">{Math.abs(remainingBudget).toFixed(2)} € / Monat</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="flex-1 max-w-4xl mx-auto px-6 py-8 space-y-4">
        {SERVICES.map((service) => {
          const selected = isServiceSelected(service.id);

          return (
            <div
              key={service.id}
              className={`bg-white rounded-lg border-2 p-6 transition-all ${
                selected
                  ? "border-green-500 shadow-lg"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg flex-shrink-0 ${
                    selected ? "bg-green-100 text-green-700" : "bg-teal-100 text-teal-700"
                  }`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xl md:text-2xl text-gray-900 mb-2">{service.title}</p>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl text-teal-700">{service.monthlyPrice.toFixed(2)} €</div>
                    <div className="text-xs text-gray-500">/ Monat</div>
                  </div>
                  {selected ? (
                    <Button
                      onClick={() => onRemoveService(service.id)}
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50 gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Ausgewählt
                    </Button>
                  ) : (
                    <Button
                      onClick={() => onSelectService(service)}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Auswählen
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Finish Button */}
        {selectedServices.length > 0 && (
          <div className={`mt-8 rounded-lg border-2 p-6 ${
            isOverBudget ? "bg-orange-50 border-orange-200" : "bg-white border-teal-200"
          }`}>
            {isOverBudget && (
              <div className="mb-4 p-4 bg-orange-100 rounded-lg border border-orange-300">
                <p className="text-sm text-orange-900 font-medium mb-1">
                  ⚠️ Budget überschritten
                </p>
                <p className="text-sm text-orange-800">
                  Die gewählten Leistungen übersteigen dein Pflegebudget um{" "}
                  <span className="font-bold">{Math.abs(remainingBudget).toFixed(2)} €</span> pro Monat.
                  Diesen Betrag musst du selbst bezahlen.
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl text-gray-900 mb-1">
                  {selectedServices.length} Leistung{selectedServices.length > 1 ? "en" : ""}{" "}
                  ausgewählt
                </h3>
                <p className="text-sm text-gray-600">
                  Wir organisieren das für dich. Rückmeldung in 48h.
                </p>
              </div>
              <Button onClick={onFinish} size="lg" className="bg-teal-600 hover:bg-teal-700 gap-2">
                Fertig - Alles regeln lassen
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
