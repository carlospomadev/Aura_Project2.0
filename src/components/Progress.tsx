import { ArrowLeft, TrendingUp, Footprints, Moon, Sparkles, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useSupabase } from '../context/SupabaseContext';

interface ProgressProps {
  onBack: () => void;
}

export default function Progress({ onBack }: ProgressProps) {
  const { activities } = useSupabase();

  // Calculate some stats from real activities
  const totalMindfulness = activities
    .filter(a => a.label === 'Mindfulness')
    .reduce((acc, curr) => acc + parseInt(curr.value) || 0, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full"
    >
      <header className="flex items-center p-6 justify-between mt-8">
        <button 
          onClick={onBack}
          className="bg-white dark:bg-slate-800 size-10 flex items-center justify-center rounded-full shadow-sm"
        >
          <ArrowLeft size={20} className="text-slate-900 dark:text-slate-100" />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10 dark:text-white">Your Progress</h2>
      </header>

      <div className="px-6 mb-6">
        <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-full">
          <button className="flex-1 py-2 text-sm font-semibold rounded-full bg-primary text-slate-900">Week</button>
          <button className="flex-1 py-2 text-sm font-semibold rounded-full text-slate-600 dark:text-slate-400">Month</button>
        </div>
      </div>

      <div className="px-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Wellness Score</p>
              <h3 className="text-4xl font-bold dark:text-white">82<span className="text-lg text-slate-400">/100</span></h3>
            </div>
            <div className="bg-primary/20 text-emerald-700 dark:text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingUp size={14} /> +5%
            </div>
          </div>
          
          <div className="relative h-40 w-full mb-4">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2bee8c" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2bee8c" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,35 Q15,30 25,32 T50,15 T75,20 T100,5 V40 H0 Z" fill="url(#chartGradient)" />
              <path d="M0,35 Q15,30 25,32 T50,15 T75,20 T100,5" fill="none" stroke="#2bee8c" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
          
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
            <span>Dom</span>
          </div>
        </div>
      </div>

      <div className="px-6 mb-8">
        <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Métricas Detalladas</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                <Footprints size={18} className="text-blue-500 dark:text-blue-400" />
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Pasos</span>
            </div>
            <p className="text-xl font-bold dark:text-white">54,230</p>
            <p className="text-[10px] text-emerald-500 font-bold">+12% vs ayer</p>
            <div className="mt-3 h-8 w-full bg-slate-50 dark:bg-slate-900/50 rounded flex items-end px-1 gap-1">
              <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded-t-full h-1/2"></div>
              <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded-t-full h-2/3"></div>
              <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded-t-full h-1/3"></div>
              <div className="flex-1 bg-blue-400 dark:bg-blue-600 rounded-t-full h-full"></div>
              <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded-t-full h-3/4"></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full">
                <Moon size={18} className="text-indigo-500 dark:text-indigo-400" />
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Sueño</span>
            </div>
            <p className="text-xl font-bold dark:text-white">7h 45m</p>
            <p className="text-[10px] text-slate-400 font-medium">Promedio semanal</p>
            <div className="mt-3 h-8 w-full bg-slate-50 dark:bg-slate-900/50 rounded flex items-end px-1 gap-1">
              <div className="flex-1 bg-indigo-400 dark:bg-indigo-600 rounded-t-full h-3/4"></div>
              <div className="flex-1 bg-indigo-200 dark:bg-indigo-800 rounded-t-full h-1/2"></div>
              <div className="flex-1 bg-indigo-400 dark:bg-indigo-600 rounded-t-full h-full"></div>
              <div className="flex-1 bg-indigo-200 dark:bg-indigo-800 rounded-t-full h-2/3"></div>
              <div className="flex-1 bg-indigo-400 dark:bg-indigo-600 rounded-t-full h-5/6"></div>
            </div>
          </div>

          <div className="col-span-2 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary">
                <Sparkles size={24} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block uppercase">Mindfulness</span>
                <p className="text-xl font-bold dark:text-white">{totalMindfulness} <span className="text-sm font-normal text-slate-400">total minutes</span></p>
              </div>
            </div>
            <div className="bg-primary size-10 rounded-full flex items-center justify-center">
              <Plus size={24} className="text-slate-900" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mb-24">
        <div className="bg-slate-900 dark:bg-primary p-6 rounded-lg text-white dark:text-slate-900 shadow-xl transition-colors">
          <div className="flex items-start gap-4">
            <Sparkles className="text-primary dark:text-slate-900 text-3xl shrink-0" size={32} />
            <div>
              <h5 className="font-bold text-lg mb-1">¡Vas por buen camino!</h5>
              <p className="text-sm opacity-90 leading-relaxed">Has mejorado un 12% respecto a la semana pasada. ¡Sigue así con tus sesiones de meditación!</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
