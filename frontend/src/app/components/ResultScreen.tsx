import type { UserData } from '../App';

type ResultScreenProps = {
  userData: UserData;
  onStartOver: () => void;
  onChangeAnswers: () => void;
};

export function ResultScreen({
  userData,
  onStartOver,
  onChangeAnswers,
}: ResultScreenProps) {
  const getRelevantInfo = () => {
    if (userData.situation === 'I am studying') {
      return [
        'Student visa requirements and regulations',
        'BAföG or student financial aid eligibility',
        'Student health insurance options',
      ];
    }
    if (userData.situation === 'I am starting my career') {
      return [
        'Work permit and residence permit requirements',
        'Tax registration (Steuer-ID)',
        'Social insurance registration',
      ];
    }
    if (userData.situation === 'I am new in Germany') {
      return [
        'Anmeldung (address registration)',
        'Health insurance enrollment',
        'Opening a German bank account',
      ];
    }
    return [
      'Understanding your specific situation',
      'Gathering required documents',
      'Finding the right authorities to contact',
    ];
  };

  const getNextSteps = () => {
    if (userData.situation === 'I am new in Germany') {
      return [
        'Register your address at the local Bürgeramt within 14 days',
        'Choose and enroll in health insurance',
        'Open a bank account with your registration confirmation',
      ];
    }
    if (userData.situation === 'I am studying') {
      return [
        'Ensure your student visa is valid',
        'Register at your university',
        'Apply for student health insurance',
      ];
    }
    return [
      'Gather all necessary documents',
      'Book an appointment with the relevant office',
      'Complete required forms in advance',
    ];
  };

  const getGoodToKnow = () => {
    if (userData.age === 'Under 25') {
      return [
        'You may qualify for additional student benefits',
        'Some cities offer youth discounts for public transport',
      ];
    }
    return [
      'Most appointments can be booked online',
      'Bring original documents and copies to appointments',
    ];
  };

  const getCanIgnore = () => {
    if (userData.situation === 'I am new in Germany') {
      return [
        'TV license registration (can wait a few weeks)',
        'Advanced tax optimization strategies',
      ];
    }
    return [
      'Complex tax planning (not needed yet)',
      'Long-term investment accounts',
    ];
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl">What matters for you right now</h2>
          <ul className="space-y-2">
            {getRelevantInfo().map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-accent mt-1">•</span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl">What you should do next</h2>
          <ol className="space-y-3">
            {getNextSteps().map((step, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-accent flex-shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <span className="text-foreground pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl">Good to know</h2>
          <ul className="space-y-2">
            {getGoodToKnow().map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-accent mt-1">•</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-secondary border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl">You can ignore for now</h2>
          <ul className="space-y-2">
            {getCanIgnore().map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-muted-foreground mt-1">•</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 pt-4">
          <button
            onClick={onStartOver}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl px-6 py-4 text-lg transition-colors duration-200 shadow-sm"
          >
            Start over
          </button>
          <button
            onClick={onChangeAnswers}
            className="w-full bg-card hover:bg-secondary text-foreground border border-border rounded-2xl px-6 py-4 text-lg transition-colors duration-200"
          >
            Change answers
          </button>
        </div>
      </div>
    </div>
  );
}
