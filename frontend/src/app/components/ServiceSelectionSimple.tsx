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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Budget Display */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm sticky top-[80px] z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl text-teal-900 dark:text-teal-300">Was brauchst du?</h2>
          <div className="text-right rounded-lg px-6 py-3 border bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase mb-1">Dein Budget pro monat</div>
            <div className="text-3xl text-teal-700 dark:text-teal-400">
              {remainingBudget.toFixed(2)} €
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">von {totalBudget.toFixed(2)} €</div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="flex-1 max-w-4xl mx-auto px-6 py-8 space-y-4">
        {isLoadingServices && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-gray-600 dark:text-gray-400">
            Lade Leistungen...
          </div>
        )}

        {!isLoadingServices && servicesError && (
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-300 dark:border-orange-700 p-6 text-orange-900 dark:text-orange-300">
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
              className={`bg-white dark:bg-gray-800 rounded-lg border-2 p-6 transition-all ${
                selected
                  ? "border-green-500 shadow-lg"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg flex-shrink-0 ${
                    selected ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400"
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xl md:text-2xl text-gray-900 dark:text-gray-100 mb-2">{serviceData.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{serviceData.description}</p>

                    <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg px-4 py-2 inline-block">
                      <p className="text-sm text-teal-800 dark:text-teal-300">
                        1 Stunde alle zwei Wochen · {serviceData.pricePerHour} € / Stunde
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <div className="text-right">
                    <div className="text-2xl text-teal-700 dark:text-teal-400">{monthlyPrice.toFixed(2)} €</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">/ Monat</div>
                  </div>
                  {selected ? (
                    <Button
                      onClick={() => onRemoveService(serviceData.id)}
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Ausgewählt
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSelectService(serviceData)}
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
            isOverBudget ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800" : "bg-white dark:bg-gray-800 border-teal-200 dark:border-teal-800"
          }`}>
            {isOverBudget && (
              <div className="mb-4 p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg border border-orange-300 dark:border-orange-700">
                <p className="text-sm text-orange-900 dark:text-orange-300 font-medium mb-1">
                  ⚠️ Budget überschritten
                </p>
                <p className="text-sm text-orange-800 dark:text-orange-400">
                  Die gewählten Leistungen übersteigen dein Pflegebudget um{" "}
                  <span className="font-bold">{Math.abs(remainingBudget).toFixed(2)} €</span> pro Monat.
                  Diesen Betrag musst du selbst bezahlen.
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl text-gray-900 dark:text-gray-100 mb-1">
                  {selectedServices.length} Leistung{selectedServices.length > 1 ? "en" : ""}{" "}
                  ausgewählt
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
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
