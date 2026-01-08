
import React, { useState } from 'react';

interface DashboardProps {
  user: { name: string, email: string };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [isLive, setIsLive] = useState(true);
  const [isPlugOffModalOpen, setIsPlugOffModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Authorization check: Only this specific email sees the active instance
  const isAuthorized = user.email.toLowerCase() === 'zaidu2619@gmail.com';

  const handleToggleCode = () => {
    if (!isAuthorized) return;
    setLoading(true);
    setTimeout(() => {
      setIsLive(!isLive);
      setLoading(false);
      setIsPlugOffModalOpen(false);
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Manage Your Code</h1>
          <p className="text-slate-400">
            {isAuthorized 
              ? 'Monitor and control your PayloadX deployment.' 
              : 'You currently have no active deployments linked to this account.'}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-2xl border border-slate-700/50">
          <div className={`w-3 h-3 rounded-full ${isAuthorized && isLive ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
          <span className="text-sm font-bold text-slate-300">
            System Status: {isAuthorized ? (isLive ? 'Operational' : 'Disconnected') : 'Not Configured'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscription Info */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${isAuthorized ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-700/50 text-slate-500'}`}>
              <i className={`fa-solid ${isAuthorized ? 'fa-crown' : 'fa-user'}`}></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">{isAuthorized ? 'Premium Plan' : 'Standard Account'}</h3>
              <p className="text-slate-500 text-sm">{isAuthorized ? 'One-Time Fee Paid' : 'No Purchase Detected'}</p>
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
                {isAuthorized ? 'LIFETIME ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            {isAuthorized && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Price</label>
                  <p className="text-2xl font-bold text-white">£120.00</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Purchased On</label>
                  <p className="text-lg font-medium text-slate-200">October 24, 2024</p>
                </div>
              </>
            )}
            {!isAuthorized && (
              <div className="pt-4">
                <p className="text-sm text-slate-400 italic mb-4">
                  Purchase the PayloadX Premium distribution to see your instance here.
                </p>
                <button className="w-full py-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 rounded-xl font-bold transition-all text-sm">
                  View Pricing
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Deployment Info */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
            <div>
              <h3 className="text-xl font-bold">Instance Details</h3>
              <p className="text-sm text-slate-400">
                {isAuthorized ? 'Current active connection details.' : 'Pending deployment configuration.'}
              </p>
            </div>
            {isAuthorized && (
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Version</p>
                <p className="text-indigo-400 font-mono font-bold">v2.4.1-stable</p>
              </div>
            )}
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
            <div className="space-y-6">
              {isAuthorized ? (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Primary Domain</label>
                    <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <i className="fa-solid fa-link text-indigo-400"></i>
                      <span className="font-mono text-sm text-slate-200">https://chefiestameals.com/</span>
                      <a 
                        href="https://chefiestameals.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ml-auto text-slate-500 hover:text-white transition-colors"
                      >
                        <i className="fa-solid fa-up-right-from-square text-xs"></i>
                      </a>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">API Endpoint</label>
                    <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <i className="fa-solid fa-code text-indigo-400"></i>
                      <span className="font-mono text-sm text-slate-200">/api/graphql</span>
                      <button className="ml-auto text-slate-500 hover:text-white transition-colors">
                        <i className="fa-solid fa-copy text-xs"></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">GitHub Repository</label>
                    <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <i className="fa-brands fa-github text-indigo-400"></i>
                      <span className="font-mono text-sm text-slate-200 truncate">Zaid365/payload-cms</span>
                      <a 
                        href="https://github.com/Zaid365/payload-cms.git" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ml-auto text-slate-500 hover:text-white transition-colors"
                      >
                        <i className="fa-solid fa-up-right-from-square text-xs"></i>
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-800 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-600 mb-4">
                    <i className="fa-solid fa-box-open text-xl"></i>
                  </div>
                  <h4 className="font-bold text-slate-400 mb-1">No Instance Active</h4>
                  <p className="text-xs text-slate-600 max-w-[200px]">
                    Once you purchase a license, your instance details will appear here.
                  </p>
                </div>
              )}
            </div>

            <div className={`bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50 flex flex-col justify-between ${!isAuthorized && 'opacity-50 grayscale'}`}>
              <div>
                <h4 className="font-bold text-slate-300 mb-2">Connection Health</h4>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-grow h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: (isAuthorized && isLive) ? '99.9%' : '0%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-indigo-400">{(isAuthorized && isLive) ? '99.9%' : '0%'}</span>
                </div>
                <p className="text-xs text-slate-500">Last ping: {(isAuthorized && isLive) ? '2 minutes ago' : 'N/A'}</p>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => isAuthorized && setIsPlugOffModalOpen(true)}
                  disabled={!isAuthorized}
                  className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg ${
                    !isAuthorized 
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : isLive 
                      ? 'bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 shadow-red-500/10' 
                      : 'bg-green-600 hover:bg-green-500 text-white shadow-green-600/20'
                  }`}
                >
                  <i className={`fa-solid ${isLive ? 'fa-plug-circle-xmark' : 'fa-plug-circle-check'}`}></i>
                  {isLive ? 'Plug the Code Off' : 'Re-enable Access'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Mockup */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total API Calls', val: '42.8k', icon: 'fa-globe' },
          { label: 'Database Size', val: '1.2 GB', icon: 'fa-database' },
          { label: 'Media Assets', val: '852', icon: 'fa-image' },
          { label: 'Bandwidth', val: '14.2 GB', icon: 'fa-bolt' }
        ].map((stat, i) => (
          <div key={i} className={`bg-slate-800/20 border border-slate-800 p-6 rounded-2xl ${!isAuthorized && 'opacity-40'}`}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
              <i className={`fa-solid ${stat.icon} text-slate-600 text-xs`}></i>
            </div>
            <p className="text-2xl font-bold text-white">{(isAuthorized && isLive) ? stat.val : '---'}</p>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {isPlugOffModalOpen && isAuthorized && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${isLive ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
              <i className={`fa-solid ${isLive ? 'fa-triangle-exclamation' : 'fa-power-off'} text-2xl`}></i>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
              {isLive ? 'Kill Switch Confirmation' : 'Reactivate Deployment'}
            </h2>
            <p className="text-slate-400 text-center mb-8">
              {isLive 
                ? 'Are you sure you want to disconnect your CMS instance? Your admin panel and API will be immediately unreachable.'
                : 'This will restore access to your CMS admin panel and re-enable all API endpoints.'}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsPlugOffModalOpen(false)}
                className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleToggleCode}
                disabled={loading}
                className={`flex-1 py-4 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
                  isLive ? 'bg-red-600 hover:bg-red-500 shadow-red-600/20' : 'bg-green-600 hover:bg-green-500 shadow-green-600/20'
                }`}
              >
                {loading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : (isLive ? 'Deactivate' : 'Activate')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
