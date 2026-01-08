
import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { verifyBeforeUpdateEmail } from 'firebase/auth';

interface DashboardProps {
  user: { name: string, email: string };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [isLive, setIsLive] = useState(true);
  const [isPlugOffModalOpen, setIsPlugOffModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailUpdateStatus, setEmailUpdateStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // List of authorized emails that have purchased the premium product
  const authorizedEmails = [
    'zaidu2619@gmail.com',
    'chuks@chefiesta.com'
  ];

  // Authorization check: Only these specific emails see the active instance and premium features
  const isAuthorized = authorizedEmails.includes(user.email.toLowerCase());

  const handleToggleCode = () => {
    if (!isAuthorized) return;
    setLoading(true);
    // Simulate API call to the "Kill Switch"
    setTimeout(() => {
      setIsLive(!isLive);
      setLoading(false);
      setIsPlugOffModalOpen(false);
    }, 1500);
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setLoading(true);
    setEmailUpdateStatus(null);

    try {
      // Firebase verifyBeforeUpdateEmail sends a confirmation link to the new email
      await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
      setEmailUpdateStatus({
        type: 'success',
        message: 'A confirmation link has been sent to your new email. Please verify it to complete the change.'
      });
      setNewEmail('');
    } catch (err: any) {
      console.error(err);
      setEmailUpdateStatus({
        type: 'error',
        message: err.message || 'Failed to initiate email change. Security rules may require a recent login.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-in slide-in-from-left-4 duration-500">
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Manage Your Code</h1>
          <p className="text-slate-400">
            {isAuthorized 
              ? `Welcome back, ${user.name}. Your PayloadX instance is active.` 
              : 'You currently have no active deployments linked to this account.'}
          </p>
        </div>
        <div className="flex items-center gap-4 animate-in slide-in-from-right-4 duration-500">
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700 transition-all text-sm font-medium"
          >
            <i className="fa-solid fa-gear"></i> Settings
          </button>
          <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-2xl border border-slate-700/50 shadow-inner">
            <div className={`w-3 h-3 rounded-full ${isAuthorized && isLive ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
            <span className="text-sm font-bold text-slate-300">
              System: {isAuthorized ? (isLive ? 'Operational' : 'Paused') : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <div className="mb-8 p-8 bg-slate-800/40 border border-slate-700 rounded-3xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Account Security</h3>
            <button onClick={() => setIsSettingsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="max-w-md">
            <form onSubmit={handleChangeEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Primary Email</label>
                <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl text-slate-400 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-slate-600"></i>
                  {user.email}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">New Email Address</label>
                <div className="flex gap-2">
                  <input 
                    required
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="new@domain.com"
                    className="flex-grow bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all"
                  />
                  <button 
                    disabled={loading || !newEmail}
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20"
                  >
                    {loading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : 'Update'}
                  </button>
                </div>
              </div>
              {emailUpdateStatus && (
                <div className={`p-3 rounded-xl text-xs flex items-start gap-2 animate-in fade-in duration-300 ${
                  emailUpdateStatus.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  <i className={`fa-solid mt-0.5 ${emailUpdateStatus.type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i>
                  {emailUpdateStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscription Info Card */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 flex flex-col shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${isAuthorized ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20' : 'bg-slate-700/50 text-slate-500'}`}>
              <i className={`fa-solid ${isAuthorized ? 'fa-crown' : 'fa-user'}`}></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">{isAuthorized ? 'PayloadX Premium' : 'Free Tier'}</h3>
              <p className="text-slate-500 text-sm font-medium">{isAuthorized ? 'Lifetime License Active' : 'Basic Account'}</p>
            </div>
          </div>
          
          <div className="space-y-6 flex-grow">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Status</label>
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                isAuthorized 
                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                : 'bg-slate-700/50 text-slate-500 border-slate-700'
              }`}>
                {isAuthorized ? 'PURCHASED - LIVE' : 'UNPAID'}
              </span>
            </div>
            
            {isAuthorized ? (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">One-Time Fee</label>
                  <p className="text-3xl font-extrabold text-white">£120.00</p>
                </div>
                <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-1 uppercase tracking-tighter">
                    <i className="fa-solid fa-certificate"></i> Premium Benefits
                  </div>
                  <ul className="text-[11px] text-slate-400 space-y-1">
                    <li>• Lifetime software updates</li>
                    <li>• Private repository access</li>
                    <li>• Priority security patches</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="pt-4">
                <p className="text-sm text-slate-400 italic mb-4 leading-relaxed">
                  Your account has no active PayloadX licenses. Purchase the £120 one-time distribution to unlock your dashboard.
                </p>
                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30">
                  Upgrade Now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Deployment Info Card */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
          <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
            <div>
              <h3 className="text-xl font-bold">Cloud Instance Details</h3>
              <p className="text-sm text-slate-400">
                {isAuthorized ? 'Active connection for your headless distribution.' : 'Awaiting license activation...'}
              </p>
            </div>
            {isAuthorized && (
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Version</p>
                <p className="text-indigo-400 font-mono font-bold px-2 py-0.5 bg-indigo-400/10 rounded-lg">v2.4.1-stable</p>
              </div>
            )}
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
            <div className="space-y-6">
              {isAuthorized ? (
                <>
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Primary Domain</label>
                    <div className="flex items-center gap-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 group hover:border-indigo-500 transition-colors">
                      <i className="fa-solid fa-link text-indigo-400"></i>
                      <span className="font-mono text-sm text-slate-200 truncate">https://chefiestameals.com/</span>
                      <a href="https://chefiestameals.com/" target="_blank" rel="noopener noreferrer" className="ml-auto text-slate-500 hover:text-white transition-colors">
                        <i className="fa-solid fa-up-right-from-square text-xs"></i>
                      </a>
                    </div>
                  </div>
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">GitHub Repository</label>
                    <div className="flex items-center gap-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 group hover:border-indigo-500 transition-colors">
                      <i className="fa-brands fa-github text-indigo-400"></i>
                      <span className="font-mono text-sm text-slate-200 truncate">Zaid365/payload-cms</span>
                      <a href="https://github.com/Zaid365/payload-cms.git" target="_blank" rel="noopener noreferrer" className="ml-auto text-slate-500 hover:text-white transition-colors">
                        <i className="fa-solid fa-up-right-from-square text-xs"></i>
                      </a>
                    </div>
                  </div>
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Admin Panel</label>
                    <div className="flex items-center gap-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 group hover:border-indigo-500 transition-colors">
                      <i className="fa-solid fa-shield-halved text-indigo-400"></i>
                      <span className="font-mono text-sm text-slate-200 truncate">chefiestameals.com/admin</span>
                      <button className="ml-auto text-slate-500 hover:text-white transition-colors">
                        <i className="fa-solid fa-lock text-xs"></i>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center p-8 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/50">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-600 mb-6 shadow-inner">
                    <i className="fa-solid fa-lock text-2xl"></i>
                  </div>
                  <h4 className="font-bold text-slate-300 mb-2">Premium Content Hidden</h4>
                  <p className="text-xs text-slate-500 max-w-[240px] leading-relaxed">
                    No active distribution found for this account. Your domain and repository links will appear here after purchase.
                  </p>
                </div>
              )}
            </div>

            <div className={`bg-slate-800/30 rounded-3xl p-6 border border-slate-700/50 flex flex-col justify-between shadow-inner ${!isAuthorized && 'opacity-40 grayscale pointer-events-none'}`}>
              <div>
                <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-wave-square text-indigo-500"></i>
                  Instance Health
                </h4>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-grow h-2.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: (isAuthorized && isLive) ? '99.9%' : '0%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-indigo-400">{(isAuthorized && isLive) ? '99.9%' : '0%'}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Auto-deploy: {isAuthorized ? 'Enabled' : 'N/A'}
                </p>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => isAuthorized && setIsPlugOffModalOpen(true)}
                  disabled={!isAuthorized}
                  className={`w-full py-5 rounded-2xl font-extrabold transition-all flex items-center justify-center gap-3 shadow-xl ${
                    !isAuthorized 
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : isLive 
                      ? 'bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30' 
                      : 'bg-green-600 hover:bg-green-500 text-white shadow-green-600/30'
                  }`}
                >
                  <i className={`fa-solid ${isLive ? 'fa-power-off' : 'fa-play'}`}></i>
                  {isLive ? 'KILL SWITCH (OFF)' : 'RESTORE ACCESS'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Visualization Mockup */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in duration-700 delay-300">
        {[
          { label: 'API Requests', val: '42.8k', icon: 'fa-globe' },
          { label: 'Storage Used', val: '1.2 GB', icon: 'fa-database' },
          { label: 'Media Assets', val: '852', icon: 'fa-image' },
          { label: 'Total Users', val: '1,204', icon: 'fa-users' }
        ].map((stat, i) => (
          <div key={i} className={`bg-slate-800/20 border border-slate-800 p-6 rounded-2xl hover:bg-slate-800/30 transition-colors group ${!isAuthorized && 'opacity-40 grayscale'}`}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
              <i className={`fa-solid ${stat.icon} text-slate-700 text-xs group-hover:text-indigo-500 transition-colors`}></i>
            </div>
            <p className="text-2xl font-black text-white">{(isAuthorized && isLive) ? stat.val : '--'}</p>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {isPlugOffModalOpen && isAuthorized && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 ${isLive ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
              <i className={`fa-solid ${isLive ? 'fa-triangle-exclamation' : 'fa-power-off'} text-3xl`}></i>
            </div>
            <h2 className="text-2xl font-black text-center mb-4">{isLive ? 'Confirm Termination' : 'Re-activate Code'}</h2>
            <p className="text-slate-400 text-center mb-10 leading-relaxed">
              {isLive 
                ? 'Disconnecting the instance will make your admin panel and API endpoints completely unreachable. Are you sure?' 
                : 'Click below to re-establish the connection to your PayloadX instance.'}
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleToggleCode} 
                disabled={loading} 
                className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${isLive ? 'bg-red-600 hover:bg-red-500 shadow-red-600/20' : 'bg-green-600 hover:bg-green-500 shadow-green-600/20'}`}
              >
                {loading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : (isLive ? 'Confirm Deactivation' : 'Re-activate Now')}
              </button>
              <button 
                onClick={() => setIsPlugOffModalOpen(false)} 
                className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl font-bold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
