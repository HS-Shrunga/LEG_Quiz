import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Share2, RotateCcw, Home as HomeIcon, CheckCircle, XCircle, Award } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<any>(null);

  // Animated Counter Setup
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const data = localStorage.getItem('lastQuizResult');
    if (data) {
      const parsedData = JSON.parse(data);
      setResult(parsedData);
      
      const percentage = (parsedData.score / parsedData.total) * 100;
      const animation = animate(count, percentage, { duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 });
      return animation.stop;
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!result) return null;

  const percentage = (result.score / result.total) * 100;
  const isPassed = percentage >= 60;

  return (
    <div className="pt-40 px-6 pb-20 max-w-5xl mx-auto relative z-10">
      
      {/* Background Animated Layer */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="bg-orb bg-orb-1 opacity-40"></div>
        <div className="bg-orb bg-orb-2 opacity-30"></div>
        {isPassed && <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-full bg-success/10 blur-[120px] rounded-full animate-pulse"></div>}
      </div>

      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          className={`inline-block p-8 rounded-full mb-8 border shadow-[0_0_60px_rgba(0,0,0,0.3)] relative group ${
            isPassed ? 'bg-success/10 text-success border-success/30 shadow-success/20' : 'bg-primary/10 text-primary border-primary/30 shadow-primary/20'
          }`}
        >
          <div className={`absolute inset-0 rounded-full blur-[30px] opacity-50 ${isPassed ? 'bg-success' : 'bg-primary'}`}></div>
          <Award size={80} strokeWidth={1.5} className="relative z-10" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl md:text-7xl font-black mb-6 tracking-tighter"
        >
          Assessment <span className={isPassed ? "text-success glow-text" : "primary-gradient-text"}>Complete</span>
        </motion.h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-20 items-stretch">
        {/* Score Card */}
        <GlassCard delay={0.4} className="flex flex-col items-center justify-center text-center !p-16 h-full !bg-white/[0.03]">
          <div className="relative w-56 h-56 flex items-center justify-center mb-10">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="112" cy="112" r="96" fill="transparent"
                stroke="currentColor" strokeWidth="12" className="text-white/5"
              />
              <motion.circle
                cx="112" cy="112" r="96" fill="transparent"
                stroke="currentColor" strokeWidth="12" strokeDasharray="603.18"
                initial={{ strokeDashoffset: 603.18 }}
                animate={{ strokeDashoffset: 603.18 - (603.18 * percentage) / 100 }}
                transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                strokeLinecap="round"
                className={`${isPassed ? "text-success drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex items-end">
                <motion.span className="text-7xl font-black text-white tracking-tighter">{rounded}</motion.span>
                <span className="text-3xl font-bold text-white/50 mb-2">%</span>
              </div>
              <span className="text-[11px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1">Accuracy</span>
            </div>
          </div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className={`text-4xl font-black mb-3 tracking-tight ${isPassed ? 'text-white' : 'text-amber-400'}`}
          >
            {isPassed ? 'Ready for the Future' : 'Solid Start!'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-slate-400 text-base font-medium"
          >
            Score: <span className="text-white font-bold">{result.score}</span> / {result.total} questions
          </motion.p>
        </GlassCard>

        {/* Breakdown Card */}
        <GlassCard delay={0.5} className="flex flex-col gap-10 !p-12 h-full !bg-white/[0.03]">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 border-b border-white/10 pb-6">Metric Summary</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center group p-4 rounded-2xl hover:bg-white/5 transition-colors">
              <span className="flex items-center gap-5 text-slate-300 font-semibold">
                <div className="p-3 rounded-xl bg-success/10 text-success shadow-[0_0_15px_rgba(16,185,129,0.2)]"><CheckCircle size={22} /></div>
                Correct Answers
              </span>
              <span className="font-black text-3xl text-white">{result.score}</span>
            </div>
            <div className="flex justify-between items-center group p-4 rounded-2xl hover:bg-white/5 transition-colors">
              <span className="flex items-center gap-5 text-slate-300 font-semibold">
                <div className="p-3 rounded-xl bg-danger/10 text-danger shadow-[0_0_15px_rgba(244,63,94,0.2)]"><XCircle size={22} /></div>
                Incorrect Answers
              </span>
              <span className="font-black text-3xl text-white">{result.total - result.score}</span>
            </div>
            <div className="flex justify-between items-center group p-4 rounded-2xl hover:bg-white/5 transition-colors">
              <span className="flex items-center gap-5 text-slate-300 font-semibold">
                <div className="p-3 rounded-xl bg-primary/10 text-primary shadow-[0_0_15px_rgba(99,102,241,0.2)]"><RotateCcw size={22} /></div>
                Attempts
              </span>
              <span className="font-black text-3xl text-white">1</span>
            </div>
          </div>

          <div className="grid gap-4 mt-auto pt-6 border-t border-white/10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/quiz')}
              className="flex items-center justify-center gap-3 py-5 rounded-[20px] bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10"
            >
              <RotateCcw size={20} /> Retake Assessment
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-3 py-5 rounded-[20px] bg-white text-bg-dark font-black shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <HomeIcon size={20} className="relative z-10" /> <span className="relative z-10">Back to Dashboard</span>
            </motion.button>
          </div>
        </GlassCard>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center"
      >
        <button className="group flex items-center gap-3 px-10 py-5 rounded-full glass-panel-thick text-slate-400 hover:text-white border border-white/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all">
          <Share2 size={20} className="group-hover:text-primary transition-colors" />
          <span className="font-bold text-sm uppercase tracking-widest">Share Achievement</span>
        </button>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
