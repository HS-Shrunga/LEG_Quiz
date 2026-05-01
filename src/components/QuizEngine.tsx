import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, ArrowRight, ArrowLeft, Hash, Check, AlertCircle } from 'lucide-react';
import { masterQuiz } from '../data/quizData';
import GlassCard from './GlassCard';

interface QuizEngineProps {
  onComplete: (score: number, totalQuestions: number, history: any[]) => void;
}

const TOTAL_TIME_SECONDS = 1800; // 30 minutes

const QuizEngine: React.FC<QuizEngineProps> = ({ onComplete }) => {
  const [questions] = useState(() => [...masterQuiz.questions].sort(() => Math.random() - 0.5));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(masterQuiz.questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SECONDS);
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    setVisitedQuestions(prev => {
      const newSet = new Set(prev);
      newSet.add(currentQuestionIndex);
      return newSet;
    });
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = userAnswers[currentQuestionIndex];

  const handleSubmit = useCallback(() => {
    let finalScore = 0;
    const history = questions.map((q, idx) => {
      const selected = userAnswers[idx];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) finalScore++;
      return { questionId: q.id, selected, isCorrect };
    });
    onComplete(finalScore, questions.length, history);
  }, [userAnswers, questions, onComplete]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const timerPercentage = (timeLeft / TOTAL_TIME_SECONDS) * 100;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col pb-4 pt-[130px] md:pt-[140px]">
      
      {/* Fixed Header with Progress & Timer */}
      <div className="fixed top-0 left-0 w-full z-50 pt-3 pb-3 bg-bg-dark/90 backdrop-blur-xl border-b border-white/10 shadow-lg px-4 md:px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          <div className="flex flex-col md:flex-row gap-3">
            
            {/* Progress Card - Highlighted Blue */}
            <div className="flex-1 rounded-2xl py-3 px-5 flex items-center gap-4 bg-indigo-900/40 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300">
                <Hash size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] text-indigo-300/70 font-bold uppercase tracking-[0.2em] mb-0.5">Question Progress</p>
                <h3 className="text-white font-black text-xl tracking-tight">
                  {currentQuestionIndex + 1} <span className="text-indigo-200/50 font-medium text-base">/ {questions.length}</span>
                </h3>
              </div>
            </div>

            {/* Timer Card - Highlighted Pink/Red when low */}
            <div className={`flex-1 rounded-2xl py-2 px-4 flex items-center justify-between border shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-colors ${timeLeft < 60 ? 'bg-rose-900/30 border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : timeLeft <= 300 ? 'bg-amber-900/20 border-amber-500/30' : 'bg-white/5 border-white/10'}`}>
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 absolute inset-0">
                    <circle cx="16" cy="16" r="14" fill="transparent" stroke="var(--glass-border)" strokeWidth="2.5" />
                    <motion.circle 
                      cx="16" cy="16" r="14" 
                      fill="transparent" 
                      stroke={timeLeft < 60 ? 'var(--danger)' : timeLeft <= 300 ? '#f59e0b' : 'var(--secondary)'} 
                      strokeWidth="2.5"
                      strokeDasharray="87.9"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: 87.9 - (87.9 * timerPercentage) / 100 }}
                      transition={{ duration: 1, ease: 'linear' }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <Timer size={14} className={timeLeft < 60 ? 'text-danger animate-pulse' : timeLeft <= 300 ? 'text-amber-500' : 'text-secondary'} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-0.5">Time Remaining</p>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-mono font-black text-lg tracking-tight ${timeLeft < 60 ? 'text-danger glow-text' : timeLeft <= 300 ? 'text-amber-500' : 'text-white'}`}>
                      {formatTime(timeLeft)}
                    </h3>
                    {timeLeft <= 300 && timeLeft > 60 && <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse"><AlertCircle size={10} /> 5 mins left</span>}
                    {timeLeft <= 60 && <span className="text-[10px] font-bold text-danger bg-danger/10 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse"><AlertCircle size={10} /> Hurry up!</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Question Grid */}
          <div className="flex gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar items-center px-1">
            {questions.map((_, idx) => {
              const isAnswered = userAnswers[idx] !== null;
              const isVisited = visitedQuestions.has(idx);
              const isSkipped = isVisited && !isAnswered;
              const isCurrent = currentQuestionIndex === idx;

              let btnClass = "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10";
              if (isAnswered) {
                btnClass = "bg-primary text-black border-primary shadow-[0_0_15px_rgba(57,255,20,0.5)]";
              } else if (isSkipped) {
                btnClass = "bg-warning text-black border-warning shadow-[0_0_15px_rgba(234,255,0,0.5)]";
              }
              
              if (isCurrent) {
                btnClass += " ring-2 ring-white ring-offset-2 ring-offset-bg-dark scale-110 z-10";
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`min-w-[36px] h-[36px] rounded-xl border flex items-center justify-center font-black text-sm transition-all duration-300 ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-4 items-center justify-center pt-1 pb-1">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(57,255,20,0.5)]"></div><span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">Answered</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-warning shadow-[0_0_8px_rgba(234,255,0,0.5)]"></div><span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">Skipped</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/20"></div><span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">Unattended</span></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-2 w-full flex flex-col gap-3">
        
        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="!p-4 md:!p-6 !bg-white/[0.03]">
              <div className="flex justify-center mb-3">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-primary text-[9px] font-black uppercase tracking-[0.2em] border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                  {currentQuestion.category}
                </span>
              </div>
              
              <h2 className="text-lg md:text-xl font-black text-white mb-4 leading-snug text-center max-w-3xl mx-auto tracking-tight">
                {currentQuestion.text}
              </h2>

              <div className="flex flex-col gap-2 max-w-2xl mx-auto w-full px-2 sm:px-0">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = idx === selectedOption;
                  
                  let stateClass = "border-white/10 hover:border-amber-400/50 hover:bg-white/[0.04]";
                  let iconClass = "bg-slate-900 border-white/10 text-slate-400 group-hover:bg-amber-400 group-hover:text-black";
                  
                  if (isSelected) {
                    stateClass = "border-amber-400 bg-gradient-to-r from-amber-400/20 to-amber-400/5 text-white shadow-[0_0_20px_rgba(251,191,36,0.2)] scale-[1.01]";
                    iconClass = "bg-amber-400 text-black border-transparent shadow-[0_0_15px_rgba(251,191,36,0.5)]";
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={isSelected ? {} : { scale: 1.01, backgroundColor: 'rgba(255,255,255,0.05)' }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(idx)}
                      className={`group relative flex flex-row items-center justify-start gap-3 px-4 py-2 rounded-[16px] border-[2px] text-left transition-all duration-300 ${stateClass}`}
                    >
                      <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-[10px] font-black text-sm transition-all shadow-inner ${iconClass}`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-medium text-base leading-tight">{option}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-4 text-amber-400"
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,1)]"></div>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Actions */}
        <div className="flex gap-3 max-w-2xl mx-auto w-full mt-1">
          <motion.button
            whileHover={currentQuestionIndex > 0 ? { scale: 1.02 } : {}}
            whileTap={currentQuestionIndex > 0 ? { scale: 0.98 } : {}}
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center justify-center gap-2 py-3 px-5 rounded-[16px] font-bold text-base transition-all ${
              currentQuestionIndex > 0 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-white/5 text-slate-600 cursor-not-allowed'
            }`}
          >
            <ArrowLeft size={18} strokeWidth={2.5} /> <span className="hidden sm:inline">Previous</span>
          </motion.button>
          
          {currentQuestionIndex < questions.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[16px] bg-white text-bg-dark font-black text-base shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">Next Question</span>
              <ArrowRight size={18} strokeWidth={3} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[16px] bg-amber-500 text-black font-black text-base shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">Submit Assessment</span>
              <Check size={18} strokeWidth={3} className="relative z-10" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizEngine;
