import { Bell, Footprints, Moon, Droplets, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const activities = [
    {
      id: '1',
      label: 'Steps today',
      value: '8,432',
      icon: Footprints,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-100'
    },
    {
      id: '2',
      label: 'Last night',
      value: '7h 20m',
      icon: Moon,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100'
    },
    {
      id: '3',
      label: 'Hydration',
      value: '1.8L',
      icon: Droplets,
      bgColor: 'bg-sky-50',
      iconColor: 'text-sky-600',
      borderColor: 'border-sky-100'
    },
    {
      id: '4',
      label: 'Mindfulness',
      value: '15m',
      icon: Sparkles,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-100'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full"
    >
      <header className="flex items-center justify-between px-6 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full overflow-hidden border-2 border-primary/20">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJxi71LcPgyfi3Huwypvn9S_ljzqQiBdfKW5OZHH_4x2Ov-oeM8iXbTKE3R0qot58tT3MByoDEedTdvC0jHB95OIGH4rjr3LE7PT36oCvFuElXOpr-FZRXpSZoKVD3G76sCRuZQva2RSIbgMvq-cr-0dQCxexCgo-l9LGZMwqy7J963dSWvNWDOxlUuge8Xadrc1sGSwkKzUu8JO-rPy_YX0NSe8Y5vtqfMEKWZtVv6jlmcMiLFgMI5oE1ztbxtl9oR1LdZtclH51b" 
              alt="Alex Rivera"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-light">Good morning,</p>
            <h1 className="text-xl font-semibold tracking-tight">Alex Rivera</h1>
          </div>
        </div>
        <button className="size-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600">
          <Bell size={20} />
        </button>
      </header>

      <main className="flex-1 px-6 pb-24">
        <div className="mt-4 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/30 border border-primary/20 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-slate-600 text-sm font-medium uppercase tracking-wider">Wellness Score</p>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-6xl font-bold text-slate-900 leading-none">85</span>
              <span className="text-primary font-semibold mb-1">Excellent</span>
            </div>
            <p className="mt-4 text-slate-600 text-sm max-w-[200px]">You're doing better than 92% of users today!</p>
            <button className="mt-6 px-5 py-2.5 bg-primary text-slate-900 font-semibold rounded-full text-sm shadow-sm">
              View Insights
            </button>
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-24 h-24 bg-white/40 rounded-full blur-xl"></div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Activity</h2>
            <button className="text-primary text-sm font-medium">Show all</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className={`p-4 rounded-xl ${activity.bgColor} border ${activity.borderColor} flex flex-col justify-between aspect-square`}
              >
                <div className="size-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <activity.icon size={20} className={activity.iconColor} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{activity.value}</p>
                  <p className="text-slate-500 text-xs">{activity.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-5 bg-slate-900 rounded-xl text-white flex items-center gap-4">
          <div className="size-14 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
            <Sparkles className="text-primary" size={28} />
          </div>
          <div>
            <h4 className="font-medium text-sm">Quick Tip</h4>
            <p className="text-xs text-slate-300 mt-1">Taking a 5-minute walk now will help you reach your daily goal.</p>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
