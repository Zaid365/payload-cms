
import React from 'react';
import { PRICING_PLANS } from '../constants';

interface PricingProps {
  onOpenModal: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onOpenModal }) => {
  return (
    <section id="pricing" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Fair Pricing. <span className="text-indigo-400">No Hidden Costs.</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Own your infrastructure. Own your code. Own your content.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div 
              key={plan.name} 
              className={`flex flex-col p-8 rounded-3xl border transition-all ${
                plan.highlighted 
                ? 'bg-slate-800 border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105 z-10' 
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-300 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-400 text-sm font-medium">/ {plan.billing}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <i className="fa-solid fa-circle-check text-indigo-500 mt-0.5"></i>
                    {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={onOpenModal}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                plan.highlighted 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        <p className="text-center mt-12 text-slate-500 text-sm italic">
          * PayloadX Premium is a one-time payment for lifetime access to our specialized distribution and support.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
