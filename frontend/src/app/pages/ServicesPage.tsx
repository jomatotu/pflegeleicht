import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ServiceSelectionSimple } from "../components/ServiceSelectionSimple";
import { Header } from "../components/Header";

interface Service {
  id: string;
  title: string;
  description: string;
  cost: number;
  monthlyPrice: number;
}

export function ServicesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const grade = searchParams.get("grade");

  const [totalBudget] = useState(131);
  const [remainingBudget, setRemainingBudget] = useState(131);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

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
    navigate(`/summary?grade=${grade}`);
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
        currentStep={2}
        showStepper={true}
        onLoginClick={() => {}}
      />

      <ServiceSelectionSimple
        totalBudget={totalBudget}
        remainingBudget={remainingBudget}
        selectedServices={selectedServices}
        onSelectService={handleServiceSelect}
        onRemoveService={handleServiceRemove}
        onFinish={handleFinish}
      />
    </div>
  );
}
