import { Button } from "./ui/button";
import { Check, ChevronRight } from "lucide-react";
import { Footer } from "./Footer";
import { ServiceData } from "../data/services";

interface Service {
  id: string;
  title: string;
  description: string;
  cost: number;
  monthlyPrice: number;
  pricePerHour: number;
  hours: number;
}

interface ServiceSelectionSimpleProps {
  totalBudget: number;
  remainingBudget: number;
  services: ServiceData[];
  isLoadingServices: boolean;
  servicesError: string | null;
  selectedServices: Service[];
  onSelectService: (service: Service) => void;
  onRemoveService: (serviceId: string) => void;
  onFinish: () => void;
}

export function ServiceSelectionSimple({
  totalBudget,
  remainingBudget,
  services,
  isLoadingServices,
  servicesError,
  selectedServices,
  onSelectService,
  onRemoveService,
  onFinish,
}: ServiceSelectionSimpleProps) {
  const HOURS_PER_MONTH = 2; // 1 Stunde alle 2 Wochen = 2 Stunden pro Monat

  const isServiceSelected = (serviceId: string) =>
    selectedServices.some((s) => s.id === serviceId);
  const isOverBudget = remainingBudget < 0;

  const handleSelectService = (serviceData: ServiceData) => {
    const monthlyPrice = serviceData.pricePerHour * HOURS_PER_MONTH;

    const service: Service = {
      id: serviceData.id,
      title: serviceData.title,
      description: serviceData.description,
      cost: monthlyPrice,
      monthlyPrice: monthlyPrice,
      pricePerHour: serviceData.pricePerHour,
      hours: HOURS_PER_MONTH,
    };

    onSelectService(service);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Budget Display */}
      <div className="bg-white border-b shadow-sm sticky top-[165px] sm:top-[150px] md:top-[90px] z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl text-teal-900">Was brauchst du?</h2>
            <p className="text-sm text-gray-600 mt-1 font-bold">Alle Preise basieren auf 1 Stunde alle zwei Wochen</p>
          </div>
          <div className="text-left sm:text-right rounded-lg px-4 sm:px-6 py-3 border bg-teal-50 border-teal-200">
            <div className="text-xs text-gray-600 uppercase mb-1">Dein Budget pro monat</div>
            <div className="text-2xl sm:text-3xl text-teal-700">
              {remainingBudget.toFixed(2)} €
            </div>
            <div className="text-xs text-gray-500">von {totalBudget.toFixed(2)} €</div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4">
        {isLoadingServices && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-gray-600">
            Lade Leistungen...
          </div>
        )}

        {!isLoadingServices && servicesError && (
          <div className="bg-orange-50 rounded-lg border border-orange-300 p-6 text-orange-900">
            {servicesError}
          </div>
        )}

        {!isLoadingServices && !servicesError && services.map((serviceData) => {
          const selected = isServiceSelected(serviceData.id);
          const monthlyPrice = serviceData.pricePerHour * HOURS_PER_MONTH;
          const Icon = serviceData.icon;

          return (
            <div
              key={serviceData.id}
              className={`bg-white rounded-lg border-2 p-4 sm:p-6 transition-all ${
                selected
                  ? "border-green-500 shadow-lg"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg flex-shrink-0 ${
                    selected ? "bg-green-100 text-green-700" : "bg-teal-100 text-teal-700"
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-900 mb-2">{serviceData.title}</p>
                    <p className="text-sm text-gray-600 mb-3">{serviceData.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
                  <div className="text-left md:text-right">
                    <div className="text-xl sm:text-2xl text-teal-700">{monthlyPrice.toFixed(2)} €</div>
                    <div className="text-xs text-gray-500">/ Monat</div>
                  </div>
                  {selected ? (
                    <Button
                      onClick={() => onRemoveService(serviceData.id)}
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50 gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Ausgewählt
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSelectService(serviceData)}
                      className="bg-teal-600 hover:bg-teal-700 w-full md:w-auto"
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl text-gray-900 mb-1">
                  {selectedServices.length} Leistung{selectedServices.length > 1 ? "en" : ""}{" "}
                  ausgewählt
                </h3>
                <p className="text-sm text-gray-600">
                  Wir organisieren das für dich. Rückmeldung in 48h.
                </p>
              </div>
              <Button onClick={onFinish} size="lg" className="bg-teal-600 hover:bg-teal-700 gap-2 w-full md:w-auto">
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
