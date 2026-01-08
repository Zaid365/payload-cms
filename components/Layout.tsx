
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onOpenModal: () => void;
  onOpenAuth: () => void;
  user: { name: string, email: string } | null;
  onLogout: () => void;
  onNavigateDashboard: () => void;
  onNavigateHome: () => void;
  currentView: 'landing' | 'dashboard';
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  onOpenModal, 
  onOpenAuth, 
  user, 
  onLogout, 
  onNavigateDashboard,
  onNavigateHome,
  currentView
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={onNavigateHome}
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold group-hover:bg-indigo-500 transition-colors">P</div>
              <span className="text-xl font-bold tracking-tight">Payload<span className="text-indigo-500">X</span></span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {currentView === 'landing' ? (
                <>
                  <a href="#features" className="text-sm font-medium hover:text-indigo-400 transition-colors">Features</a>
                  <a href="#tech" className="text-sm font-medium hover:text-indigo-400 transition-colors">Stack</a>
                  <a href="#pricing" className="text-sm font-medium hover:text-indigo-400 transition-colors">Pricing</a>
                  <a href="#ai-assistant" className="text-sm font-medium hover:text-indigo-400 transition-colors">AI Architect</a>
                </>
              ) : (
                <button 
                  onClick={onNavigateHome}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <i className="fa-solid fa-arrow-left mr-2"></i> Back to Home
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block text-right">
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <p className="text-[10px] text-indigo-400 font-medium">Verified Account</p>
                  </div>
                  <button 
                    onClick={onNavigateDashboard}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                      currentView === 'dashboard' 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                    }`}
                    title="Manage Your Code"
                  >
                    <i className="fa-solid fa-terminal text-sm"></i>
                  </button>
                  <button 
                    onClick={onLogout}
                    className="text-xs font-bold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={onOpenAuth}
                    className="text-sm font-bold text-slate-300 hover:text-white px-4 py-2 transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={onOpenModal}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">P</div>
                <span className="text-lg font-bold">PayloadX</span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm">
                The most flexible, developer-friendly headless CMS ever created. 
                Built on Payload, optimized for your next big project.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">© 2024 PayloadX. Licensed under MIT Core.</p>
            <div className="flex gap-4">
               <a 
                 href="https://github.com/cmspayloaderr/headless-cms.git" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-slate-400 hover:text-white transition-colors"
                 aria-label="GitHub Repository"
               >
                 <i className="fa-brands fa-github text-xl"></i>
               </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
