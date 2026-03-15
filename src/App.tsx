import { useState } from 'react';
import { Screen } from './types';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Mindfulness from './components/Mindfulness';
import Progress from './components/Progress';
import BottomNav from './components/BottomNav';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <Dashboard />;
      case 'profile':
        return <Profile onBack={() => setActiveScreen('home')} />;
      case 'mindfulness':
        return <Mindfulness onBack={() => setActiveScreen('home')} />;
      case 'stats':
        return <Progress onBack={() => setActiveScreen('home')} />;
      case 'goals':
        // For this demo, goals can show the profile view as it contains goals
        return <Profile onBack={() => setActiveScreen('home')} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-slate-100">
      <div className="relative w-full max-w-[430px] min-h-screen bg-background-light flex flex-col shadow-2xl overflow-hidden">
        {renderScreen()}
        
        {activeScreen !== 'mindfulness' && (
          <BottomNav 
            activeScreen={activeScreen} 
            onNavigate={setActiveScreen} 
          />
        )}

        {/* iOS Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 rounded-full"></div>
      </div>
    </div>
  );
}
