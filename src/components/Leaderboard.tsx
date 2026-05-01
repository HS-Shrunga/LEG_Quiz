import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, MapPin, School, Layers } from 'lucide-react';
import { leaderboardData } from '../data/quizData';
import GlassCard from './GlassCard';

const Leaderboard: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  return (
    <div className="pt-40 px-6 pb-20 max-w-4xl mx-auto relative z-10">
      
      {/* Background Animated Layer */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="bg-orb bg-orb-3 opacity-30 top-[20%] left-[80%]"></div>
        <div className="bg-orb bg-orb-1 opacity-20 top-[60%] left-[10%]"></div>
      </div>

      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-block p-5 rounded-full bg-primary/10 text-primary mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]"
        >
          <Trophy size={48} strokeWidth={1.5} />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-black mb-4 tracking-tighter"
        >
          Global <span className="gold-gradient-text glow-text">Rankings</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 font-medium text-lg max-w-lg mx-auto"
        >
          Top performers across the Next-Gen Computer Science assessment.
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        {leaderboardData.map((user, index) => {
          let highlightClass = "border-white/5 bg-white/[0.02]";
          let RankIcon = null;
          let rankColor = "text-slate-400";
          
          if (index === 0) {
            highlightClass = "border-yellow-500/50 bg-gradient-to-r from-yellow-500/10 to-transparent shadow-[0_0_20px_rgba(234,179,8,0.15)] z-10";
            RankIcon = <Trophy className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" size={20} />;
          } else if (index === 1) {
            highlightClass = "border-slate-300/40 bg-gradient-to-r from-slate-300/10 to-transparent";
            RankIcon = <Medal className="text-slate-300 drop-shadow-[0_0_10px_rgba(203,213,225,0.5)]" size={18} />;
          } else if (index === 2) {
            highlightClass = "border-amber-600/40 bg-gradient-to-r from-amber-600/10 to-transparent";
            RankIcon = <Medal className="text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" size={18} />;
          } else {
            rankColor = "text-white/30";
          }

          return (
            <motion.div key={user.id} variants={itemVariants}>
              <GlassCard delay={0} className={`flex items-center justify-between !p-3 relative overflow-hidden transition-all duration-300 hover:bg-white/[0.05] ${highlightClass}`}>
                
                {/* Subtle sheen for top 3 */}
                {index < 3 && (
                  <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shine opacity-60"></div>
                )}

                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-10 h-10 flex items-center justify-center font-black text-lg ${rankColor}`}>
                    {RankIcon || `#${index + 1}`}
                  </div>
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className={`w-10 h-10 rounded-full border-2 object-cover ${index === 0 ? 'border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.4)]' : index === 1 ? 'border-slate-300' : index === 2 ? 'border-amber-500' : 'border-white/10'}`} />
                    {index === 0 && <div className="absolute -bottom-1 -right-1 bg-yellow-500 p-0.5 rounded-full shadow-lg"><Trophy size={10} className="text-bg-dark" /></div>}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white tracking-tight">{user.name}</h3>
                    <div className="flex items-center flex-wrap gap-2 mt-1">
                      {user.college && (
                        <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold border border-indigo-500/20 flex items-center gap-1">
                          <School size={10} /> <span className="truncate max-w-[120px] sm:max-w-none">{user.college}</span>
                        </span>
                      )}
                      {user.department && (
                        <span className="text-[9px] bg-secondary/20 text-secondary px-2 py-0.5 rounded-full uppercase tracking-wider font-bold border border-secondary/20 flex items-center gap-1">
                          <Layers size={10} /> <span className="truncate max-w-[120px] sm:max-w-none">{user.department}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right relative z-10 pr-3">
                  <div className="text-2xl font-black text-white tracking-tighter drop-shadow-md">{user.score}</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Points</div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Leaderboard;
