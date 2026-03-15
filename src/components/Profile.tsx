import { ArrowLeft, Share2, Edit2, Droplets, Moon, Footprints, Settings, ChevronRight, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useSupabase } from '../context/SupabaseContext';

interface ProfileProps {
  onBack: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Profile({ onBack, isDarkMode, onToggleDarkMode }: ProfileProps) {
  const { user, goals: dbGoals, addGoal } = useSupabase();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', target: 0, unit: '' });

  const defaultGoals = [
    {
      id: '1',
      title: 'Drink 2L Water',
      subtitle: '1.5L of 2.0L completed',
      progress: 75,
      icon: Droplets,
      color: 'bg-primary',
      iconBg: 'bg-primary/20',
      iconColor: 'text-primary'
    },
    {
      id: '2',
      title: '8 Hours Sleep',
      subtitle: '6.5h of 8h tracked',
      progress: 81,
      icon: Moon,
      color: 'bg-blue-500',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-500 dark:text-blue-400'
    },
    {
      id: '3',
      title: '10,000 Steps',
      subtitle: '4,200 steps today',
      progress: 42,
      icon: Footprints,
      color: 'bg-orange-500',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-500 dark:text-orange-400'
    }
  ];

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.target) return;
    
    await addGoal({
      title: newGoal.title,
      target: Number(newGoal.target),
      current: 0,
      unit: newGoal.unit,
      color: 'bg-primary',
      icon: 'Droplets'
    });
    
    setNewGoal({ title: '', target: 0, unit: '' });
    setShowAddGoal(false);
  };

  const displayGoals = dbGoals.length > 0
    ? dbGoals.map(g => ({
        ...g,
        subtitle: `${g.current || 0}${g.unit || ''} of ${g.target}${g.unit || ''} completed`,
        progress: Math.round(((g.current || 0) / g.target) * 100),
        icon: Droplets, // Default icon
        iconBg: 'bg-primary/20',
        iconColor: 'text-primary',
        color: g.color || 'bg-primary'
      }))
    : defaultGoals;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col h-full"
    >
      <header className="flex items-center justify-between px-6 py-4 mt-8">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm"
        >
          <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
        </button>
        <h1 className="text-xl font-bold tracking-tight dark:text-white">Aura Profile</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm">
            <Share2 size={20} className="text-slate-700 dark:text-slate-200" />
          </button>
        </div>
      </header>

      <div className="flex flex-col items-center px-6 pt-6 pb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-primary p-1">
            <div className="w-full h-full rounded-full bg-cover bg-center overflow-hidden">
              <img 
                src={user?.user_metadata?.avatar_url || "https://picsum.photos/seed/user/200/200"} 
                alt={user?.user_metadata?.full_name || "User"}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 bg-primary text-slate-900 p-1.5 rounded-full border-2 border-white dark:border-background-dark">
            <Edit2 size={14} strokeWidth={3} />
          </div>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.user_metadata?.full_name || "User"}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Mindfulness Explorer • Level 1</p>
        </div>
      </div>

      <div className="flex-1 px-6 pb-24 overflow-y-auto">
        <div className="flex items-center justify-between mb-4 mt-2">
          <h3 className="text-lg font-bold dark:text-white">Active Goals</h3>
          <button 
            onClick={() => setShowAddGoal(!showAddGoal)}
            className="text-primary font-semibold text-sm flex items-center gap-1"
          >
            {showAddGoal ? 'Cancel' : <><Plus size={16} /> Add Goal</>}
          </button>
        </div>

        {showAddGoal && (
          <motion.form 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            onSubmit={handleAddGoal}
            className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3"
          >
            <input 
              type="text" 
              placeholder="Goal Title (e.g. Daily Walk)"
              className="w-full p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white outline-none focus:border-primary"
              value={newGoal.title}
              onChange={e => setNewGoal({...newGoal, title: e.target.value})}
              required
            />
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Target"
                className="flex-1 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white outline-none focus:border-primary"
                value={newGoal.target || ''}
                onChange={e => setNewGoal({...newGoal, target: Number(e.target.value)})}
                required
              />
              <input 
                type="text" 
                placeholder="Unit (e.g. km)"
                className="w-24 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white outline-none focus:border-primary"
                value={newGoal.unit}
                onChange={e => setNewGoal({...newGoal, unit: e.target.value})}
              />
            </div>
            <button type="submit" className="w-full py-3 bg-primary text-slate-900 font-bold rounded-lg shadow-sm">
              Save Goal
            </button>
          </motion.form>
        )}

        <div className="space-y-4">
          {displayGoals.map((goal) => (
            <div key={goal.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                  <div className={`w-10 h-10 rounded-full ${goal.iconBg} flex items-center justify-center`}>
                    <goal.icon size={20} className={goal.iconColor} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{goal.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{goal.subtitle}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${goal.iconBg} ${goal.iconColor}`}>
                  {goal.progress}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className={`${goal.color} h-full rounded-full`} style={{ width: `${goal.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 mb-4">
          <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 group active:scale-95 transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <Settings size={20} className="text-slate-600 dark:text-slate-300" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white">Settings</span>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
