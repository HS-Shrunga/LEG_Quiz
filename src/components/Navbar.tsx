import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Award, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/quiz') {
    return null;
  }

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

        <div className="flex items-center gap-6">
          <Link to="/" className="px-5 py-2.5 rounded-xl text-base font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg tracking-wide flex items-center justify-center">
            Home
          </Link>
          <Link to="/leaderboard" className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-base font-bold text-white bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 hover:border-indigo-500/50 transition-all shadow-lg tracking-wide">
            <Award size={20} className="text-indigo-400" />
            Leadership Board
          </Link>
          <div className="h-6 w-px bg-white/20 mx-2" />
          <HelpCircle size={24} className="text-white/80 cursor-help hover:text-white transition-colors" />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
