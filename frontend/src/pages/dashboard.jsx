import React, { useState } from "react";

const SESSIONS = [
  {
    id: 1,
    status: "Active Now",
    statusColor: "text-[#1a6b5c] bg-[#1a6b5c]/10",
    title: "Advanced Fluid Dynamics",
    desc: "In-depth analysis of laminar vs turbulent flow in closed systems.",
    avatars: [
      { init: "MT", bg: "bg-[#1a6b5c]", text: "text-white" },
      { init: "SJ", bg: "bg-[#0e0e0e]", text: "text-white" },
      { init: "LR", bg: "bg-[#e4e2de]", text: "text-[#0e0e0e]" },
    ],
    extraAvatars: "+4",
    action: "Join Session",
    primary: true,
  },
  {
    id: 2,
    status: "Scheduled · 2:00 PM",
    statusColor: "text-[#888] bg-[#f7f6f2] border border-[#e4e2de]",
    title: "Cognitive Neuroscience Seminar",
    desc: "Reviewing synaptic plasticity and memory consolidation pathways.",
    avatars: [
      { init: "AT", bg: "bg-[#0e0e0e]", text: "text-white" },
      { init: "CM", bg: "bg-[#1a6b5c]", text: "text-white" },
    ],
    extraAvatars: "+1",
    action: "View Details",
    primary: false,
  }
];

const GROUPS = [
  { id: 1, name: "Arch 301: Modernism", msg: "Dr. Thorne: Have you checked...", time: "2m", active: true, initials: "A3" },
  { id: 2, name: "Fluid Dynamics Study", msg: "Sarah shared a new PDF.", time: "1h", active: false, initials: "FD" },
  { id: 3, name: "Neuroscience Group", msg: "Leo: Don't forget the sketches!", time: "3h", active: false, initials: "NG" },
  { id: 4, name: "Design Studio VII", msg: "Alex: Looking forward to the...", time: "1d", active: false, initials: "DS" },
];

