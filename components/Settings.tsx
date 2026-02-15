
import React from 'react';
import { 
  Building, 
  Shield, 
  Palette, 
  Globe, 
  Bell, 
  Database,
  Smartphone,
  CreditCard
} from 'lucide-react';
import { AppState } from '../types';

export const Settings: React.FC<{ state: AppState, onLogout: () => void }> = ({ state, onLogout }) => {
  const sections = [
    { id: 'general', label: 'Church Profile', icon: Building, desc: 'Update church name, address, and logo.' },
    { id: 'users', label: 'Users & Permissions', icon: Shield, desc: 'Manage staff accounts and access levels.' },
    { id: 'theme', label: 'Appearance', icon: Palette, desc: 'Custom branding and dashboard colors.' },
    { id: 'sms', label: 'SMS Gateway', icon: Smartphone, desc: 'Configure SMS provider and API keys.' },
    { id: 'billing', label: 'Subscription', icon: CreditCard, desc: 'Manage your SaaS plan and payments.' },
    { id: 'backup', label: 'Data & Backups', icon: Database, desc: 'Export church data and manage backups.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
        <p className="text-slate-500">Configure EcclesiaPro for your specific needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <button 
            key={section.id}
            className="text-left glass-card p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
          >
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 w-fit mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <section.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">{section.label}</h3>
            <p className="text-sm text-slate-500 mt-1">{section.desc}</p>
          </button>
        ))}
      </div>

      <div className="glass-card p-8 rounded-3xl border border-rose-100 bg-rose-50/30">
        <h3 className="text-lg font-bold text-rose-800 mb-2">Danger Zone</h3>
        <p className="text-sm text-rose-600 mb-6">Irreversible actions that affect your church's digital presence.</p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onLogout}
            className="px-6 py-3 bg-white border border-rose-200 text-rose-700 rounded-xl font-bold hover:bg-rose-50 transition-all"
          >
            Switch Account
          </button>
          <button className="px-6 py-3 bg-rose-600 text-white rounded-xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all">
            Delete Church Account
          </button>
        </div>
      </div>
    </div>
  );
};
