import React from 'react';
import { Users, ArrowRight } from 'lucide-react'; // Using Lucide for cleaner code
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#f9f7f4] text-[#111010] font-sans selection:bg-emerald-100">
      
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#e4e2de] bg-[#f9f7f4]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="font-serif text-[18px] tracking-tight">Synapse</div>
        <button className="bg-[#111010] text-white px-4.5 py-2 rounded-md text-[13px] font-normal tracking-wide hover:opacity-75 transition-opacity">
          Get started
        </button>
      </nav>

      {/* HERO */}
      <section className="max-w-[680px] mx-auto pt-28 md:pt-36 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-1.5 text-[11.5px] text-[#1a6b5c] bg-[#edf4f2] rounded-full px-3 py-1 font-medium tracking-wide mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1a6b5c] animate-pulse" />
          Now in early access
        </div>

        <h1 className="font-serif text-[45px] md:text-[68px] leading-[1.08] tracking-[-1.5px] mb-6 font-normal">
          Study together.<br />
          Learn <em className="italic text-[#1a6b5c] not-italic">faster.</em>
        </h1>

        <p className="text-[16px] text-[#888] leading-relaxed font-light mb-10 max-w-[480px] mx-auto">
          Collaborative problem-solving sessions with structured roles, shared workspaces, and full session playback — built for students who take learning seriously.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          {/* <button className="w-full md:w-auto bg-[#111010] text-white px-6.5 py-3 rounded-lg text-sm font-normal tracking-wide hover:opacity-75 transition-opacity">
            Start for free
          </button> */}
          <Link 
            to="/signup" 
            className="w-full md:w-auto bg-[#111010] text-white px-6.5 py-3 rounded-lg text-sm font-normal tracking-wide hover:opacity-75 transition-opacity inline-flex justify-center items-center no-underline cursor-pointer"
          >
            Start for free
          </Link>
          <button className="w-full md:w-auto bg-transparent text-[#888] border border-[#e4e2de] px-6.5 py-3 rounded-lg text-sm font-normal hover:text-[#111010] hover:border-[#bbb] transition-all">
            See how it works
          </button>
        </div>
      </section>

      {/* CARD */}
      <div className="max-w-[680px] mx-auto px-6">
        <div className="bg-white border border-[#e4e2de] rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.06)]">
          {/* Card Top */}
          <div className="p-8 pb-6 border-b border-[#e4e2de] flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl tracking-tight mb-1">Join a session</h3>
              <p className="text-[13px] text-[#888] font-light">Pick a role and start collaborating</p>
            </div>
            <div className="w-10 h-10 bg-[#edf4f2] rounded-xl flex items-center justify-center">
              <Users size={18} className="text-[#1a6b5c]" />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8 py-7 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <Pill label="Solver" active />
              <Pill label="Reviewer" />
              <Pill label="Observer" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill label="Mathematics" active />
              <Pill label="Computer Science" />
              <Pill label="Physics" />
              <Pill label="Economics" />
            </div>
          </div>

          {/* Card Footer */}
          <div className="p-8 py-5 border-t border-[#e4e2de] flex flex-col md:flex-row items-center justify-between gap-4 bg-[#f9f7f4]/50">
            <span className="text-[12.5px] text-[#888] font-light">Free to join — no credit card needed</span>
            <Link
              to="/signup">
            <button className="bg-[#1a6b5c] text-white px-5 py-2.5 rounded-lg text-[13px] font-normal hover:opacity-80 transition-opacity flex items-center gap-1.5">
              Sign up <ArrowRight size={14} />
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF */}
      <div className="flex flex-wrap items-center justify-center gap-6 py-16 px-6 text-[13px] text-[#888] font-light">
        <span><b className="text-[#111010] font-medium">4,200+</b> active students</span>
        <span className="hidden md:block text-[#e4e2de]">·</span>
        <span><b className="text-[#111010] font-medium">18,000+</b> sessions completed</span>
        <span className="hidden md:block text-[#e4e2de]">·</span>
        <span>Sessions saved for <b className="text-[#111010] font-medium">7 days</b></span>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-[#e4e2de] px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[12px] text-[#888] font-light">© 2025 Synapse</span>
        <div className="flex gap-6">
          <a href="#" className="text-[12px] text-[#888] hover:text-[#111010] transition-colors">Privacy</a>
          <a href="#" className="text-[12px] text-[#888] hover:text-[#111010] transition-colors">Terms</a>
        </div>
      </footer>
    </div>
  );
};

// Sub-component for the Pills
const Pill = ({ label, active }) => (
  <span className={`text-[12px] px-3 py-1 rounded-full border transition-all cursor-default ${
    active 
      ? 'bg-[#edf4f2] border-transparent text-[#1a6b5c] font-medium' 
      : 'bg-transparent border-[#e4e2de] text-[#888] font-light hover:border-[#bbb]'
  }`}>
    {label}
  </span>
);

export default Landing;