export default function SynapseDashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col font-sans text-[#0e0e0e]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');
          .font-serif { font-family: 'Instrument Serif', serif; }
          .font-sans { font-family: 'Geist', sans-serif; }
          
          /* Custom scrollbar for a cleaner look */
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #e4e2de; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #d0ceca; }
        `}
      </style>

      {/* NAV */}
      <nav className="sticky top-0 z-50 h-[56px] bg-[#f7f6f2]/90 backdrop-blur-md border-b border-[#e4e2de] flex items-center justify-between px-[1.75rem]">
        <div className="flex items-center gap-[1.6rem]">
          <span className="font-serif text-[17px] text-[#0e0e0e]">Synapse</span>
          <div className="flex items-center gap-[1.6rem]">
            {["Dashboard", "Sessions", "Quizzes", "Chat"].map(l => (
              <a 
                key={l} 
                href="#" 
                className={`text-[13px] no-underline transition-colors ${
                  l === "Dashboard" 
                    ? "text-[#0e0e0e] font-medium border-b-[1.5px] border-[#0e0e0e] pb-[2px]" 
                    : "text-[#888] font-normal hover:text-[#0e0e0e]"
                }`}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[10px]">
          <button className="bg-[#1a6b5c] text-[#fff] border-none px-[15px] py-[7px] rounded-[20px] text-[12.5px] font-sans font-medium cursor-pointer hover:bg-[#2a8a74] transition-colors flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Start Session
          </button>
          <div className="w-[28px] h-[28px] rounded-full bg-[#0e0e0e] text-white flex items-center justify-center text-[10px] font-semibold cursor-pointer">
            JV
          </div>
        </div>
      </nav>

      {/* MAIN LAYOUT */}
      <main className="flex-1 max-w-[1240px] mx-auto w-full p-[2.5rem_1.5rem] grid grid-cols-[1fr_360px] gap-[2rem] items-start">
        
        {/* LEFT COLUMN: SESSIONS */}
        <section className="flex flex-col gap-[1.5rem]">
          
          {/* Header */}
          <div className="flex justify-between items-end mb-[.5rem]">
            <div>
              <h1 className="font-serif text-[2.2rem] text-[#0e0e0e] leading-[1.1] tracking-[-.5px] mb-[.2rem]">
                Your <em>Dashboard</em>
              </h1>
              <p className="text-[13px] text-[#888] font-light">
                2 upcoming sessions · 1 active right now
              </p>
            </div>
            <div className="flex gap-[8px]">
              <button className="w-[34px] h-[34px] rounded-[9px] border border-[#e4e2de] bg-white flex items-center justify-center text-[#0e0e0e] hover:bg-[#e4e2de]/50 transition-colors cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              </button>
              <button className="w-[34px] h-[34px] rounded-[9px] border border-[#e4e2de] bg-white flex items-center justify-center text-[#0e0e0e] hover:bg-[#e4e2de]/50 transition-colors cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </button>
            </div>
          </div>

          {/* Session Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.2rem]">
            {SESSIONS.map((session) => (
              <div 
                key={session.id} 
                className={`bg-white border rounded-[18px] p-[1.5rem] flex flex-col relative overflow-hidden transition-shadow hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
                  ${session.primary ? "border-[#1a6b5c]/30 shadow-[0_2px_10px_-4px_rgba(26,107,92,0.15)]" : "border-[#e4e2de]"}`}
              >
                {/* Badge */}
                <div className={`text-[9.5px] font-bold tracking-[1px] uppercase px-[10px] py-[4px] rounded-[20px] w-fit mb-[1.2rem] ${session.statusColor}`}>
                  {session.status}
                </div>
                
                <h3 className="font-serif text-[1.35rem] text-[#0e0e0e] leading-[1.2] mb-[.6rem] pr-4">
                  {session.title}
                </h3>
                <p className="text-[12.5px] text-[#888] font-light leading-[1.6] mb-[2rem] flex-1">
                  {session.desc}
                </p>

                {/* Card Footer */}
                <div className="border-t border-[#e4e2de] pt-[1.2rem] flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <div className="flex -space-x-[8px]">
                      {session.avatars.map((ava, i) => (
                        <div key={i} className={`w-[28px] h-[28px] rounded-full border-[2px] border-white flex items-center justify-center text-[9px] font-medium ${ava.bg} ${ava.text} relative z-${30-i*10}`}>
                          {ava.init}
                        </div>
                      ))}
                      <div className="w-[28px] h-[28px] rounded-full border-[2px] border-white bg-[#f7f6f2] flex items-center justify-center text-[9px] font-medium text-[#888] relative z-0">
                        {session.extraAvatars}
                      </div>
                    </div>
                  </div>
                  
                  <button className={`text-[12px] font-medium px-[14px] py-[8px] rounded-[20px] transition-colors border
                    ${session.primary 
                      ? "bg-[#1a6b5c] text-white border-[#1a6b5c] hover:bg-[#2a8a74]" 
                      : "bg-white text-[#0e0e0e] border-[#e4e2de] hover:bg-[#f7f6f2]"}`}>
                    {session.action}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bento Card Wide (Dark Theme) */}
          <div className="bg-[#0e0e0e] rounded-[18px] p-[2rem] flex flex-col justify-between relative overflow-hidden min-h-[220px] mt-[.5rem]">
             {/* Abstract background flourish */}
             <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-[radial-gradient(circle_at_100%_0%,rgba(26,107,92,.25)_0%,transparent_70%)] pointer-events-none"></div>
             
             <div className="relative z-10 max-w-[60%]">
               <div className="flex items-center gap-[8px] mb-[1rem]">
                 <span className="w-[8px] h-[8px] rounded-full bg-[#7ecfbe]"></span>
                 <span className="text-[#7ecfbe] text-[10px] font-bold tracking-[1px] uppercase">New Resource</span>
               </div>
               <h3 className="font-serif text-[1.8rem] text-white leading-[1.1] mb-[.5rem]">
                 Architecture Visual Dynamics
               </h3>
               <p className="text-[13px] text-white/60 font-light leading-[1.6]">
                 A comprehensive repository of 3D models and structural blueprints for your upcoming final project.
               </p>
             </div>

             <div className="relative z-10 mt-[2rem]">
               <button className="bg-white text-[#0e0e0e] border-none px-[18px] py-[10px] rounded-[24px] text-[12px] font-semibold font-sans cursor-pointer hover:bg-white/90 transition-colors">
                 Explore Library →
               </button>
             </div>
          </div>

        </section>


        {/* RIGHT COLUMN: GROUPS */}
        <aside className="flex flex-col gap-[1.5rem]">
          
          <div className="bg-white border border-[#e4e2de] rounded-[18px] p-[1.5rem] flex flex-col h-[700px] shadow-sm">
            
            {/* Header & Search */}
            <div className="flex flex-col gap-[1rem] mb-[1.2rem]">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-[1.3rem] text-[#0e0e0e]">Study Groups</h2>
                <span className="bg-[#f7f6f2] text-[#888] text-[10px] font-semibold px-[8px] py-[3px] rounded-[6px]">
                  4 Active
                </span>
              </div>
              
              <div className="relative w-full">
                <svg className="absolute left-[12px] top-[50%] translate-y-[-50%]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input 
                  type="text" 
                  placeholder="Find a conversation..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#f7f6f2] border border-[#e4e2de] rounded-[12px] p-[9px_12px_9px_34px] text-[12.5px] outline-none focus:border-[#1a6b5c]/50 transition-colors text-[#0e0e0e] placeholder:text-[#aaa]"
                />
              </div>
            </div>

            {/* Groups List */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-[4px] pr-[4px]">
              {GROUPS.map((group) => (
                <div 
                  key={group.id} 
                  className={`flex items-center gap-[12px] p-[10px] rounded-[14px] cursor-pointer transition-colors border border-transparent
                    ${group.active ? "bg-[#1a6b5c]/5 border-[#1a6b5c]/10" : "hover:bg-[#f7f6f2]"}`}
                >
                  <div className="relative w-[42px] h-[42px] shrink-0">
                    <div className={`w-full h-full rounded-full flex items-center justify-center font-serif text-[1.1rem] 
                      ${group.active ? "bg-[#1a6b5c] text-white" : "bg-[#f7f6f2] border border-[#e4e2de] text-[#0e0e0e]"}`}>
                      {group.initials}
                    </div>
                    {group.id === 1 && (
                      <span className="absolute bottom-0 right-0 w-[12px] h-[12px] border-[2px] border-white rounded-full bg-[#1a6b5c]"></span>
                    )}
                  </div>
                  
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-[2px]">
                      <span className="font-sans font-medium text-[13.5px] text-[#0e0e0e] truncate pr-2">
                        {group.name}
                      </span>
                      <span className="text-[10px] text-[#888] shrink-0">{group.time}</span>
                    </div>
                    <span className={`text-[11.5px] truncate font-light ${group.active ? "text-[#1a6b5c]" : "text-[#888]"}`}>
                      {group.msg}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-[1rem] w-full text-[12px] font-medium text-[#888] hover:text-[#0e0e0e] transition-colors py-[8px]">
              View all archived chats →
            </button>

            {/* Note Mini-Widget */}
            <div className="mt-auto pt-[1rem] border-t border-[#e4e2de]">
               <div className="bg-[#1a6b5c]/5 border border-[#1a6b5c]/15 rounded-[14px] p-[1.1rem] flex flex-col gap-[.5rem]">
                 <div className="flex items-center gap-[8px]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a6b5c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    <span className="font-serif text-[1rem] text-[#1a6b5c]">Pro Tip</span>
                 </div>
                 <p className="text-[11.5px] text-[#1a6b5c]/80 font-light leading-[1.5]">
                   Groups with pinned resources show a 30% higher engagement rate. Try pinning your syllabus today!
                 </p>
               </div>
            </div>

          </div>

        </aside>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#e4e2de] p-[1.2rem_2.5rem] flex items-center justify-between bg-[#f7f6f2] mt-auto">
        <span className="text-[11.5px] text-[#aaa]">© 2025 Synapse Learning Ecosystem</span>
        <div className="flex gap-[1.5rem]">
          <a href="#" className="text-[11.5px] text-[#aaa] no-underline hover:text-[#666] transition-colors">Help Center</a>
          <a href="#" className="text-[11.5px] text-[#aaa] no-underline hover:text-[#666] transition-colors">Community Guidelines</a>
          <a href="#" className="text-[11.5px] text-[#aaa] no-underline hover:text-[#666] transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
}