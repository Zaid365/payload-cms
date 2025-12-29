
import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import TechStack from './components/TechStack';
import GeminiAssistant from './components/GeminiAssistant';

const App: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <TechStack />
      <GeminiAssistant />
      <Pricing />
      
      {/* Newsletter Section */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to reclaim your content?</h2>
          <p className="text-slate-400 mb-8">Join 2,000+ developers building faster with PayloadX.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="px-6 py-4 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-80"
            />
            <button className="px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all">
              Notify Me on Updates
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
