import { Button } from "./ui/button";
import { Check, ChevronRight } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  cost: number;
  monthlyPrice: number;
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
    id: "talk",
    title: "Ich brauche jemanden, der mit mir redet.",
    description: "Alltagsbegleitung - Gesellschaft und Gespräche",
    cost: 80,
    monthlyPrice: 80,
  },
  {
    id: "shopping",
    title: "Ich brauche Hilfe beim Einkaufen.",
    description: "Einkaufsservice - Begleitung oder Lieferung",
    cost: 60,
    monthlyPrice: 60,
  },
  {
    id: "cleaning",
    title: "Ich brauche jemanden, der meine Wohnung putzt.",
    description: "Haushaltshilfe - Reinigung und Ordnung",
    cost: 125,
    monthlyPrice: 125,
  },
  {
    id: "cooking",
    title: "Ich brauche Hilfe beim Kochen.",
    description: "Haushaltshilfe - Mahlzeiten Zubereitung",
    cost: 70,
    monthlyPrice: 70,
  },
  {
    id: "doctor",
    title: "Ich brauche Begleitung zum Arzt.",
    description: "Alltagsbegleitung - Arztbesuche und Termine",
    cost: 50,
    monthlyPrice: 50,
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

  const canAfford = (cost: number) => remainingBudget >= cost;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Budget */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl text-gray-900">Was brauchst du?</h2>
          <div className="text-right bg-blue-50 rounded-lg px-6 py-3 border border-blue-200">
            <div className="text-xs text-gray-600 uppercase mb-1">Dein Budget</div>
            <div className="text-3xl text-blue-700">{remainingBudget.toFixed(2)} €</div>
            <div className="text-xs text-gray-500">von {totalBudget.toFixed(2)} €</div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
        {SERVICES.map((service) => {
          const selected = isServiceSelected(service.id);
          const affordable = canAfford(service.cost);

          return (
            <div
              key={service.id}
              className={`bg-white rounded-lg border-2 p-6 transition-all ${
                selected
                  ? "border-green-500 shadow-lg"
                  : affordable
                  ? "border-gray-200 hover:border-blue-300"
                  : "border-gray-200 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xl md:text-2xl text-gray-900 mb-2">{service.title}</p>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl text-blue-700">{service.monthlyPrice.toFixed(2)} €</div>
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
                      disabled={!affordable}
                      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    >
                      {affordable ? "Auswählen" : "Nicht verfügbar"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Finish Button */}
        {selectedServices.length > 0 && (
          <div className="mt-8 bg-white rounded-lg border-2 border-blue-200 p-6">
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
              <Button onClick={onFinish} size="lg" className="bg-blue-600 hover:bg-blue-700 gap-2">
                Fertig - Alles regeln lassen
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
