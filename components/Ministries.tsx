
import React from 'react';
import { LayoutGrid, Users, Settings, Plus, ArrowRight } from 'lucide-react';
import { AppState } from '../types';

export const Ministries: React.FC<{ state: AppState, setState: any }> = ({ state, setState }) => {
  const departments = [
    { name: 'Worship Team', members: 15, leader: 'John Mark', color: 'bg-blue-500' },
    { name: 'Youth Ministry', members: 42, leader: 'Sarah Wilson', color: 'bg-purple-500' },
    { name: 'Children Department', members: 28, leader: 'Emily Davis', color: 'bg-pink-500' },
    { name: 'Ushering Team', members: 12, leader: 'Robert Brown', color: 'bg-emerald-500' },
    { name: 'Media & Tech', members: 8, leader: 'James Tech', color: 'bg-slate-700' },
    { name: 'Welfare Committee', members: 20, leader: 'Grace Peters', color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Departments & Ministries</h2>
          <p className="text-slate-500">Organize your congregation into functional teams.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Plus size={18} />
          New Ministry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group border-b-4 border-slate-100">
            <div className="flex items-start justify-between mb-6">
              <div className={`w-12 h-12 rounded-xl ${dept.color} flex items-center justify-center text-white shadow-lg`}>
                <LayoutGrid size={24} />
              </div>
              <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
                <Settings size={18} />
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-1">{dept.name}</h3>
            <p className="text-sm text-slate-500 mb-6 flex items-center gap-2">
              <Users size={14} />
              {dept.members} active members
            </p>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 border border-white" />
                <div className="text-xs">
                  <p className="text-slate-400 font-medium">LEADER</p>
                  <p className="text-slate-700 font-bold">{dept.leader}</p>
                </div>
              </div>
              <button className="text-indigo-600 hover:translate-x-1 transition-transform">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
