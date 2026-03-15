export type Screen = 'home' | 'goals' | 'stats' | 'profile' | 'mindfulness';

export interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
  color: string;
  icon: string;
}

export interface Activity {
  id: string;
  label: string;
  value: string;
  subValue: string;
  icon: string;
  bgColor: string;
  textColor: string;
}
