import { useState } from 'react';
import type { UserData } from '../App';

type QuestionScreenProps = {
  userData: UserData;
  onComplete: (data: UserData) => void;
};

type Question = {
  id: string;
  question: string;
  options: string[];
  key: keyof UserData;
};

export function QuestionScreen({ userData, onComplete }: QuestionScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserData>(userData);

  const getQuestions = (): Question[] => {
    const baseQuestions: Question[] = [
      {
        id: 'age',
        question: 'How old are you?',
        options: ['Under 25', '25 or older'],
        key: 'age',
      },
    ];

    if (userData.situation === 'I am new in Germany') {
      baseQuestions.push({
        id: 'timeInGermany',
        question: 'How long have you been in Germany?',
        options: ['Less than 6 months', '6 months or more'],
        key: 'timeInGermany',
      });
    }

    if (
      userData.situation === 'I am studying' ||
      userData.situation === 'I am starting my career'
    ) {
      baseQuestions.push({
        id: 'currentStatus',
        question: 'What is your current status?',
        options: ['Just starting', 'In progress', 'Almost done'],
        key: 'currentStatus',
      });
    }

    return baseQuestions;
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion.key]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-12">
      <div className="w-full max-w-md mx-auto space-y-8 flex-1 flex flex-col">
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              Step {currentQuestionIndex + 1} of {totalQuestions}
            </p>
          </div>

          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-8">
          <h1 className="text-3xl text-center tracking-tight">
            {currentQuestion.question}
          </h1>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full bg-card hover:bg-accent hover:text-accent-foreground transition-colors duration-200 border border-border rounded-2xl px-6 py-5 text-lg shadow-sm"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
