import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
  completed: boolean;
  active: boolean;
}

interface StepperProps {
  currentStep: number;
}

export function Stepper({ currentStep }: StepperProps) {
  const steps: Step[] = [
    {
      number: 1,
      title: "Pflegegutachten hochladen",
      completed: currentStep > 1,
      active: currentStep === 1,
    },
    {
      number: 2,
      title: "Leistungen auswählen",
      completed: currentStep > 2,
      active: currentStep === 2,
    },
    {
      number: 3,
      title: "Daten bestätigen",
      completed: currentStep > 3,
      active: currentStep === 3,
    },
    {
      number: 4,
      title: "Fertig",
      completed: currentStep > 4,
      active: currentStep === 4,
    },
  ];

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.completed
                      ? "bg-green-500 border-green-500"
                      : step.active
                      ? "bg-teal-600 border-teal-600"
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
                  className={`text-xs mt-2 text-center ${
                    step.active ? "text-teal-900 font-medium" : "text-gray-600"
                  }`}
                >
                  {step.title}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 -mt-10">
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
      </div>
    </div>
  );
}
