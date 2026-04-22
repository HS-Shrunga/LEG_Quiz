import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, ArrowRight, CheckCircle2, XCircle, Info, Hash } from 'lucide-react';
import { masterQuiz } from '../data/quizData';
import GlassCard from './GlassCard';

interface QuizEngineProps {
  onComplete: (score: number, totalQuestions: number, history: any[]) => void;
}

const SECONDS_PER_QUESTION = 20;

const QuizEngine: React.FC<QuizEngineProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [score, setScore] = useState(0);
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = masterQuiz.questions[currentQuestionIndex];

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < masterQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(SECONDS_PER_QUESTION);
      setShowExplanation(false);
    } else {
      onComplete(score, masterQuiz.questions.length, quizHistory);
    }
  }, [currentQuestionIndex, score, quizHistory, onComplete]);

  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft <= 0) {
      handleAnswer(-1); // Mark as incorrect/timed out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setQuizHistory(prev => [...prev, {
      questionId: currentQuestion.id,
      selected: optionIndex,
      isCorrect
    }]);

    setShowExplanation(true);
  };

  const timerPercentage = (timeLeft / SECONDS_PER_QUESTION) * 100;

  return (
    <div className="max-w-4xl mx-auto pt-32 px-6 pb-20 relative z-10">
      <div className="flex flex-col gap-10">
        
        {/* Progress & Timer Header */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 glass-panel-thick py-5 px-8 flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-indigo-500/10 text-primary shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Hash size={24} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Question Progress</p>
              <h3 className="text-white font-black text-2xl tracking-tight">
                {currentQuestionIndex + 1} <span className="text-slate-500 font-medium text-lg">/ {masterQuiz.questions.length}</span>
              </h3>
            </div>
          </div>

          <div className="flex-1 glass-panel-thick py-5 px-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 absolute inset-0">
                  <circle cx="28" cy="28" r="24" fill="transparent" stroke="var(--glass-border)" strokeWidth="4" />
                  <motion.circle 
                    cx="28" cy="28" r="24" 
                    fill="transparent" 
                    stroke={timeLeft < 6 ? 'var(--danger)' : 'var(--secondary)'} 
                    strokeWidth="4"
                    strokeDasharray="150.7"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: 150.7 - (150.7 * timerPercentage) / 100 }}
                    transition={{ duration: 1, ease: 'linear' }}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]"
                  />
                </svg>
                <Timer size={20} className={timeLeft < 6 ? 'text-danger animate-pulse' : 'text-secondary'} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Time Remaining</p>
                <h3 className={`font-mono font-black text-2xl tracking-tight ${timeLeft < 6 ? 'text-danger glow-text' : 'text-white'}`}>
                  0:{timeLeft.toString().padStart(2, '0')}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Progress Bar */}
        <div className="px-2">
          <div className="h-2 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5 relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / masterQuiz.questions.length) * 100}%` }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.8 }}
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-x shadow-[0_0_20px_rgba(14,165,233,0.5)] rounded-full"
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="!p-10 md:!p-16 !bg-white/[0.03]">
              <div className="flex justify-center mb-10">
                <span className="px-5 py-2 rounded-full bg-indigo-500/10 text-primary text-[11px] font-black uppercase tracking-[0.3em] border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                  {currentQuestion.category}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-14 leading-[1.2] text-center max-w-3xl mx-auto tracking-tight">
                {currentQuestion.text}
              </h2>

              <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                {currentQuestion.options.map((option, idx) => {
                  const isCorrect = idx === currentQuestion.correctAnswer;
                  const isSelected = idx === selectedOption;
                  
                  let stateClass = "border-white/10 hover:border-primary/50 hover:bg-white/[0.04]";
                  let iconClass = "bg-slate-900 border-white/10 text-slate-400 group-hover:bg-primary group-hover:text-white";
                  
                  if (isAnswered) {
                    if (isCorrect) {
                      stateClass = "border-success/50 bg-success/10 text-white scale-[1.02] z-10 shadow-[0_0_40px_rgba(16,185,129,0.2)]";
                      iconClass = "bg-success text-bg-dark border-transparent";
                    }
                    else if (isSelected) {
                      stateClass = "border-danger/50 bg-danger/10 text-white";
                      iconClass = "bg-danger text-white border-transparent";
                    }
                    else stateClass = "border-white/5 opacity-40 grayscale";
                  }

                  return (
                    <motion.button
                      key={idx}
                      disabled={isAnswered}
                      whileHover={!isAnswered ? { scale: 1.02 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(idx)}
                      className={`group relative flex items-center justify-between p-6 rounded-[20px] border-[1.5px] text-left transition-all duration-300 ${stateClass}`}
                    >
                      <div className="flex items-center gap-6">
                        <span className={`flex items-center justify-center w-12 h-12 rounded-2xl font-black text-lg transition-all shadow-inner ${iconClass}`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-semibold text-lg">{option}</span>
                      </div>
                      {isAnswered && (
                        <motion.div 
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="flex items-center gap-3"
                        >
                          {isCorrect && <CheckCircle2 size={32} strokeWidth={2.5} className="text-success drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />}
                          {isSelected && !isCorrect && <XCircle size={32} strokeWidth={2.5} className="text-danger drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" />}
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Footer Actions */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className="flex flex-col gap-6 max-w-2xl mx-auto w-full pt-4"
            >
              {showExplanation && (
                <GlassCard className="!bg-indigo-500/5 border-indigo-500/20 !p-8 !rounded-[24px]">
                  <div className="flex gap-6 items-start">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-primary shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                      <Info size={28} />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="text-primary font-black text-xs uppercase tracking-widest mb-2">Deep Dive</h4>
                      <p className="text-slate-200 font-medium leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="group flex items-center justify-center gap-4 w-full py-6 rounded-[24px] bg-white text-bg-dark font-black text-xl shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">{currentQuestionIndex === masterQuiz.questions.length - 1 ? 'Calculate Final Score' : 'Continue to Next Concept'}</span>
                <ArrowRight size={24} strokeWidth={3} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizEngine;
