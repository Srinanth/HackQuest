import React, { useState } from "react";

// --- MOCK PLATFORM DATA ---
const STATS = [
  { label: "Sessions Attended", value: "42" },
  { label: "Total Upvotes", value: "845", color: "text-[#1a6b5c]" },
  { label: "Study Groups", value: "4" }
];

export default function SynapseProfile() {
  const [activeTab, setActiveTab] = useState("overview"); // overview, activity, settings

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col font-sans text-[#0e0e0e] selection:bg-[#1a6b5c]/20">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');
          .font-serif { font-family: 'Instrument Serif', serif; }
          .font-sans { font-family: 'Geist', sans-serif; }
          
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #e4e2de; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #d0ceca; }
        `}
      </style>

      {/* TOP NAV */}
      <nav className="sticky top-0 z-40 h-[56px] bg-[#f7f6f2]/90 backdrop-blur-md border-b border-[#e4e2de] flex items-center justify-between px-[1.75rem] shrink-0">
        <div className="flex items-center gap-[1.6rem]">
          <span className="font-serif text-[17px] text-[#0e0e0e] cursor-pointer">Synapse</span>
          <div className="hidden md:flex items-center gap-[1.6rem]">
            {["Dashboard", "Sessions", "Leaderboard", "Library"].map(l => (
              <a 
                key={l} 
                href="#"
                className="text-[13px] no-underline transition-colors text-[#888] font-normal hover:text-[#0e0e0e]"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[12px]">
          <button className="w-[32px] h-[32px] rounded-full hover:bg-[#e4e2de]/50 flex items-center justify-center transition-colors text-[#0e0e0e]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <div className="w-[28px] h-[28px] rounded-full bg-[#1a6b5c] border-[2px] border-[#0e0e0e] text-white flex items-center justify-center text-[10px] font-semibold cursor-pointer shadow-sm">
            JV
          </div>
        </div>
      </nav>

      {/* MAIN LAYOUT */}
      <main className="flex-1 max-w-[1160px] mx-auto w-full p-[2.5rem_1.5rem] flex flex-col gap-[2rem]">
        
        {/* HERO / PROFILE HEADER */}
        <section className="bg-white border border-[#e4e2de] rounded-[24px] p-[2.5rem] relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-[2rem] shadow-sm">
          {/* Subtle background gradient pattern */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_100%_0%,rgba(26,107,92,.08)_0%,transparent_70%)] pointer-events-none"></div>

          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-[120px] h-[120px] rounded-full bg-[#0e0e0e] text-white flex items-center justify-center font-serif text-[3rem] shadow-md border-[4px] border-white">
              JV
            </div>
            <div className="absolute bottom-1 right-1 w-[24px] h-[24px] bg-[#1a6b5c] border-[3px] border-white rounded-full flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center md:text-left z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-[1rem] mb-[.5rem]">
              <h1 className="font-serif text-[2.5rem] text-[#0e0e0e] leading-[1.1] tracking-[-.5px]">Julian Voss</h1>
              <div className="flex gap-[.5rem] justify-center md:justify-start">
                <button className="bg-[#f7f6f2] border border-[#e4e2de] text-[#0e0e0e] px-[16px] py-[8px] rounded-[20px] text-[12px] font-sans font-medium hover:bg-[#e4e2de]/50 transition-colors flex items-center gap-[6px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.17 3.25q-2.5-2.5-5.91-2.5t-5.92 2.5L2 10.59v5.82h5.83l7.34-7.34q2.5-2.5 5.92-2.5t5.91 2.5z"/><line x1="16.5" y1="7.6" x2="20.7" y2="11.8"/></svg>
                  Edit Profile
                </button>
                <button className="bg-[#0e0e0e] text-white px-[16px] py-[8px] rounded-[20px] text-[12px] font-sans font-medium hover:opacity-80 transition-opacity flex items-center gap-[6px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Contact
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-[1rem] mb-[1.2rem] text-[13px] text-[#888] font-light">
              <span className="flex items-center gap-[6px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                Computer Science Student
              </span>
              <span className="w-[4px] h-[4px] rounded-full bg-[#e4e2de]"></span>
              <span className="flex items-center gap-[6px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Thrissur, Kerala, India
              </span>
            </div>

            <p className="text-[14px] text-[#0e0e0e] leading-[1.6] max-w-[800px] font-light">
              Passionate software developer focusing on backend architecture, systems engineering, and IoT. Deeply interested in problem-solving that carries a societal or systemic impact. Currently exploring applied AI/ML pipelines and participating in competitive programming.
            </p>
          </div>
        </section>

        {/* TWO COLUMN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-[2rem] items-start">
          
          {/* LEFT COLUMN: Details & Projects */}
          <div className="flex flex-col gap-[2rem]">
            
            {/* Tech Stack */}
            <section>
              <h2 className="font-serif text-[1.4rem] text-[#0e0e0e] mb-[1rem] flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a6b5c" strokeWidth="2.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                Technical Stack
              </h2>
              <div className="bg-white border border-[#e4e2de] rounded-[18px] p-[1.5rem]">
                <div className="flex flex-wrap gap-[10px]">
                  {["Python", "Java", "Go", "Rust", "C (DSA Focus)", "FastAPI", "Flutter", "Kotlin", "Firebase"].map((tech) => (
                    <span key={tech} className="bg-[#f7f6f2] border border-[#e4e2de] text-[#0e0e0e] px-[12px] py-[6px] rounded-[8px] text-[12.5px] font-medium tracking-[.2px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects & Plans */}
            <section>
              <h2 className="font-serif text-[1.4rem] text-[#0e0e0e] mb-[1rem] flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a6b5c" strokeWidth="2.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                Active Projects & Initiatives
              </h2>
              <div className="flex flex-col gap-[1rem]">
                
                {/* Project Card 1 */}
                <div className="bg-white border border-[#e4e2de] rounded-[18px] p-[1.5rem] flex flex-col gap-[12px] hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-[1.25rem] text-[#0e0e0e]">AquaWatch AI</h3>
                      <p className="text-[12px] text-[#1a6b5c] font-medium uppercase tracking-[.5px] mt-1">FlowVision Hackathon · Team DRAG-ON</p>
                    </div>
                    <span className="bg-[#0e0e0e] text-white text-[10px] px-[8px] py-[4px] rounded-[12px] font-bold">Shipped</span>
                  </div>
                  <p className="text-[13px] text-[#888] leading-[1.6] font-light">
                    An environmental monitoring solution integrating AI to track and analyze water systems. Developed core backend infrastructure and machine learning deployment pipelines.
                  </p>
                </div>

                {/* Project Card 2 */}
                <div className="bg-white border border-[#e4e2de] rounded-[18px] p-[1.5rem] flex flex-col gap-[12px] hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-[1.25rem] text-[#0e0e0e]">Smart Transit Tracker</h3>
                      <p className="text-[12px] text-[#888] font-medium uppercase tracking-[.5px] mt-1">Independent Project</p>
                    </div>
                    <span className="bg-[#1a6b5c]/10 text-[#1a6b5c] border border-[#1a6b5c]/20 text-[10px] px-[8px] py-[4px] rounded-[12px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#1a6b5c] rounded-full animate-pulse"></span> In Progress
                    </span>
                  </div>
                  <p className="text-[13px] text-[#888] leading-[1.6] font-light">
                    A real-time civic infrastructure application for tracking local bus routes. Built utilizing Kotlin for a robust mobile frontend and Firebase for real-time backend synchronization.
                  </p>
                </div>

              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Stats & Meta */}
          <aside className="flex flex-col gap-[1.5rem]">
            
            {/* Synapse Stats (Black Card) */}
            <div className="bg-[#0e0e0e] rounded-[18px] p-[1.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_100%_0%,rgba(26,107,92,.25)_0%,transparent_70%)] pointer-events-none"></div>
              <h2 className="font-serif text-[1.3rem] text-white mb-[1.2rem] relative z-10">Platform Impact</h2>
              <div className="flex flex-col gap-[1rem] relative z-10">
                {STATS.map((stat, i) => (
                  <div key={i} className="flex justify-between items-center pb-[1rem] border-b border-white/10 last:border-0 last:pb-0">
                    <span className="text-[12.5px] text-white/60 font-light">{stat.label}</span>
                    <span className={`font-serif text-[1.5rem] ${stat.color || "text-white"}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware & Setup */}
            <div className="bg-white border border-[#e4e2de] rounded-[18px] p-[1.5rem]">
              <h2 className="font-serif text-[1.3rem] text-[#0e0e0e] mb-[1rem]">Hardware & Lab</h2>
              <ul className="flex flex-col gap-[12px]">
                <li className="flex items-start gap-[12px]">
                  <div className="mt-1 w-[24px] h-[24px] rounded-[6px] bg-[#f7f6f2] flex items-center justify-center shrink-0 border border-[#e4e2de]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0e0e0e" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#0e0e0e]">Lenovo LOQ Essential</p>
                    <p className="text-[11.5px] text-[#888] font-light mt-0.5">Primary Dev / 12th Gen HX, 6GB RTX 3050</p>
                  </div>
                </li>
                <li className="flex items-start gap-[12px]">
                  <div className="mt-1 w-[24px] h-[24px] rounded-[6px] bg-[#f7f6f2] flex items-center justify-center shrink-0 border border-[#e4e2de]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0e0e0e" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#0e0e0e]">Custom Homelab Setup</p>
                    <p className="text-[11.5px] text-[#888] font-light mt-0.5">Repurposed hardware server environments</p>
                  </div>
                </li>
                <li className="flex items-start gap-[12px]">
                  <div className="mt-1 w-[24px] h-[24px] rounded-[6px] bg-[#f7f6f2] flex items-center justify-center shrink-0 border border-[#e4e2de]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0e0e0e" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#0e0e0e]">MacBook Pro (Mid-2009)</p>
                    <p className="text-[11.5px] text-[#888] font-light mt-0.5">Legacy / Troubleshooting machine</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Other Interests */}
            <div className="bg-white border border-[#e4e2de] rounded-[18px] p-[1.5rem]">
              <h2 className="font-serif text-[1.3rem] text-[#0e0e0e] mb-[1rem]">Other Interests</h2>
              <div className="flex flex-wrap gap-[8px]">
                <span className="bg-[#1a6b5c]/10 text-[#1a6b5c] px-[12px] py-[6px] rounded-[20px] text-[11.5px] font-medium">Civic Infrastructure</span>
                <span className="bg-[#f7f6f2] border border-[#e4e2de] text-[#888] px-[12px] py-[6px] rounded-[20px] text-[11.5px] font-medium">Minecraft Redstone</span>
                <span className="bg-[#f7f6f2] border border-[#e4e2de] text-[#888] px-[12px] py-[6px] rounded-[20px] text-[11.5px] font-medium">Open-world Driving Games</span>
              </div>
            </div>

          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#e4e2de] p-[1.5rem_2.5rem] flex flex-col md:flex-row items-center justify-between bg-[#f7f6f2] shrink-0 mt-auto">
        <span className="text-[11.5px] text-[#aaa]">© 2026 Synapse Learning Ecosystem</span>
        <div className="flex gap-[1.5rem] mt-4 md:mt-0">
          <a href="#" className="text-[11.5px] text-[#aaa] hover:text-[#0e0e0e] transition-colors">Help Center</a>
          <a href="#" className="text-[11.5px] text-[#aaa] hover:text-[#0e0e0e] transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
}