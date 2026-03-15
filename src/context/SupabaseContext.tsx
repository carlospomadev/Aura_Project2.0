import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../supabase';
import { User } from '@supabase/supabase-js';
import { Goal, Activity } from '../types';

interface SupabaseContextType {
  user: User | null;
  loading: boolean;
  goals: Goal[];
  activities: Activity[];
  login: () => Promise<void>;
  logout: () => Promise<void>;
  addGoal: (goal: Omit<Goal, 'id'>) => Promise<void>;
  addActivity: (activity: Omit<Activity, 'id'>) => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || !isSupabaseConfigured) {
      setGoals([]);
      setActivities([]);
      return;
    }

    // Initial fetch
    fetchGoals();
    fetchActivities();

    // Set up real-time subscriptions
    const goalsChannel = supabase
      .channel('public:goals')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'goals', filter: `user_id=eq.${user.id}` }, () => {
        fetchGoals();
      })
      .subscribe();

    const activitiesChannel = supabase
      .channel('public:activities')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'activities', filter: `user_id=eq.${user.id}` }, () => {
        fetchActivities();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(goalsChannel);
      supabase.removeChannel(activitiesChannel);
    };
  }, [user]);

  const fetchGoals = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching goals:', error);
    else setGoals(data as Goal[]);
  };

  const fetchActivities = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching activities:', error);
    else setActivities(data as Activity[]);
  };

  const login = async () => {
    if (!isSupabaseConfigured) {
      alert('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) console.error('Login error:', error);
  };

  const logout = async () => {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error);
  };

  const addGoal = async (goal: Omit<Goal, 'id'>) => {
    if (!user || !isSupabaseConfigured) return;
    const { error } = await supabase
      .from('goals')
      .insert([{ ...goal, user_id: user.id }]);
    
    if (error) console.error('Error adding goal:', error);
  };

  const addActivity = async (activity: Omit<Activity, 'id'>) => {
    if (!user || !isSupabaseConfigured) return;
    const { error } = await supabase
      .from('activities')
      .insert([{ ...activity, user_id: user.id }]);
    
    if (error) console.error('Error adding activity:', error);
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Supabase Not Configured</h1>
          <p className="text-slate-600 mb-8">
            Please add the following environment variables in the <strong>Settings</strong> menu:
          </p>
          <div className="space-y-3 text-left mb-8">
            <div className="p-3 bg-slate-50 rounded-lg font-mono text-sm border border-slate-200">VITE_SUPABASE_URL</div>
            <div className="p-3 bg-slate-50 rounded-lg font-mono text-sm border border-slate-200">VITE_SUPABASE_ANON_KEY</div>
          </div>
          <p className="text-sm text-slate-500">
            Once added, the application will automatically connect to your Supabase backend.
          </p>
        </div>
      </div>
    );
  }

  return (
    <SupabaseContext.Provider value={{ user, loading, goals, activities, login, logout, addGoal, addActivity }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
