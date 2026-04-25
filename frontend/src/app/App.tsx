import { useState, useEffect } from 'react';
import { LandingScreen } from './components/LandingScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { DarkModeToggle } from './components/DarkModeToggle';

type Screen = 'landing' | 'questions' | 'loading' | 'results';

export type UserData = {
  situation: string;
  age: string;
  timeInGermany?: string;
  currentStatus?: string;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [userData, setUserData] = useState<UserData>({
    situation: '',
    age: '',
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleSituationSelect = (situation: string) => {
    setUserData({ ...userData, situation });
    setCurrentScreen('questions');
  };

  const handleQuestionsComplete = (data: UserData) => {
    setUserData(data);
    setCurrentScreen('loading');
    setTimeout(() => {
      setCurrentScreen('results');
    }, 2000);
  };

  const handleStartOver = () => {
    setUserData({ situation: '', age: '' });
    setCurrentScreen('landing');
  };

  const handleChangeAnswers = () => {
    setCurrentScreen('questions');
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <DarkModeToggle
        isDark={isDarkMode}
        onToggle={() => setIsDarkMode(!isDarkMode)}
      />
      {currentScreen === 'landing' && (
        <LandingScreen onSelectSituation={handleSituationSelect} />
      )}
      {currentScreen === 'questions' && (
        <QuestionScreen
          userData={userData}
          onComplete={handleQuestionsComplete}
        />
      )}
      {currentScreen === 'loading' && <LoadingScreen />}
      {currentScreen === 'results' && (
        <ResultScreen
          userData={userData}
          onStartOver={handleStartOver}
          onChangeAnswers={handleChangeAnswers}
        />
      )}
    </div>
  );
}
