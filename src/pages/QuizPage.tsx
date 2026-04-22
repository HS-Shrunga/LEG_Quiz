import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuizEngine from '../components/QuizEngine';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();

  const handleComplete = (score: number, total: number, history: any[]) => {
    const result = { score, total, history, date: new Date().toISOString() };
    localStorage.setItem('lastQuizResult', JSON.stringify(result));
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-bg-dark">
      <QuizEngine onComplete={handleComplete} />
    </div>
  );
};

export default QuizPage;
