import React from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <BookOpen />, title: 'CS Theory', desc: 'Computer fundamentals & OS' },
    { icon: <Rocket />, title: 'Intelligence', desc: 'AI & Machine Learning basics' },
    { icon: <ShieldCheck />, title: 'Logic', desc: 'Mental ability & Mathematics' },
  ];

  // Stagger animation for main heading
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Animated Layer */}
      <div className="absolute inset-0 z-0">
        <div className="bg-orb bg-orb-1 opacity-60"></div>
        <div className="bg-orb bg-orb-2 opacity-50"></div>
        <div className="bg-orb bg-orb-3 opacity-40"></div>
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg-dark/80 via-transparent to-bg-dark" />

      {/* Content */}
      <div className="relative z-20 pt-48 px-6 pb-20 max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel text-indigo-300 text-sm font-bold uppercase tracking-[0.2em] border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)]"
        >
          <Sparkles size={16} className="text-secondary" /> Next-Gen Learning Platform
        </motion.div>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-tight"
        >
          <motion.span variants={wordVariants} className="inline-block mr-4">Master</motion.span>
          <motion.span variants={wordVariants} className="inline-block mr-4">the</motion.span>
          <motion.span variants={wordVariants} className="inline-block mr-4">World</motion.span>
          <br className="hidden md:block" />
          <motion.span variants={wordVariants} className="inline-block mr-4">of</motion.span>
          <motion.span variants={wordVariants} className="inline-block gradient-text glow-text relative">
            Data & AI
            <span className="absolute -inset-2 bg-primary-glow blur-[80px] opacity-20 -z-10 rounded-full"></span>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400/90 max-w-3xl mb-16 leading-relaxed px-4 font-medium"
        >
          An immersive quizzing experience designed for elite Computer Science students. 
          Test your foundation in <span className="text-white">Core Fundamentals</span>, 
          <span className="text-white"> Mathematics</span>, and 
          <span className="text-white"> Artificial Intelligence</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 mb-32"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/quiz')}
            className="group relative flex items-center gap-4 px-12 py-6 rounded-3xl bg-white text-bg-dark font-black text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Play size={26} fill="currentColor" className="relative z-10 text-primary" />
            <span className="relative z-10">Start Foundation Quiz</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/leaderboard')}
            className="flex items-center gap-4 px-12 py-6 rounded-3xl glass-panel text-white font-bold text-xl hover:bg-white/10 hover:border-white/30 transition-all shadow-xl"
          >
            View Rankings
          </motion.button>
        </motion.div>

        {/* Feature Grid - Enhanced as Tiles */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
          {features.map((f, i) => (
            <GlassCard key={i} delay={0.8 + (i * 0.1)} className="flex flex-col items-center text-center p-12">
              <div className="relative w-20 h-20 rounded-3xl bg-indigo-500/10 text-primary flex items-center justify-center mb-8 border border-indigo-500/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]">
                {React.cloneElement(f.icon as React.ReactElement, { size: 36, strokeWidth: 1.5 })}
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors tracking-tight">
                {f.title}
              </h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                {f.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
