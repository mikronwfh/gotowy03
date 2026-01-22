
import React from 'react';
import { TrendingUp, Users, DollarSign, Zap, ArrowRight, Star } from 'lucide-react';
import { BusinessProfile } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 2000, users: 9800 },
  { name: 'Apr', revenue: 2780, users: 3908 },
  { name: 'May', revenue: 1890, users: 4800 },
  { name: 'Jun', revenue: 2390, users: 3800 },
];

interface DashboardProps {
  profile: BusinessProfile;
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, setActiveTab }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold">Welcome back, {profile.name || 'Founder'}</h2>
            <p className="text-indigo-100 mt-2 text-lg">Your business strategy is 85% optimized for {profile.industry}.</p>
          </div>
          <button 
            onClick={() => setActiveTab('copilot')}
            className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors flex items-center gap-2"
          >
            Ask Copilot <Zap className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Potential Revenue', value: '$124,500', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Market Reach', value: '45.2k', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Growth Vector', value: '+22%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'AI Insights', value: '12 New', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1 text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Projected Market Growth</h3>
            <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Recent AI Actions</h3>
          <div className="space-y-6 flex-1">
            {[
              { title: 'Marketing Copy Generated', time: '2h ago', status: 'Success' },
              { title: 'SWOT Analysis Updated', time: '5h ago', status: 'Done' },
              { title: 'New Sales Script', time: '1d ago', status: 'Ready' },
              { title: 'Market Trends Report', time: '2d ago', status: 'Archived' },
            ].map((action, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{action.title}</p>
                    <p className="text-sm text-slate-500">{action.time}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 text-indigo-600 font-semibold text-sm border border-indigo-100 rounded-xl hover:bg-indigo-50 transition-colors">
            View All History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
