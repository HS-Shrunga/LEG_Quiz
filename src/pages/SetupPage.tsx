import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, School, ArrowRight, CheckSquare, Square, Play, ShieldCheck, Clock, BookOpen, AlertTriangle, PartyPopper, Phone, Layers, Mail } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const SetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [studentName, setStudentName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedRules, setAcceptedRules] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim() && collegeName.trim() && phoneNumber.trim() && department.trim()) {
      setStep(2);
    }
  };

  const handleStartQuiz = () => {
    if (acceptedRules) {
      localStorage.setItem('studentDetails', JSON.stringify({ studentName, collegeName, phoneNumber, department, email }));
      navigate('/quiz');
    }
  };

  return (
    <div className="relative min-h-screen pt-32 px-6 pb-20 flex flex-col items-center z-10">
      {/* Background Animated Layer */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="bg-orb bg-orb-1 opacity-40"></div>
        <div className="bg-orb bg-orb-2 opacity-30"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            {step === 1 ? 'Enter Your Details' : 'Assessment Rules'}
          </h1>
          <p className="text-slate-400 font-medium">
            {step === 1 ? 'Please provide your information to begin the assessment.' : 'Read the instructions carefully before starting.'}
          </p>
        </div>

        <GlassCard className="!p-8 md:!p-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleNextStep}
                className="flex flex-col gap-6"
              >
                <div>
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">Student Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <User size={20} />
                    </div>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium text-lg"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">College Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <School size={20} />
                    </div>
                    <input
                      type="text"
                      required
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium text-lg"
                      placeholder="e.g. Stanford University"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Phone size={20} />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium text-lg"
                        placeholder="e.g. +1 234 567 890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">Department / Branch</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Layers size={20} />
                      </div>
                      <select
                        required
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-[#0f172a] border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium text-lg appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="text-slate-500">Select your branch</option>
                        <option value="Computer Science and Engineering">Computer Science & Engineering</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Artificial Intelligence and Machine Learning">AI & Machine Learning</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Electronics and Communication Engineering">Electronics & Communication</option>
                        <option value="Electrical and Electronics Engineering">Electrical & Electronics</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Aerospace Engineering">Aerospace Engineering</option>
                        <option value="Biotechnology">Biotechnology</option>
                        <option value="Chemical Engineering">Chemical Engineering</option>
                        <option value="Bachelor of Computer Applications (BCA)">BCA</option>
                        <option value="Master of Computer Applications (MCA)">MCA</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">Email (Optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium text-lg"
                      placeholder="e.g. awesome@college.edu"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-4 flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-white text-bg-dark font-black text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all"
                >
                  Continue <ArrowRight size={20} strokeWidth={2.5} />
                </motion.button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-8"
              >
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="mt-1 p-2 rounded-xl bg-primary/10 text-primary shrink-0 h-min">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-1">Beat the Clock! ⏰</h3>
                      <p className="text-slate-400 leading-relaxed">You've got <span className="text-white font-bold">30 minutes</span> to show off your brainpower. Tick-tock!</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 p-2 rounded-xl bg-secondary/10 text-secondary shrink-0 h-min">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-1">Random Goodness 🎲</h3>
                      <p className="text-slate-400 leading-relaxed">
                        Expect 20 randomly shuffled questions! Keep on your toes!
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 p-2 rounded-xl bg-danger/10 text-danger shrink-0 h-min">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-1">One Shot Only 🎯</h3>
                      <p className="text-slate-400 leading-relaxed">No do-overs! Give it your absolute best on the first try.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 p-2 rounded-xl bg-amber-500/10 text-amber-500 shrink-0 h-min">
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-1">Big Brother is Watching 👀</h3>
                      <p className="text-slate-400 leading-relaxed">No cheating or tab-switching allowed! Play fair, stay cool.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center justify-center pt-4 border-t border-white/10">
                    <PartyPopper size={28} className="text-primary" />
                    <h3 className="text-white font-black text-2xl">Let's Gooooo! 🚀</h3>
                  </div>
                </div>

                <div 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => setAcceptedRules(!acceptedRules)}
                >
                  <div className="text-primary">
                    {acceptedRules ? <CheckSquare size={28} /> : <Square size={28} />}
                  </div>
                  <span className="text-slate-200 font-medium select-none">
                    I have read and understood all the rules and instructions.
                  </span>
                </div>

                <div className="flex gap-4 mt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(1)}
                    className="flex-1 py-5 rounded-2xl glass-panel text-white font-bold text-lg hover:bg-white/5 transition-all"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: acceptedRules ? 1.02 : 1 }}
                    whileTap={{ scale: acceptedRules ? 0.98 : 1 }}
                    onClick={handleStartQuiz}
                    disabled={!acceptedRules}
                    className={`flex-[2] flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-lg transition-all ${
                      acceptedRules 
                        ? 'bg-primary text-white shadow-[0_0_30px_rgba(99,102,241,0.4)]' 
                        : 'bg-white/10 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Play size={20} fill="currentColor" /> Start Assessment
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default SetupPage;
