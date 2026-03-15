import { Home, Target, BarChart2, User, Plus } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as Screen, label: 'Home', icon: Home },
    { id: 'goals' as Screen, label: 'Goals', icon: Target },
    { id: 'stats' as Screen, label: 'Stats', icon: BarChart2 },
    { id: 'profile' as Screen, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 px-6 pt-3 pb-8 flex items-center justify-between z-50 transition-colors">
      {navItems.slice(0, 2).map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeScreen === item.id ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          <item.icon size={24} fill={activeScreen === item.id ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-medium uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}

      <div className="relative -top-6">
        <button 
          onClick={() => onNavigate('mindfulness')}
          className="size-14 bg-primary rounded-full flex items-center justify-center text-slate-900 shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-transform"
        >
          <Plus size={32} />
        </button>
      </div>

      {navItems.slice(2).map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeScreen === item.id ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          <item.icon size={24} fill={activeScreen === item.id ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-medium uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
