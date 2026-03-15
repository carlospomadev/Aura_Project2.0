import { ArrowLeft, MoreHorizontal, Wind, RotateCcw, Play, RotateCw } from 'lucide-react';
import { motion } from 'motion/react';

interface MindfulnessProps {
  onBack: () => void;
}

export default function Mindfulness({ onBack }: MindfulnessProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-[#ffecd2] via-[#e0c3fc]/30 to-[#f6f8f7]"
    >
      <header className="flex items-center p-6 justify-between z-10 mt-8">
        <button 
          onClick={onBack}
          className="text-slate-900 flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-slate-900 text-lg font-semibold tracking-tight">Mindfulness Session</h2>
        <button className="text-slate-900 flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
          <MoreHorizontal size={20} />
        </button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="relative flex items-center justify-center mb-12">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          />
          
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-64 h-64 bg-white/40 backdrop-blur-xl border border-white/50 rounded-full flex flex-col items-center justify-center shadow-2xl"
          >
            <div className="w-48 h-48 bg-primary/40 rounded-full flex items-center justify-center border-4 border-white/30">
              <div className="w-32 h-32 bg-primary rounded-full shadow-lg flex items-center justify-center">
                <Wind className="text-white" size={48} />
              </div>
            </div>
          </motion.div>
          <p className="absolute -bottom-8 text-slate-600 text-sm font-medium tracking-widest uppercase">Breathe In</p>
        </div>

        <div className="space-y-2">
          <h1 className="text-slate-900 text-4xl font-bold tracking-tight">Morning Calm</h1>
          <p className="text-slate-500 text-base">Guided Meditation</p>
        </div>

        <div className="mt-8 flex gap-3">
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-24 items-center justify-center rounded-2xl bg-white/40 backdrop-blur-md border border-white/40">
              <span className="text-slate-900 text-4xl font-bold tabular-nums">10</span>
            </div>
            <span className="mt-2 text-xs text-slate-500 font-medium uppercase tracking-wider">Minutes</span>
          </div>
          <div className="flex h-20 items-center justify-center">
            <span className="text-3xl font-bold text-slate-400">:</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-24 items-center justify-center rounded-2xl bg-white/40 backdrop-blur-md border border-white/40">
              <span className="text-slate-900 text-4xl font-bold tabular-nums">00</span>
            </div>
            <span className="mt-2 text-xs text-slate-500 font-medium uppercase tracking-wider">Seconds</span>
          </div>
        </div>
      </main>

      <footer className="p-10 pb-24">
        <div className="flex items-center justify-center gap-10">
          <button className="text-slate-600 hover:text-primary transition-colors">
            <RotateCcw size={32} />
          </button>
          <button className="flex size-20 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-transform">
            <Play size={40} fill="currentColor" />
          </button>
          <button className="text-slate-600 hover:text-primary transition-colors">
            <RotateCw size={32} />
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
