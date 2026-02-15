
import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Members } from './components/Members';
import { Finance } from './components/Finance';
import { Ministries } from './components/Ministries';
import { SMSManager } from './components/SMSManager';
import { Settings } from './components/Settings';
import { Registration } from './components/Registration';
import { AppState, Church, UserRole } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [state, setState] = useState<AppState>({
    currentChurch: null,
    currentUser: null,
    members: [],
    ministries: [],
    transactions: [],
    smsLogs: [],
  });

  // Load state from localStorage on mount
  useEffect(() => {
    const savedChurch = localStorage.getItem('ecclesia_church');
    const savedMembers = localStorage.getItem('ecclesia_members');
    const savedFinance = localStorage.getItem('ecclesia_finance');
    
    if (savedChurch) {
      const church = JSON.parse(savedChurch);
      setState(prev => ({
        ...prev,
        currentChurch: church,
        members: savedMembers ? JSON.parse(savedMembers) : [],
        transactions: savedFinance ? JSON.parse(savedFinance) : [],
      }));
      setIsAuthenticated(true);
    }
  }, []);

  const handleRegister = (churchData: Church, adminData: any) => {
    setState(prev => ({
      ...prev,
      currentChurch: churchData,
      currentUser: adminData,
    }));
    localStorage.setItem('ecclesia_church', JSON.stringify(churchData));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
    // In a real app, we'd clear sessions here
  };

  if (!isAuthenticated) {
    return <Registration onComplete={handleRegister} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard state={state} />;
      case 'members':
        return <Members state={state} setState={setState} />;
      case 'finance':
        return <Finance state={state} setState={setState} />;
      case 'ministries':
        return <Ministries state={state} setState={setState} />;
      case 'sms':
        return <SMSManager state={state} setState={setState} />;
      case 'settings':
        return <Settings state={state} onLogout={handleLogout} />;
      default:
        return <Dashboard state={state} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setCurrentView={setCurrentView} 
      churchName={state.currentChurch?.name || 'EcclesiaPro'}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
