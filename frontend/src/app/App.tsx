import { useState } from "react";
import { LandingScreen } from "./components/LandingScreen";
import { PersonalDataConfirm } from "./components/PersonalDataConfirm";
import { ServiceSelectionShop } from "./components/ServiceSelectionShop";
import { ServiceSelectionSimple } from "./components/ServiceSelectionSimple";
import { ConfirmationScreen } from "./components/ConfirmationScreen";
import { Button } from "./components/ui/button";
import { LayoutGrid, List } from "lucide-react";

type Step = "landing" | "confirm" | "service" | "done";
type ViewMode = "shop" | "simple";

interface Service {
  id: string;
  title: string;
  description: string;
  cost: number;
  monthlyPrice: number;
}

export default function App() {
  const [step, setStep] = useState<Step>("landing");
  const [viewMode, setViewMode] = useState<ViewMode>("shop");
  const [pflegegrad, setPflegegrad] = useState<number>(0);
  const [userData, setUserData] = useState({ name: "", address: "" });
  const [totalBudget] = useState(185);
  const [remainingBudget, setRemainingBudget] = useState(185);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const handleGradeConfirm = (grade: number) => {
    setPflegegrad(grade);
    setStep("confirm");
  };

  const handleDataConfirm = (data: { name: string; address: string }) => {
    setUserData(data);
    setStep("service");
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedServices([...selectedServices, service]);
    setRemainingBudget(remainingBudget - service.cost);
  };

  const handleServiceRemove = (serviceId: string) => {
    const service = selectedServices.find((s) => s.id === serviceId);
    if (service) {
      setSelectedServices(selectedServices.filter((s) => s.id !== serviceId));
      setRemainingBudget(remainingBudget + service.cost);
    }
  };

  const handleFinish = () => {
    setStep("done");
  };

  const handleReset = () => {
    setSelectedServices([]);
    setRemainingBudget(totalBudget);
    setStep("landing");
  };

  return (
    <div className="min-h-screen">
      {step === "landing" && <LandingScreen onContinue={handleGradeConfirm} />}

      {step === "confirm" && (
        <PersonalDataConfirm grade={pflegegrad} onConfirm={handleDataConfirm} />
      )}

      {step === "service" && (
        <div className="relative">
          <div className="fixed top-20 right-6 z-20 bg-white rounded-lg shadow-lg p-2 flex gap-2">
            <Button
              variant={viewMode === "shop" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("shop")}
              className="gap-2"
            >
              <LayoutGrid className="w-4 h-4" />
              Kacheln
            </Button>
            <Button
              variant={viewMode === "simple" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("simple")}
              className="gap-2"
            >
              <List className="w-4 h-4" />
              Einfach
            </Button>
          </div>

          {viewMode === "shop" ? (
            <ServiceSelectionShop
              totalBudget={totalBudget}
              remainingBudget={remainingBudget}
              selectedServices={selectedServices}
              onSelectService={handleServiceSelect}
              onRemoveService={handleServiceRemove}
              onFinish={handleFinish}
            />
          ) : (
            <ServiceSelectionSimple
              totalBudget={totalBudget}
              remainingBudget={remainingBudget}
              selectedServices={selectedServices}
              onSelectService={handleServiceSelect}
              onRemoveService={handleServiceRemove}
              onFinish={handleFinish}
            />
          )}
        </div>
      )}

      {step === "done" && (
        <ConfirmationScreen
          selectedService={selectedServices[0] || { title: "", description: "" }}
          remainingBudget={remainingBudget}
          onReset={handleReset}
        />
      )}
    </div>
  );
}