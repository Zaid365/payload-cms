
import React from 'react';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-40">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
            <span className="mr-2">🚀</span> Version 2.0 Now Available
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            The Last CMS <span className="text-transparent bg-clip-text accent-gradient">You'll Ever Buy.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            Stop paying monthly for your content. Get an enterprise-ready, self-hosted, 
            completely open-source Headless CMS for a simple one-time fee. 
            Built on Payload CMS. Owned by you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button 
              onClick={onOpenModal}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              Get Started for £120 <i className="fa-solid fa-arrow-right"></i>
            </button>
            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-lg transition-all border border-slate-700">
              View Demo
            </button>
          </div>
          <div className="flex items-center justify-center gap-8 text-slate-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check text-green-500"></i> Lifetime Access
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check text-green-500"></i> Enterprise Features
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check text-green-500"></i> No Subscription
            </div>
          </div>
        </div>

        {/* Mock Admin UI Preview */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full"></div>
          <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden shadow-2xl p-2">
             <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
                <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="mx-auto text-xs text-slate-500 font-mono">localhost:3000/admin</div>
             </div>
             <div className="grid grid-cols-12 h-[400px]">
                <div className="col-span-3 border-r border-slate-700 p-4 hidden md:block">
                   <div className="space-y-4">
                      <div className="h-4 w-full bg-slate-700/50 rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-slate-700/50 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-slate-700/50 rounded animate-pulse"></div>
                      <div className="h-4 w-1/2 bg-slate-700/50 rounded animate-pulse"></div>
                   </div>
                </div>
                <div className="col-span-12 md:col-span-9 p-8">
                   <div className="flex justify-between items-center mb-8">
                      <div className="h-8 w-48 bg-slate-700 rounded"></div>
                      <div className="h-8 w-24 bg-indigo-600 rounded"></div>
                   </div>
                   <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="h-24 bg-slate-700/30 rounded-lg"></div>
                         <div className="h-24 bg-slate-700/30 rounded-lg"></div>
                      </div>
                      <div className="h-40 bg-slate-700/30 rounded-lg"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
