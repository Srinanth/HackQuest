import React, { useState } from 'react';
import { Zap, CheckCircle2, BookOpen, ChevronLeft, ChevronRight, BarChart3, Sparkles } from 'lucide-react';

const OPTS = [
  { id: "A", text: "The hippocampus consolidates short-term memories into long-term storage via synaptic strengthening" },
  { id: "B", text: "The prefrontal cortex modulates emotional responses through direct inhibition of the amygdala" },
  { id: "C", text: "Neurogenesis in the cerebellum is responsible for procedural memory formation" },
];

export default function ExamPrepQuiz() {
  const [selected, setSelected] = useState("B");
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [numQuestions, setNumQuestions] = useState("10");

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#0e0e0e] font-sans flex flex-col">
      
      

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 max-w-[1160px] mx-auto w-full p-7">
        
        {/* SIDEBAR */}
        <aside className="flex flex-col gap-5">
          <section>
            <h1 className="font-serif text-[2rem] leading-none tracking-tight mb-2">
              AI Quiz <em className="text-[#1a6b5c] italic">Generator</em>
            </h1>
            <p className="text-[13px] text-[#888] font-light leading-relaxed">
              Transform study materials into tailored assessments in seconds.
            </p>
          </section>

          {/* Generator Form Card */}
          <div className="bg-[#0e0e0e] rounded-[18px] p-6 flex flex-col gap-4 shadow-xl shadow-slate-200">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Subject Area</label>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#1a6b5c]/60 transition-colors"
                value={subject} 
                onChange={e => setSubject(e.target.value)} 
                placeholder="e.g. Cognitive Neuroscience" 
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Specific Topics</label>
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#1a6b5c]/60 transition-colors resize-none min-h-[90px]"
                value={topics} 
                onChange={e => setTopics(e.target.value)} 
                placeholder="Enter key concepts or paste notes..." 
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Difficulty</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none cursor-pointer" value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
                  {["Easy", "Medium", "Hard"].map(d => <option key={d} className="bg-[#1a1a1a]">{d}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Questions</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none cursor-pointer" value={numQuestions} onChange={e=>setNumQuestions(e.target.value)}>
                  {["5", "10", "15", "20"].map(n => <option key={n} className="bg-[#1a1a1a]">{n}</option>)}
                </select>
              </div>
            </div>

            <button className="w-full bg-[#1a6b5c] hover:bg-[#238b75] text-white py-3 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
              <Zap size={14} fill="white" />
              Generate Quiz
            </button>
          </div>

          
        </aside>

        {/* MAIN CONTENT AREA */}
        <section className="flex flex-col gap-5">
          
          {/* Content Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#0e0e0e] rounded-xl flex items-center justify-center">
                <CheckCircle2 size={18} className="text-white" />
              </div>
              <div>
                <h2 className="font-serif text-[1.2rem] leading-none">Neural Plasticity</h2>
                <p className="text-[11.5px] text-[#888] font-light mt-1">Cognitive Neuroscience · 10 questions · Medium</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button className="w-8 h-8 rounded-full border border-[#e4e2de] bg-white flex items-center justify-center hover:bg-[#0e0e0e] hover:text-white transition-all"><ChevronLeft size={14} /></button>
              <button className="w-8 h-8 rounded-full border border-[#e4e2de] bg-white flex items-center justify-center hover:bg-[#0e0e0e] hover:text-white transition-all"><ChevronRight size={14} /></button>
            </div>
          </div>

          {/* QUESTION CARD */}
          <div className="bg-[#0e0e0e] rounded-[18px] p-8 flex flex-col gap-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-gradient-to-bl from-[#1a6b5c]/30 to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-center z-10">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em]">Question 1 of 10</span>
              <span className="bg-[#1a6b5c]/20 border border-[#1a6b5c]/40 text-[#7ecfbe] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">AI-Tailored</span>
            </div>

            <h3 className="font-serif text-[1.4rem] text-white leading-[1.3] font-normal max-w-[620px] z-10">
              Which statement best describes the role of synaptic plasticity in memory consolidation?
            </h3>

            <div className="flex flex-col gap-2.5 z-10">
              {OPTS.map((opt) => {
                const isActive = selected === opt.id;
                return (
                  <button 
                    key={opt.id} 
                    onClick={() => setSelected(opt.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-[1.5px] text-left transition-all ${
                      isActive ? 'bg-[#1a6b5c]/10 border-[#1a6b5c]' : 'bg-white/5 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold transition-colors ${
                      isActive ? 'bg-[#1a6b5c] text-white' : 'bg-white/10 text-white/40'
                    }`}>
                      {opt.id}
                    </div>
                    <span className={`text-[13.5px] leading-relaxed flex-1 ${isActive ? 'text-white' : 'text-white/60 font-light'}`}>
                      {opt.text}
                    </span>
                    {isActive && <div className="w-5 h-5 rounded-full bg-[#1a6b5c] flex items-center justify-center flex-shrink-0"><CheckCircle2 size={12} className="text-white" /></div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PROGRESS STRIP */}
          <div className="bg-white border border-[#e4e2de] rounded-xl p-3 px-4 flex items-center gap-4">
            <div className="flex-1 flex gap-1">
              {Array.from({length: 10}, (_, i) => (
                <div key={i} className={`h-1 rounded-full flex-1 ${i === 0 ? 'bg-[#0e0e0e]' : 'bg-[#e4e2de]'}`} />
              ))}
            </div>
            <span className="text-[11.5px] text-[#888] font-light whitespace-nowrap">1 / 10</span>
            <button className="bg-[#0e0e0e] hover:opacity-80 text-white text-[12px] font-medium px-4 py-1.5 rounded-full transition-opacity">
              Submit →
            </button>
          </div>

          

          

        </section>
      </main>

      <footer className="border-t border-[#e4e2de] px-7 py-4 bg-[#f7f6f2] flex items-center justify-between">
        <span className="text-[11.5px] text-[#aaa] font-light">© 2025 Synapse</span>
        <div className="flex gap-6">
          <a href="#" className="text-[11.5px] text-[#aaa] hover:text-[#666]">Privacy</a>
          <a href="#" className="text-[11.5px] text-[#aaa] hover:text-[#666]">Terms</a>
        </div>
      </footer>
    </div>
  );
}