type LandingScreenProps = {
  onSelectSituation: (situation: string) => void;
};

export function LandingScreen({ onSelectSituation }: LandingScreenProps) {
  const situations = [
    'I am studying',
    'I am starting my career',
    'I am new in Germany',
    'I have an administrative problem',
    'Something else',
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl tracking-tight text-foreground">
            What describes your situation best?
          </h1>
          <p className="text-muted-foreground text-lg">
            Answer a few short questions and get clear next steps.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          {situations.map((situation) => (
            <button
              key={situation}
              onClick={() => onSelectSituation(situation)}
              className="w-full bg-card hover:bg-accent hover:text-accent-foreground transition-colors duration-200 border border-border rounded-2xl px-6 py-5 text-lg text-left shadow-sm"
            >
              {situation}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
