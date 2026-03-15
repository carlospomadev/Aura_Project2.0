import { ArrowLeft, MoreHorizontal, Wind, RotateCcw, Play, RotateCw, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useSupabase } from '../context/SupabaseContext';

interface MindfulnessProps {
  onBack: () => void;
}

export default function Mindfulness({ onBack }: MindfulnessProps) {
  const { addActivity } = useSupabase();
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(600); // 10 minutes
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isPlaying && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, seconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return {
      mins: mins.toString().padStart(2, '0'),
      secs: secs.toString().padStart(2, '0')
    };
  };

  const { mins, secs } = formatTime(seconds);

  const handleComplete = async () => {
    const minutesSpent = Math.floor((600 - seconds) / 60) || 1;
    await addActivity({
      label: 'Mindfulness',
      value: `${minutesSpent}m`,
      subValue: 'Guided Meditation',
      icon: 'Sparkles',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400'
    });
    setIsCompleted(true);
    setTimeout(() => onBack(), 2000);
  };

  if (isCompleted) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-primary text-slate-900">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <CheckCircle2 size={80} className="mb-6" />
          <h1 className="text-3xl font-bold">Session Complete!</h1>
          <p className="mt-2 font-medium opacity-80">Your progress has been saved.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-[#ffecd2] via-[#e0c3fc]/30 to-[#f6f8f7] dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 transition-colors duration-500"
    >
      <header className="flex items-center p-6 justify-between z-10 mt-8">
        <button 
          onClick={onBack}
          className="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-md"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-semibold tracking-tight">Mindfulness Session</h2>
        <button className="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-md">
          <MoreHorizontal size={20} />
        </button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="relative flex items-center justify-center mb-12">
          <motion.div 
            animate={{ scale: isPlaying ? [1, 1.2, 1] : 1, opacity: isPlaying ? [0.2, 0.4, 0.2] : 0.2 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          />
          
          <motion.div 
            animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-64 h-64 bg-white/40 dark:bg-primary/10 backdrop-blur-xl border border-white/50 dark:border-primary/20 rounded-full flex flex-col items-center justify-center shadow-2xl"
          >
            <div className="w-48 h-48 bg-primary/40 rounded-full flex items-center justify-center border-4 border-white/30">
              <div className="w-32 h-32 bg-primary rounded-full shadow-lg flex items-center justify-center">
                <Wind className="text-white" size={48} />
              </div>
            </div>
          </motion.div>
          <p className="absolute -bottom-8 text-slate-600 dark:text-slate-400 text-sm font-medium tracking-widest uppercase">
            {isPlaying ? 'Breathe In' : 'Ready?'}
          </p>
        </div>

        <div className="space-y-2">
          <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-bold tracking-tight">Morning Calm</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">Guided Meditation</p>
        </div>

        <div className="mt-8 flex gap-3">
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-24 items-center justify-center rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10">
              <span className="text-slate-900 dark:text-slate-100 text-4xl font-bold tabular-nums">{mins}</span>
            </div>
            <span className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Minutes</span>
          </div>
          <div className="flex h-20 items-center justify-center">
            <span className="text-3xl font-bold text-slate-400">:</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-24 items-center justify-center rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10">
              <span className="text-slate-900 dark:text-slate-100 text-4xl font-bold tabular-nums">{secs}</span>
            </div>
            <span className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Seconds</span>
          </div>
        </div>
      </main>

      <footer className="p-10 pb-24 flex flex-col items-center gap-6">
        {isPlaying && (
          <button 
            onClick={handleComplete}
            className="px-8 py-3 bg-white/20 dark:bg-white/5 backdrop-blur-md border border-white/30 rounded-full text-slate-900 dark:text-white font-bold hover:bg-white/30 transition-colors"
          >
            Finish Session
          </button>
        )}
        <div className="flex items-center justify-center gap-10">
          <button 
            onClick={() => setSeconds(600)}
            className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
          >
            <RotateCcw size={32} />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex size-20 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? <div className="size-8 bg-white rounded-sm" /> : <Play size={40} fill="currentColor" />}
          </button>
          <button className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
            <RotateCw size={32} />
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
