
import React, { useState } from 'react';
import { getCmsAdvice } from '../services/geminiService';
import { ChatMessage, MessageRole } from '../types';

const GeminiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: MessageRole.USER, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const advice = await getCmsAdvice(input);
    const modelMsg: ChatMessage = { role: MessageRole.MODEL, text: advice };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <section id="ai-assistant" className="py-24 bg-indigo-600/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block p-3 rounded-2xl bg-indigo-600/10 text-indigo-400 mb-4">
            <i className="fa-solid fa-brain text-3xl"></i>
          </div>
          <h2 className="text-3xl font-bold mb-4">AI CMS Architect</h2>
          <p className="text-slate-400">
            Ask our AI expert about schema modeling, payload hooks, or deployment strategies.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="h-[400px] overflow-y-auto p-6 space-y-4 flex flex-col">
            {messages.length === 0 && (
              <div className="flex-grow flex items-center justify-center text-slate-500 text-sm">
                How should I model a blog collection in Payload CMS?
              </div>
            )}
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                  msg.role === MessageRole.USER 
                  ? 'bg-indigo-600 text-white self-end rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 self-start rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-tl-none self-start flex items-center gap-2">
                <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                   <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-800 bg-slate-900/50 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Best way to handle internationalization?"
              className="flex-grow bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
            <button 
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl transition-all"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GeminiAssistant;
