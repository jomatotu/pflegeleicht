import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ServiceSelectionSimple } from "../components/ServiceSelectionSimple";
import { ConfirmationScreen } from "../components/ConfirmationScreen";
import { Header } from "../components/Header";

interface Service {
  id: string;
  title: string;
  description: string;
  cost: number;
  monthlyPrice: number;
  pricePerHour: number;
  hours: number;
}

export function ServicesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const grade = searchParams.get("grade");

  const [totalBudget] = useState(131);
  const [remainingBudget, setRemainingBudget] = useState(131);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (!grade) {
      navigate("/");
    }
  }, [grade, navigate]);

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
    setShowConfirmation(true);
  };

  const handleBackToServices = () => {
    setShowConfirmation(false);
  };

  const handleConfirm = () => {
    console.log("Confirmed:", { grade, selectedServices });
    setIsConfirmed(true);
  };

  if (!grade) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header
        onHomeClick={() => navigate("/")}
        showHomeButton={true}
        showLoginButton={false}
        currentStep={showConfirmation ? 3 : 2}
        showStepper={true}
        onLoginClick={() => {}}
      />

      {!showConfirmation ? (
        <ServiceSelectionSimple
          totalBudget={totalBudget}
          remainingBudget={remainingBudget}
          selectedServices={selectedServices}
          onSelectService={handleServiceSelect}
          onRemoveService={handleServiceRemove}
          onFinish={handleFinish}
        />
      ) : (
        <ConfirmationScreen
          pflegegrad={parseInt(grade)}
          selectedServices={selectedServices}
          totalBudget={totalBudget}
          remainingBudget={remainingBudget}
          onConfirm={handleConfirm}
          onBack={handleBackToServices}
          isConfirmed={isConfirmed}
        />
      )}
    </div>
  );
}
