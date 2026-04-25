import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { ServiceSelectionSimple } from "../components/ServiceSelectionSimple";
import { Header } from "../components/Header";
import { ServiceData, fetchServices, fetchTotalBudget } from "../data/services";

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
  const currentStep = 2;
  const navigate = useNavigate();
  const location = useLocation();
  const gradeValue = (location.state as { grade?: number | string } | null)?.grade;
  const grade =
    typeof gradeValue === "number"
      ? gradeValue
      : typeof gradeValue === "string"
        ? parseInt(gradeValue, 10)
        : NaN;

  const [totalBudget, setTotalBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  useEffect(() => {
    if (Number.isNaN(grade)) {
      navigate("/");
    }
  }, [grade, navigate]);

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      setIsLoadingServices(true);

      try {
        const [servicesData, totalBudgetData] = await Promise.all([
          fetchServices(),
          fetchTotalBudget(grade),
        ]);

        if (!isMounted) {
          return;
        }

        setServices(servicesData);
        setTotalBudget(totalBudgetData);
        setRemainingBudget(totalBudgetData);
        setServicesError(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error("Error loading services:", error);
        setServicesError("Leistungen konnten nicht geladen werden. Bitte versuche es erneut.");
      } finally {
        if (isMounted) {
          setIsLoadingServices(false);
        }
      }
    };

    loadServices();

    return () => {
      isMounted = false;
    };
  }, [grade]);

  const handleServiceSelect = (service: Service) => {
    setSelectedServices((prev) => [...prev, service]);
    setRemainingBudget((prev) => prev - service.cost);
  };

  const handleServiceRemove = (serviceId: string) => {
    const service = selectedServices.find((s) => s.id === serviceId);
    if (service) {
      setSelectedServices((prev) => prev.filter((s) => s.id !== serviceId));
      setRemainingBudget((prev) => prev + service.cost);
    }
  };

  const handleConfirm = () => {
    navigate("/confirmation", { state: { grade, selectedServices, totalBudget, remainingBudget} });
  };

  if (Number.isNaN(grade)) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header
        onHomeClick={() => navigate("/")}
        showHomeButton={true}
        showLoginButton={false}
        currentStep={currentStep}
        showStepper={true}
        onLoginClick={() => {}}
      />

      <ServiceSelectionSimple
          totalBudget={totalBudget}
          remainingBudget={remainingBudget}
          services={services}
          isLoadingServices={isLoadingServices}
          servicesError={servicesError}
          selectedServices={selectedServices}
          onSelectService={handleServiceSelect}
          onRemoveService={handleServiceRemove}
          onFinish={handleConfirm}
      />
    </div>
  );
}
