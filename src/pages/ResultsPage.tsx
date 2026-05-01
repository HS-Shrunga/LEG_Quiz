import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Sparkles, CheckCircle, Mail } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('lastQuizResult');
    if (data) {
      setResult(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!result) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10 overflow-hidden">
      {/* Background Animated Layer with heavy glowing effects */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="bg-orb bg-orb-1 opacity-60 mix-blend-screen scale-150"></div>
        <div className="bg-orb bg-orb-2 opacity-50 mix-blend-screen scale-150"></div>
        <div className="bg-orb bg-orb-3 opacity-40 mix-blend-screen scale-150"></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[50px]"></div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none bg-[radial-gradient(#39ff14_1px,transparent_1px)] [background-size:40px_40px]"></div>

      <div className="w-full max-w-5xl flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-10 relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-150"></div>
          <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_50px_rgba(57,255,20,0.4)] backdrop-blur-md">
            <CheckCircle size={48} className="text-primary" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter uppercase leading-none"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-300 to-slate-600 block mb-2">Assessment</span>
          <span className="text-primary glow-text relative inline-block">
            Completed
            <Sparkles className="absolute -top-6 -right-10 text-secondary w-12 h-12 animate-pulse" />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6 w-full max-w-3xl mt-16 mb-16"
        >
          <div className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors shadow-2xl flex flex-col items-center justify-center group">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
              <Sparkles size={32} />
            </div>
            <h3 className="text-white font-black text-2xl mb-3 tracking-tight">Analyzing Data</h3>
            <p className="text-slate-400 text-base font-medium">We are crunching the numbers to determine your final ranking and score.</p>
          </div>

          <div className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors shadow-2xl flex flex-col items-center justify-center group">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
              <Mail size={32} />
            </div>
            <h3 className="text-white font-black text-2xl mb-3 tracking-tight">Results Soon</h3>
            <p className="text-slate-400 text-base font-medium">Keep an eye on your inbox. You will be notified of your results shortly!</p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-slate-400 font-black tracking-[0.3em] uppercase mb-12 text-sm md:text-base"
        >
          Thank you for participating!
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(57,255,20,0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center gap-4 px-12 py-6 rounded-full bg-white text-bg-dark font-black text-xl transition-all"
        >
          <HomeIcon size={24} /> Return Home
        </motion.button>
      </div>
    </div>
  );
};

export default ResultsPage;
