import { Home, LogIn, Check } from "lucide-react";
import { Button } from "./ui/button";
import logo from "../../imports/image.png";

interface HeaderProps {
  onHomeClick?: () => void;
  onLoginClick?: () => void;
  showHomeButton?: boolean;
  showLoginButton?: boolean;
  currentStep?: number;
  showStepper?: boolean;
}

export function Header({
  onHomeClick,
  onLoginClick,
  showHomeButton = true,
  showLoginButton = false,
  currentStep = 1,
  showStepper = true
}: HeaderProps) {
  const steps = [
    { number: 1, title: "Hochladen", completed: currentStep > 1, active: currentStep === 1 },
    { number: 2, title: "Auswählen", completed: currentStep > 2, active: currentStep === 2 },
    { number: 3, title: "Bestätigen", completed: currentStep > 3, active: currentStep === 3 },
    { number: 4, title: "Fertig", completed: currentStep > 4, active: currentStep === 4 },
  ];

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <img src={logo} alt="PflegeLeicht Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
            <span className="text-lg sm:text-xl text-teal-900 font-medium">PflegeLeicht</span>
          </div>

          {/* Stepper */}
          {showStepper && (
            <div className="flex items-center gap-2 sm:gap-3 justify-center md:justify-start overflow-x-auto">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    {/* Circle */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        step.completed
                          ? "bg-green-500 border-green-500"
                          : step.active
                          ? "bg-teal-800 border-teal-800"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {step.completed ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <span
                          className={`text-sm font-medium ${
                            step.active ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {step.number}
                        </span>
                      )}
                    </div>
                    {/* Label */}
                    <p
                      className={`hidden sm:block text-sm mt-1 text-center whitespace-nowrap ${
                        step.active ? "text-teal-900 font-medium" : "text-gray-600"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="w-6 sm:w-10 h-0.5 mx-1">
                      <div
                        className={`h-full transition-all ${
                          step.completed ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 flex-shrink-0 w-full md:w-auto">
            {showHomeButton && onHomeClick && (
              <Button
                onClick={onHomeClick}
                variant="outline"
                className="gap-2 w-full sm:w-auto"
              >
                <Home className="w-4 h-4" />
                Startseite
              </Button>
            )}
            {showLoginButton && onLoginClick && (
              <Button
                onClick={onLoginClick}
                className="gap-2 bg-teal-600 hover:bg-teal-700 bold w-full sm:w-auto"
              >Wieder da? - Hier zu deinem Login<LogIn className="w-4 h-4" /></Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
