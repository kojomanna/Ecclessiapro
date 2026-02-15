
import React, { useState } from 'react';
// Added Plus to imports from lucide-react
import { Send, MessageSquare, History, Bookmark, Users, Plus } from 'lucide-react';
import { AppState } from '../types';

export const SMSManager: React.FC<{ state: AppState, setState: any }> = ({ state, setState }) => {
  const [message, setMessage] = useState('');
  const [recipientType, setRecipientType] = useState('all');

  const templates = [
    { title: 'Service Reminder', text: 'Hi {name}, we look forward to seeing you at church this Sunday at 9:00 AM!' },
    { title: 'Birthday Wish', text: 'Happy Birthday {name}! May God bless your new age abundantly. - EcclesiaPro' },
    { title: 'Event Invitation', text: 'Join us for our upcoming Youth Camp from April 20-22. Register now!' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">SMS System</h2>
          <p className="text-slate-500">Reach your congregation instantly via SMS.</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
          <span className="text-xs font-bold text-amber-700">BALANCE: 2,450 Units</span>
          <button className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded font-medium">Top Up</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl shadow-sm space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare size={20} className="text-indigo-600" />
              Compose Message
            </h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Recipients</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Members', icon: Users },
                  { id: 'leaders', label: 'Leaders Only', icon: Users },
                  { id: 'youth', label: 'Youth Ministry', icon: Users },
                  { id: 'custom', label: 'Custom List', icon: Plus },
                ].map(r => (
                  <button 
                    key={r.id}
                    onClick={() => setRecipientType(r.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
                      recipientType === r.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <r.icon size={16} />
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase">Message Content</label>
                <span className="text-xs text-slate-400">{message.length}/160 characters (1 unit)</span>
              </div>
              <textarea 
                rows={5}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                placeholder="Type your message here..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                <Send size={18} />
                Send Message Now
              </button>
              <button className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                Schedule
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Bookmark size={20} className="text-indigo-600" />
              Templates
            </h3>
            <div className="space-y-3">
              {templates.map((tpl, i) => (
                <button 
                  key={i}
                  onClick={() => setMessage(tpl.text)}
                  className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
                >
                  <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-700">{tpl.title}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{tpl.text}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <History size={20} className="text-indigo-600" />
              Recent Logs
            </h3>
            <div className="space-y-4">
              {[
                { to: 'All Members', status: 'Sent', time: 'Yesterday' },
                { to: 'Youth Ministry', status: 'Delivered', time: '2 days ago' },
                { to: 'Finance Team', status: 'Failed', time: 'Mar 10' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <div>
                    <p className="text-sm font-bold text-slate-700">{log.to}</p>
                    <p className="text-xs text-slate-400">{log.time}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    log.status === 'Sent' ? 'bg-emerald-100 text-emerald-600' : 
                    log.status === 'Failed' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {log.status}
                  </span>
                </div>
              ))}
              <button className="w-full text-center text-xs font-bold text-indigo-600 hover:underline">View All Logs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
