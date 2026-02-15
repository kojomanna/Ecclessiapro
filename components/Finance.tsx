
import React, { useState } from 'react';
import { 
  Plus, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Search, 
  Filter, 
  Calendar,
  FileText
} from 'lucide-react';
import { AppState, TransactionType, TransactionCategory } from '../types';

export const Finance: React.FC<{ state: AppState, setState: any }> = ({ state, setState }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'income' | 'expense'>('all');

  const transactions = state.transactions.length > 0 ? state.transactions : [
    { id: '1', amount: 2500, type: TransactionType.INCOME, category: TransactionCategory.TITHE, date: '2024-03-15', description: 'General Tithes' },
    { id: '2', amount: 800, type: TransactionType.EXPENSE, category: TransactionCategory.UTILITIES, date: '2024-03-14', description: 'Electricity Bill' },
    { id: '3', amount: 1500, type: TransactionType.INCOME, category: TransactionCategory.OFFERING, date: '2024-03-13', description: 'Sunday Offering' },
  ];

  const filtered = transactions.filter(t => {
    if (activeTab === 'all') return true;
    return activeTab === 'income' ? t.type === TransactionType.INCOME : t.type === TransactionType.EXPENSE;
  });

  const summary = {
    income: transactions.filter(t => t.type === TransactionType.INCOME).reduce((s, t) => s + t.amount, 0),
    expense: transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((s, t) => s + t.amount, 0)
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Financial Management</h2>
          <p className="text-slate-500">Track incomes, tithes, and expenditures.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2">
            <FileText size={18} />
            Reports
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2">
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border-l-4 border-emerald-500">
          <div className="flex items-center gap-3 text-emerald-600 mb-2">
            <ArrowUpCircle size={20} />
            <span className="text-sm font-semibold uppercase">Total Income</span>
          </div>
          <div className="text-3xl font-bold text-slate-800">${summary.income.toLocaleString()}</div>
          <p className="text-xs text-slate-400 mt-2">This month so far</p>
        </div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-rose-500">
          <div className="flex items-center gap-3 text-rose-600 mb-2">
            <ArrowDownCircle size={20} />
            <span className="text-sm font-semibold uppercase">Total Expenses</span>
          </div>
          <div className="text-3xl font-bold text-slate-800">${summary.expense.toLocaleString()}</div>
          <p className="text-xs text-slate-400 mt-2">This month so far</p>
        </div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-indigo-500">
          <div className="flex items-center gap-3 text-indigo-600 mb-2">
            <Calendar size={20} />
            <span className="text-sm font-semibold uppercase">Net Balance</span>
          </div>
          <div className="text-3xl font-bold text-slate-800">${(summary.income - summary.expense).toLocaleString()}</div>
          <p className="text-xs text-slate-400 mt-2">Current available funds</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
            {(['all', 'income', 'expense'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                  activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter transactions..."
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Transaction</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((tx: any) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{tx.date}</td>
                  <td className={`px-6 py-4 text-right font-bold ${
                    tx.type === TransactionType.INCOME ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {tx.type === TransactionType.INCOME ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
