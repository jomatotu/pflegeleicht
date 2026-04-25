import { Button } from "./ui/button";
import { Home, Users, ShoppingBag, Heart, Check, ChevronRight } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  cost: number;
  monthlyPrice: number;
}

interface ServiceSelectionShopProps {
  totalBudget: number;
  remainingBudget: number;
  selectedServices: Service[];
  onSelectService: (service: Service) => void;
  onRemoveService: (serviceId: string) => void;
  onFinish: () => void;
}

const SERVICES: Service[] = [
  {
    id: "household",
    title: "Haushaltshilfe & Alltagsbegleitung",
    description: "Nutzen Sie eine Privatperson für Unterstützung im Haushalt, beim Einkaufen oder bei Begleitung zu Terminen. Zahlreiche Helfer können direkt zu Ihnen kommen.",
    icon: <Home className="w-8 h-8" />,
    cost: 125,
    monthlyPrice: 125,
  },
  {
    id: "companion",
    title: "Seniorenbegleitung",
    description: "Gesellschaft leisten, Gespräche führen, gemeinsam Zeit verbringen",
    icon: <Users className="w-8 h-8" />,
    cost: 80,
    monthlyPrice: 80,
  },
  {
    id: "shopping",
    title: "Einkaufsservice",
    description: "Wöchentlicher Einkauf mit Lieferung nach Hause",
    icon: <ShoppingBag className="w-8 h-8" />,
    cost: 60,
    monthlyPrice: 60,
  },
  {
    id: "care",
    title: "Pflegebegleitung",
    description: "Unterstützung bei täglichen Aufgaben und Körperpflege",
    icon: <Heart className="w-8 h-8" />,
    cost: 100,
    monthlyPrice: 100,
  },
];

export function ServiceSelectionShop({
  totalBudget,
  remainingBudget,
  selectedServices,
  onSelectService,
  onRemoveService,
  onFinish,
}: ServiceSelectionShopProps) {
  const isServiceSelected = (serviceId: string) =>
    selectedServices.some((s) => s.id === serviceId);

  const canAfford = (cost: number) => remainingBudget >= cost;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Budget */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-gray-900">Verfügbare Leistungen für Sie</h2>
            <p className="text-sm text-gray-600">
              Basierend auf Ihrem Pflegegrad stehen Ihnen die folgenden gesetzlichen Leistungen zu.
            </p>
          </div>
          <div className="text-right bg-blue-50 rounded-lg px-6 py-3 border border-blue-200">
            <div className="text-xs text-gray-600 uppercase mb-1">Ihr monatliches Budget</div>
            <div className="text-3xl text-blue-700">{remainingBudget.toFixed(2)} €</div>
            <div className="text-xs text-gray-500">von {totalBudget.toFixed(2)} € Gesamtanspruch</div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      selected ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg text-gray-900">{service.title}</h3>
                      <div className="text-right">
                        <div className="text-xl text-blue-700">{service.monthlyPrice.toFixed(2)} €</div>
                        <div className="text-xs text-gray-500">/ Monat</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Gesetzliche Betreuung: 100% verfügbar</span>
                  </div>
                  {service.id === "household" && (
                    <div className="bg-blue-50 rounded p-3 mt-2">
                      <p className="text-xs text-blue-900 mb-1">Anbieter gefunden</p>
                      <p className="text-sm text-blue-700">PflegeHeros! Marktplatz GmbH</p>
                      <p className="text-xs text-gray-600">Poststraße 14/15M</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                        <span>Dienstag, 22. Okt</span>
                        <span>10:00 Uhr</span>
                      </div>
                    </div>
                  )}
                </div>

                {selected ? (
                  <Button
                    onClick={() => onRemoveService(service.id)}
                    variant="outline"
                    className="w-full h-12 mt-4 border-green-600 text-green-700 hover:bg-green-50"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Ausgewählt
                  </Button>
                ) : (
                  <Button
                    onClick={() => onSelectService(service)}
                    disabled={!affordable}
                    className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {affordable ? "Auswählen" : "Budget nicht ausreichend"}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

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
                  Wir kümmern uns um alles Weitere und melden uns innerhalb von 48 Stunden
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
