import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Award, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-center"
    >
      <div className="glass-panel px-10 py-4 flex items-center justify-between max-w-5xl w-full">
        <Link to="/" className="flex items-center gap-3 group decoration-none">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
            <Terminal size={22} />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">
            Quiz<span className="text-indigo-400">Master</span>
          </span>
        </Link>

        <div className="flex items-center gap-10">
          <Link to="/" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors decoration-none tracking-wide">
            Home
          </Link>
          <Link to="/leaderboard" className="flex items-center gap-2.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors decoration-none tracking-wide">
            <Award size={18} className="text-indigo-500" />
            Leaderboard
          </Link>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <HelpCircle size={20} className="text-slate-500 cursor-help hover:text-indigo-400 transition-colors" />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
