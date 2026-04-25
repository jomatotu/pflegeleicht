import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ConfirmationScreen } from "../components/ConfirmationScreen";
import { Header } from "../components/Header";

interface Service {
  id: string;
  title: string;
  description: string;
  cost: number;
  monthlyPrice: number;
}

export function SummaryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const grade = searchParams.get("grade");

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedServices] = useState<Service[]>([]);
  const [totalBudget] = useState(131);
  const [remainingBudget] = useState(131);

  useEffect(() => {
    if (!grade) {
      navigate("/");
    }
  }, [grade, navigate]);

  const handleConfirm = () => {
    console.log("Confirmed:", { grade, selectedServices });
    setIsConfirmed(true);
  };

  const handleBack = () => {
    navigate(`/services?grade=${grade}`);
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
        currentStep={3}
        showStepper={true}
        onLoginClick={() => {}}
      />

      <ConfirmationScreen
        pflegegrad={parseInt(grade)}
        selectedServices={selectedServices}
        totalBudget={totalBudget}
        remainingBudget={remainingBudget}
        onConfirm={handleConfirm}
        onBack={handleBack}
        isConfirmed={isConfirmed}
      />
    </div>
  );
}
