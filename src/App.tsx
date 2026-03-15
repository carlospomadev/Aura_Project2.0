import { useState, useEffect } from 'react';
import { Screen } from './types';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Mindfulness from './components/Mindfulness';
import Progress from './components/Progress';
import BottomNav from './components/BottomNav';
import { SupabaseProvider, useSupabase } from './context/SupabaseContext';
import { LogIn } from 'lucide-react';

function AppContent() {
  const { user, loading, login } = useSupabase();
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('aura-theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      document.body.classList.add('dark');
      localStorage.setItem('aura-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      document.body.classList.remove('dark');
      localStorage.setItem('aura-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`flex justify-center min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
        <div className="relative w-full max-w-[430px] min-h-screen bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-8 shadow-2xl overflow-hidden">
          <div className="size-24 bg-primary/20 rounded-3xl flex items-center justify-center mb-8">
            <div className="size-16 bg-primary rounded-2xl flex items-center justify-center text-slate-900">
              <LogIn size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">Welcome to Aura</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-12">Connect your account to start your mindfulness journey.</p>
          <button 
            onClick={login}
            className="w-full py-4 bg-primary text-slate-900 font-bold rounded-2xl shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="size-6" />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <Dashboard isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
      case 'profile':
        return <Profile onBack={() => setActiveScreen('home')} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
      case 'mindfulness':
        return <Mindfulness onBack={() => setActiveScreen('home')} />;
      case 'stats':
        return <Progress onBack={() => setActiveScreen('home')} />;
      case 'goals':
        return <Profile onBack={() => setActiveScreen('home')} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
      default:
        return <Dashboard isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
    }
  };

  return (
    <div className={`flex justify-center min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="relative w-full max-w-[430px] min-h-screen bg-background-light dark:bg-background-dark flex flex-col shadow-2xl overflow-hidden transition-colors duration-300">
        {renderScreen()}
        
        {activeScreen !== 'mindfulness' && (
          <BottomNav 
            activeScreen={activeScreen} 
            onNavigate={setActiveScreen} 
          />
        )}

        {/* iOS Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SupabaseProvider>
      <AppContent />
    </SupabaseProvider>
  );
}
