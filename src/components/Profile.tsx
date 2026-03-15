import { ArrowLeft, Share2, Edit2, Droplets, Moon, Footprints, Settings, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileProps {
  onBack: () => void;
}

export default function Profile({ onBack }: ProfileProps) {
  const goals = [
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
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500'
    },
    {
      id: '3',
      title: '10,000 Steps',
      subtitle: '4,200 steps today',
      progress: 42,
      icon: Footprints,
      color: 'bg-orange-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col h-full"
    >
      <header className="flex items-center justify-between px-6 py-4 mt-8">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ArrowLeft size={20} className="text-slate-700" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Aura Profile</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm">
          <Share2 size={20} className="text-slate-700" />
        </button>
      </header>

      <div className="flex flex-col items-center px-6 pt-6 pb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-primary p-1">
            <div className="w-full h-full rounded-full bg-cover bg-center overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuABagktL59FrXtO9Bb4l4gmqQfACUjFurqDSy1ByZsbuQK7XwkTZYV4Q9Zl-qDFgt20W1YvAf1frE7rETz2PO8Ak7hoFqDNh4PaSJaRoGb3v70Bx7HPgxXS9D_2dHOlF0tKKCjrxUEQUUGfdXKEo-PiMat-KK5i4VfOfhRbcUOD3D3XjT3ePThQ-I-_NEOVONsZStAb7x3D82ntzrKCRTEjxB0sWqss1caixlOcDgcyj7rIiUshZlcmFbErUF-F0kIJSb6y5gpgSJPP" 
                alt="Alex Johnson"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 bg-primary text-slate-900 p-1.5 rounded-full border-2 border-white">
            <Edit2 size={14} strokeWidth={3} />
          </div>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Alex Johnson</h2>
          <p className="text-slate-500 font-medium">Health Enthusiast • Level 12</p>
        </div>
      </div>

      <div className="flex-1 px-6 pb-24 overflow-y-auto">
        <div className="flex items-center justify-between mb-4 mt-2">
          <h3 className="text-lg font-bold">Active Goals</h3>
          <button className="text-primary font-semibold text-sm">View All</button>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                  <div className={`w-10 h-10 rounded-full ${goal.iconBg} flex items-center justify-center`}>
                    <goal.icon size={20} className={goal.iconColor} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{goal.title}</p>
                    <p className="text-xs text-slate-500">{goal.subtitle}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${goal.iconBg} ${goal.iconColor}`}>
                  {goal.progress}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className={`${goal.color} h-full rounded-full`} style={{ width: `${goal.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 mb-4">
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100 group active:scale-95 transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Settings size={20} className="text-slate-600" />
              </div>
              <span className="font-bold text-slate-900">Settings</span>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
