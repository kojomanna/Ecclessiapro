
import React, { useState } from 'react';
import { Church as ChurchIcon, Mail, Phone, MapPin, Globe, CheckCircle, ShieldCheck } from 'lucide-react';
import { Church } from '../types';

interface RegistrationProps {
  onComplete: (church: Church, admin: any) => void;
}

export const Registration: React.FC<RegistrationProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [churchData, setChurchData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
  });
  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [otp, setOtp] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3); // Verification step
      }, 1500);
    }
  };

  const verifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      const newChurch: Church = {
        id: Math.random().toString(36).substr(2, 9),
        name: churchData.name,
        address: churchData.address,
        email: churchData.email,
        phone: churchData.phone,
        website: churchData.website,
        logo: '',
        createdAt: new Date().toISOString(),
      };
      onComplete(newChurch, adminData);
    }, 1500);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side Branding */}
        <div className="md:w-1/3 bg-slate-900 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="bg-indigo-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/40">
              <ChurchIcon size={24} />
            </div>
            <h1 className="text-2xl font-bold mb-4">EcclesiaPro</h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Elevate your ministry with modern management, seamless financials, and data-driven insights.
            </p>
          </div>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <ShieldCheck size={18} className="text-indigo-400" />
              Tenant Isolation
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle size={18} className="text-indigo-400" />
              Instant Onboarding
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:w-2/3 p-8">
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  step >= s ? 'w-10 bg-indigo-600' : 'w-4 bg-slate-200'
                }`} 
              />
            ))}
          </div>

          {step === 1 && (
            <form onSubmit={handleNext} className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
              <h2 className="text-2xl font-bold text-slate-800">Register Church</h2>
              <p className="text-slate-500 text-sm mb-6">Tell us about your congregation.</p>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Church Name</label>
                  <input required type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20" 
                    value={churchData.name} onChange={e => setChurchData({...churchData, name: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input required type="email" className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                        value={churchData.email} onChange={e => setChurchData({...churchData, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input required type="tel" className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                        value={churchData.phone} onChange={e => setChurchData({...churchData, phone: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Physical Address</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input required type="text" className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                      value={churchData.address} onChange={e => setChurchData({...churchData, address: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Website (Optional)</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="url" className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                      value={churchData.website} onChange={e => setChurchData({...churchData, website: e.target.value})} />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                Continue Setup
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
              <h2 className="text-2xl font-bold text-slate-800">Admin Account</h2>
              <p className="text-slate-500 text-sm mb-6">Create the primary administrator for your church.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="First Name" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                  value={adminData.firstName} onChange={e => setAdminData({...adminData, firstName: e.target.value})} />
                <input required placeholder="Last Name" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                  value={adminData.lastName} onChange={e => setAdminData({...adminData, lastName: e.target.value})} />
              </div>
              <input required type="email" placeholder="Email Address" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={adminData.email} onChange={e => setAdminData({...adminData, email: e.target.value})} />
              <input required type="password" placeholder="Password" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={adminData.password} onChange={e => setAdminData({...adminData, password: e.target.value})} />

              <button type="submit" disabled={loading} className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50">
                {loading ? 'Creating Account...' : 'Finish Registration'}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6 text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <Mail size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Verify Your Email</h2>
              <p className="text-slate-500 text-sm">We've sent a code to <span className="font-semibold text-slate-700">{churchData.email}</span>. Please enter it below to verify your account.</p>
              
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4].map(i => (
                  <input key={i} type="text" maxLength={1} className="w-12 h-14 bg-slate-100 border-none text-center text-xl font-bold rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/40" />
                ))}
              </div>

              <button onClick={verifyOtp} disabled={loading} className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                {loading ? 'Verifying...' : 'Complete Verification'}
              </button>
              
              <button className="text-sm text-indigo-600 font-medium hover:underline">
                Didn't receive the code? Resend
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
