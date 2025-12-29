
import React from 'react';
import { TECH_SPECS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'SaaS CMS', cost: 1200, fill: '#64748b' },
  { name: 'PayloadX', cost: 120, fill: '#6366f1' },
];

const TechStack: React.FC = () => {
  return (
    <section id="tech" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for Modern <span className="text-indigo-400">Engineering.</span></h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We leverage the power of Node.js and TypeScript to give you a 
              Developer Experience (DX) that is second to none. 
              Deploy anywhere that runs Node.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {TECH_SPECS.map((spec) => (
                <div key={spec.name} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400">
                    <i className={spec.icon}></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{spec.name}</h4>
                    <p className="text-sm font-bold text-slate-200">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-chart-line text-green-500"></i> Cost Savings (Annual)
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} label={{ value: 'Cost (£)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff'}}
                  />
                  <Bar dataKey="cost" radius={[8, 8, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">
              Estimated annual savings of £1,000+ compared to mid-tier SaaS Headless CMS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
