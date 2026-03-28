import React, { useState } from "react";

export default function SynapseSession() {
  const [chatOpen, setChatOpen] = useState(false);
  const [upvotes, setUpvotes] = useState(124);
  const [userUpvotes, setUserUpvotes] = useState(0);

  const handleUpvote = () => {
    if (userUpvotes < 5) {
      setUpvotes((prev) => prev + 1);
      setUserUpvotes((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#0e0e0e] font-sans selection:bg-[#1a6b5c]/20">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');
          .font-serif { font-family: 'Instrument Serif', serif; }
          .font-sans { font-family: 'Geist', sans-serif; }
          
          .whiteboard-grid {
            background-color: #ffffff;
            background-image: radial-gradient(#e4e2de 1.5px, transparent 1.5px);
            background-size: 24px 24px;
          }

          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #e4e2de; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #d0ceca; }
        `}
      </style>

      

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Collaborative Toolbar */}
        <div className="h-[56px] bg-[#f7f6f2] px-[1.5rem] flex items-center justify-between border-b border-[#e4e2de] shrink-0">
          <div className="flex items-center gap-[1.5rem]">
            <h1 className="font-serif text-[1.25rem] text-[#0e0e0e] tracking-tight">Advanced Quantum Theory - Session 04</h1>
            <div className="h-[16px] w-px bg-[#e4e2de]"></div>
            <div className="flex items-center -space-x-[8px]">
              <div className="h-[28px] w-[28px] rounded-full border-[2px] border-[#f7f6f2] bg-[#1a6b5c] text-white flex items-center justify-center text-[9px] font-medium relative z-30">SJ</div>
              <div className="h-[28px] w-[28px] rounded-full border-[2px] border-[#f7f6f2] bg-[#0e0e0e] text-white flex items-center justify-center text-[9px] font-medium relative z-20">LR</div>
              <div className="h-[28px] w-[28px] rounded-full border-[2px] border-[#f7f6f2] bg-white text-[#0e0e0e] flex items-center justify-center text-[9px] font-medium relative z-10">CM</div>
              <div className="h-[28px] w-[28px] rounded-full bg-[#e4e2de] flex items-center justify-center text-[9px] font-bold text-[#0e0e0e] border-[2px] border-[#f7f6f2] relative z-0">+12</div>
            </div>
          </div>
          
          <div className="flex items-center gap-[10px]">
            <div className="flex bg-white border border-[#e4e2de] p-[3px] rounded-[12px] mr-2">
              {['edit', 'type', 'image'].map((icon, i) => (
                <button key={i} className="p-[6px] rounded-[8px] hover:bg-[#f7f6f2] transition-colors text-[#0e0e0e]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon === 'edit' && <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />}
                    {icon === 'type' && <><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></>}
                    {icon === 'image' && <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>}
                  </svg>
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-[16px] py-[8px] bg-[#1a6b5c] text-white rounded-[20px] text-[11px] font-bold uppercase tracking-[.8px] hover:bg-[#2a8a74] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V3a2 2 0 0 0-4 0v10.5"/><path d="M6 14v-1.5a2 2 0 0 0-4 0v5C2 21.5 5 22 8 22h4c3.5 0 6-2.5 6-6v-4a2 2 0 0 0-4 0v3"/></svg>
              Raise Hand
            </button>
            <button className="flex items-center gap-2 px-[16px] py-[8px] bg-white border border-[#e4e2de] text-[#0e0e0e] rounded-[20px] text-[11px] font-bold uppercase tracking-[.8px] hover:bg-[#f7f6f2] transition-colors">
              Save PNG
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden flex bg-[#f7f6f2] p-[1rem] gap-[1rem]">
          
          {/* Whiteboard Canvas */}
          <div className="flex-1 whiteboard-grid rounded-[18px] border border-[#e4e2de] shadow-sm relative overflow-hidden">
            
            {/* Canvas Placeholder Art */}
            <div className="absolute inset-0 p-12 pointer-events-none opacity-90 flex items-center justify-center">
              <div className="max-w-4xl w-full mx-auto flex flex-col items-center">
                <svg width="400" height="300" viewBox="0 0 24 24" fill="none" stroke="#e4e2de" strokeWidth="0.5">
                  <circle cx="12" cy="12" r="10" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(135 12 12)" />
                  <circle cx="12" cy="12" r="2" fill="#1a6b5c" stroke="none" />
                </svg>
                <div className="mt-8 text-center border-t border-[#e4e2de] pt-6 w-[60%]">
                  <div className="h-3 w-48 bg-[#1a6b5c]/20 mx-auto rounded-full mb-3"></div>
                  <div className="h-2 w-32 bg-[#e4e2de] mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Instructor Overlay & Upvote */}
            <div className="absolute bottom-6 left-6 flex items-stretch gap-3">
              <div className="bg-white/95 backdrop-blur-md p-[10px_14px] rounded-[16px] shadow-sm border border-[#e4e2de] flex items-center gap-3">
                <div className="relative w-[36px] h-[36px]">
                  <div className="w-full h-full rounded-full bg-[#1a6b5c] text-white flex items-center justify-center font-bold text-[12px]">AT</div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#1a6b5c] rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                  </div>
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-[#0e0e0e]">Dr. Aris Thorne</p>
                  <p className="text-[10px] text-[#888] font-medium tracking-[.3px] uppercase">Speaking</p>
                </div>
              </div>

              {/* Strict 5-limit Upvote Button */}
              <button 
                onClick={handleUpvote}
                disabled={userUpvotes >= 5}
                className={`flex items-center gap-[8px] px-[16px] rounded-[16px] transition-all shadow-sm border
                  ${userUpvotes > 0 
                    ? "bg-[#1a6b5c]/10 text-[#1a6b5c] border-[#1a6b5c]/30" 
                    : "bg-white text-[#888] border-[#e4e2de] hover:bg-[#f7f6f2] hover:text-[#0e0e0e]"
                  }
                  ${userUpvotes >= 5 ? "opacity-75 cursor-not-allowed" : "cursor-pointer active:scale-95"}
                `}
                title={userUpvotes >= 5 ? "Maximum upvotes reached" : "Upvote Instructor"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={userUpvotes > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span className="text-[14px] font-bold font-sans">{upvotes}</span>
                
                {/* Dots indicating remaining upvotes */}
                <div className="flex gap-[2px] ml-1">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`w-[4px] h-[4px] rounded-full transition-colors ${i < userUpvotes ? 'bg-[#1a6b5c]' : 'bg-[#e4e2de]'}`}
                    ></span>
                  ))}
                </div>
              </button>
            </div>

            {/* Instructor Controls Float */}
            <div className="absolute top-6 right-6 flex flex-col gap-2 bg-white/90 backdrop-blur-md p-[6px] rounded-[14px] shadow-sm border border-[#e4e2de]">
              {['unlock', 'users', 'settings'].map((icon, i) => (
                <button key={i} className={`p-[10px] rounded-[10px] transition-colors ${icon==='settings'?'text-[#1a6b5c] bg-[#1a6b5c]/10':'text-[#888] hover:bg-[#f7f6f2] hover:text-[#0e0e0e]'}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon === 'unlock' && <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></>}
                    {icon === 'users' && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
                    {icon === 'settings' && <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>}
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Transcript Panel */}
          <div className="w-[280px] bg-white border border-[#e4e2de] rounded-[18px] flex flex-col shrink-0 shadow-sm overflow-hidden">
            <div className="p-[1.2rem] border-b border-[#e4e2de] flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-[1rem]">
                <h3 className="font-serif text-[1.1rem] text-[#0e0e0e]">Transcript</h3>
                <span className="text-[9px] font-bold text-[#1a6b5c] bg-[#1a6b5c]/10 px-[8px] py-[3px] rounded-full uppercase tracking-[1px]">Synced</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-[14px] pr-2">
                <p className="text-[12.5px] text-[#0e0e0e] leading-[1.5] font-light">
                  <span className="text-[#1a6b5c] font-medium block text-[10px] mb-1">00:12:45</span> 
                  Probability density shifts remarkably toward the center...
                </p>
                <p className="text-[12.5px] text-[#888] leading-[1.5] font-light">
                  <span className="text-[#aaa] font-medium block text-[10px] mb-1">00:13:02</span> 
                  Wait, is that the Copenhagen interpretation?
                </p>
                <p className="text-[12.5px] text-[#0e0e0e] leading-[1.5] font-light">
                  <span className="text-[#1a6b5c] font-medium block text-[10px] mb-1">00:13:10</span> 
                  Excellent question. It introduces a non-linear term...
                </p>
              </div>
            </div>
            <div className="p-[1rem] bg-[#f7f6f2]">
              <button className="w-full py-[10px] bg-[#0e0e0e] text-white text-[11px] font-semibold rounded-[12px] hover:opacity-80 transition-opacity uppercase tracking-[1px]">
                Generate AI Summary
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Floating Chat Tool */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
        
        {/* Chat Window */}
        {chatOpen && (
          <div className="w-[320px] bg-white rounded-[18px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#e4e2de] overflow-hidden flex flex-col mb-2">
            <div className="p-[14px_16px] bg-[#f7f6f2] border-b border-[#e4e2de] flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-[#0e0e0e] font-sans">Session Chat</h3>
              <button onClick={() => setChatOpen(false)} className="text-[#888] hover:text-[#0e0e0e]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            
            <div className="h-[260px] overflow-y-auto p-[16px] space-y-[16px]">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[10px] font-medium text-[#888] ml-1">Sarah Jenkins</span>
                <div className="bg-[#f7f6f2] p-[10px_12px] rounded-[12px] rounded-tl-[2px] max-w-[90%] border border-[#e4e2de]">
                  <p className="text-[12.5px] font-light text-[#0e0e0e]">Can anyone see the formula clearly?</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-medium text-[#1a6b5c] mr-1">Dr. Aris Thorne</span>
                <div className="bg-[#1a6b5c] text-white p-[10px_12px] rounded-[12px] rounded-tr-[2px] max-w-[90%]">
                  <p className="text-[12.5px] font-light">I'll zoom in for you, Sarah.</p>
                </div>
              </div>
            </div>
            
            <div className="p-[12px] border-t border-[#e4e2de] bg-white">
              <input 
                className="w-full bg-[#f7f6f2] border border-[#e4e2de] rounded-[10px] text-[13px] py-[8px] px-[12px] outline-none focus:border-[#1a6b5c]/50 placeholder:text-[#aaa] font-light" 
                placeholder="Type a message..." 
                type="text"
              />
            </div>
          </div>
        )}

        {/* Floating Actions */}
        <div className="flex gap-3">
          <button className="w-[48px] h-[48px] bg-white text-[#0e0e0e] rounded-full shadow-md border border-[#e4e2de] flex items-center justify-center hover:bg-[#f7f6f2] transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </button>
          <button 
            onClick={() => setChatOpen(!chatOpen)}
            className="w-[48px] h-[48px] bg-[#0e0e0e] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}