
import React, { useMemo } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';
import { AppState, TransactionType } from '../types';

const data = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
];

export const Dashboard: React.FC<{ state: AppState }> = ({ state }) => {
  const stats = useMemo(() => {
    const totalIncome = state.transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = state.transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    return [
      { label: 'Total Members', value: state.members.length || 124, icon: Users, color: 'indigo', trend: '+12%' },
      { label: 'Total Tithes', value: `$${totalIncome.toLocaleString() || '12,450'}`, icon: DollarSign, color: 'emerald', trend: '+8.4%' },
      { label: 'Pending Pledges', value: '$4,200', icon: TrendingUp, color: 'purple', trend: '-2.1%' },
      { label: 'Active Programs', value: '12', icon: Calendar, color: 'orange', trend: '0%' },
    ];
  }, [state]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome Back!</h2>
          <p className="text-slate-500">Here's what's happening at {state.currentChurch?.name}.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Calendar size={18} />
          Create Event
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                stat.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
              }`}>
                {stat.trend.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Financial Overview</h3>
            <select className="text-sm border-none bg-slate-100 rounded-lg px-3 py-1 text-slate-600 outline-none">
              <option>Last 6 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorIncome)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Activities</h3>
          <div className="space-y-6">
            {[
              { type: 'member', title: 'New Member Joined', time: '2 hours ago', desc: 'Sarah Williams just registered.' },
              { type: 'finance', title: 'Tithe Received', time: '5 hours ago', desc: 'A payment of $500 was recorded.' },
              { type: 'sms', title: 'Bulk SMS Sent', time: '1 day ago', desc: 'Weekly newsletter delivered to 450 members.' },
              { type: 'event', title: 'Event Updated', time: '2 days ago', desc: 'Youth Camp 2024 venue changed.' }
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${
                  activity.type === 'member' ? 'bg-indigo-500' : 
                  activity.type === 'finance' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}></div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{activity.title}</h4>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                  <p className="text-sm text-slate-600 mt-1">{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};
