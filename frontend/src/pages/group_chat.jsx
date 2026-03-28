import React, { useState } from "react";

const MEMBERS = {
  instructors: [
    { id: "i1", name: "Dr. Marcus Thorne", status: "Session Lead", initials: "MT", dot: "bg-[#7ecfbe]", isInst: true },
  ],
  students: [
    { id: "s1", name: "Julian Voss (You)", status: "Online", initials: "JV", dot: "bg-[#1a6b5c]" },
    { id: "s2", name: "Sarah Jenkins", status: "Online", initials: "SJ", dot: "bg-[#1a6b5c]" },
    { id: "s3", name: "Liam Ross", status: "Online", initials: "LR", dot: "bg-[#1a6b5c]" },
    { id: "s4", name: "Chloe Mitchell", status: "Away • 12m", initials: "CM", dot: "bg-[#e4e2de]" },
    { id: "s5", name: "Alex Thompson", status: "Offline", initials: "AT", dot: "bg-transparent border border-[#e4e2de]", faded: true },
  ]
};

const MESSAGES = [
  { type: "divider", text: "TODAY" },
  { id: 1, sender: "Sarah J.", initials: "SJ", time: "10:24 AM", text: "Hey everyone, did anyone catch the specific dimensions for the final project model?", isMe: false },
  { id: 2, sender: "Me", initials: "JV", time: "10:27 AM", text: "I believe it was 1:50 scale, but let me double check the syllabus.", isMe: true },
  { 
    id: 3, 
    sender: "Dr. Thorne", 
    initials: "MT", 
    time: "10:35 AM", 
    isInstructor: true,
    text: "Excellent observation on page 42. I've uploaded a supplementary video that breaks down that specific spatial diagram in 3D. It might clarify some of those denser paragraphs.", 
    attachment: { name: "Bauhaus_Spatial_Analysis_v1.mp4", size: "14.2 MB • Video Session" }
  },
  { id: 4, sender: "Liam R.", initials: "LR", time: "10:41 AM", text: "That makes a lot more sense now. Thanks Dr. Thorne!", isMe: false }
];

export default function SynapseGroupChat() {
  const [msgInput, setMsgInput] = useState("");

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col font-sans text-[#0e0e0e]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');
          .font-serif { font-family: 'Instrument Serif', serif; }
          .font-sans { font-family: 'Geist', sans-serif; }
        `}
      </style>

      {/* TOP NAVIGATION */}
      <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-6 z-20 sticky top-0">
        <div className="flex items-center gap-10">
          <span className="font-manrope font-bold text-[20px] text-[#0F172A] tracking-tight">StudioConnect</span>
          <div className="flex gap-6 pt-1">
            <a href="#" className="font-inter font-medium text-[16px] text-slate-600 hover:text-blue-600 transition-colors">Dashboard</a>
            <a href="#" className="font-inter font-medium text-[16px] text-[#1D4ED8] border-b-2 border-[#1D4ED8] pb-4">Messages</a>
            <a href="#" className="font-inter font-medium text-[16px] text-slate-600 hover:text-blue-600 transition-colors">Files</a>
            <a href="#" className="font-inter font-medium text-[16px] text-slate-600 hover:text-blue-600 transition-colors">Calendar</a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-[#005BBF] hover:bg-[#004a9e] text-white font-inter font-bold text-[14px] px-5 py-2 rounded-full transition-colors mr-2">
            New Chat
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#414754" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#414754" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#ADC7FF] border-2 border-white shadow-sm flex items-center justify-center ml-2 text-xs font-bold text-[#005BBF]">
            JV
          </div>
        </div>
      </nav>

      {/* LAYOUT */}
      <main className="flex-1 grid grid-cols-[340px_1fr] gap-[1.5rem] max-w-[1160px] mx-auto w-full p-[1.75rem_1.5rem]">
        
        {/* SIDEBAR */}
        <aside className="flex flex-col gap-[1.1rem]">
          <div>
            <h1 className="font-serif text-[1.9rem] text-[#0e0e0e] leading-[1.1] tracking-[-.5px] mb-[.3rem]">
              Group <em>Chat</em>
            </h1>
            <p className="text-[13px] text-[#888] font-light leading-[1.6]">
              Collaborative problem-solving session for Arch 301.
            </p>
          </div>

          {/* INSTRUCTOR CARD — green */}
          <div className="bg-[#1a6b5c] rounded-[18px] p-[1.3rem] relative overflow-hidden">
            <div className="absolute top-[-24px] right-[-24px] w-[80px] h-[80px] rounded-full bg-white/10 pointer-events-none"></div>
            <p className="font-serif text-[1.1rem] text-white mb-4 relative z-10">Lead Instructor</p>
            
            {MEMBERS.instructors.map(member => (
              <div key={member.id} className="flex items-center gap-3 relative z-10">
                <div className="relative w-[36px] h-[36px] shrink-0">
                  <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center font-semibold text-[13px] text-white">
                    {member.initials}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-[10px] h-[10px] border-2 border-[#1a6b5c] rounded-full ${member.dot}`}></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-white">{member.name}</span>
                  <span className="text-[11.5px] text-white/70 font-light">{member.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* STUDENTS CARD — white */}
          <div className="bg-white border border-[#e4e2de] rounded-[18px] p-[1.3rem] flex flex-col gap-[1rem]">
            <p className="font-serif text-[1rem] text-[#0e0e0e]">Participants (17)</p>
            
            <div className="flex flex-col gap-3">
              {MEMBERS.students.map(member => (
                <div key={member.id} className={`flex items-center gap-3 ${member.faded ? 'opacity-50' : ''}`}>
                  <div className="relative w-[32px] h-[32px] shrink-0">
                    <div className="w-full h-full rounded-full bg-[#f7f6f2] border border-[#e4e2de] flex items-center justify-center font-medium text-[11px] text-[#0e0e0e]">
                      {member.initials}
                    </div>
                    <span className={`absolute bottom-[-2px] right-[-2px] w-[10px] h-[10px] border-2 border-white rounded-full ${member.dot}`}></span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[13px] text-[#0e0e0e] ${member.id === 's1' ? 'font-medium' : 'font-light'}`}>
                      {member.name}
                    </span>
                    <span className="text-[11px] text-[#888] font-light">{member.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-2 w-full py-[10px] bg-[#f7f6f2] text-[#0e0e0e] border border-[#e4e2de] rounded-[9px] text-[12px] font-medium hover:bg-[#e4e2de]/50 transition-colors">
              + Invite Member
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex flex-col gap-[1.1rem]">
          
          {/* CONTENT HEADER */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <div className="w-[36px] h-[36px] rounded-[9px] bg-[#0e0e0e] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <p className="font-serif text-[1.15rem] text-[#0e0e0e] tracking-[-.2px]">Arch 301: Modernism Seminar</p>
                <p className="text-[11.5px] text-[#888] font-light">Active Session · 5 Online</p>
              </div>
            </div>
            <div className="flex gap-[5px]">
               <button className="w-[28px] h-[28px] rounded-full border border-[#e4e2de] bg-white flex items-center justify-center text-[11px] text-[#0e0e0e] hover:bg-[#0e0e0e] hover:text-white transition-all cursor-pointer">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
               </button>
            </div>
          </div>

          {/* CHAT CARD — black */}
          <div className="bg-[#0e0e0e] rounded-[18px] p-[1.75rem] flex flex-col relative overflow-hidden flex-1 min-h-[500px]">
            {/* Background flourish matching the Quiz Question card */}
            <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-[radial-gradient(circle_at_100%_0%,rgba(26,107,92,.22)_0%,transparent_70%)] pointer-events-none"></div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-[1.2rem] relative z-10 mb-4">
              {MESSAGES.map((msg, i) => {
                if (msg.type === "divider") {
                  return (
                    <div key={`div-${i}`} className="flex justify-center my-2">
                      <span className="text-[10.5px] font-semibold tracking-[1.3px] uppercase text-white/30">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                const isMe = msg.isMe;
                const isInst = msg.isInstructor;

                return (
                  <div key={msg.id} className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"} w-full`}>
                    
                    {/* Avatar */}
                    <div className={`w-[32px] h-[32px] shrink-0 rounded-full flex items-center justify-center text-[11px] font-medium
                      ${isMe ? "bg-[#1a6b5c] text-white" : isInst ? "bg-white text-[#0e0e0e]" : "bg-white/10 text-white/60"}`}>
                      {msg.initials}
                    </div>

                    {/* Bubble Container */}
                    <div className={`flex flex-col gap-1.5 max-w-[80%] ${isMe ? "items-end" : "items-start"}`}>
                      
                      {/* Name & Time */}
                      <div className={`flex items-baseline gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                        <span className={`font-sans text-[13px] ${isInst ? "text-[#7ecfbe] font-medium" : "text-white/90 font-light"}`}>
                          {msg.sender}
                        </span>
                        {isInst && (
                          <span className="bg-[#1a6b5c]/30 border border-[#1a6b5c]/50 text-[#7ecfbe] text-[9px] font-semibold tracking-[.6px] uppercase px-[6px] py-[2px] rounded-[20px]">
                            Instructor
                          </span>
                        )}
                        <span className="font-sans text-[10px] text-white/40">{msg.time}</span>
                      </div>

                      {/* Bubble */}
                      <div className={`p-3.5 text-[13.5px] leading-[1.6] font-light
                        ${isMe 
                          ? "bg-[#1a6b5c]/20 border border-[#1a6b5c]/50 text-white rounded-[12px] rounded-tr-[2px]" 
                          : isInst 
                            ? "bg-white/10 border border-[#7ecfbe]/30 text-white rounded-[12px] rounded-tl-[2px]"
                            : "bg-white/5 border border-white/10 text-white/80 rounded-[12px] rounded-tl-[2px]"
                        }`}>
                        
                        <p>{msg.text}</p>
                        
                        {/* Attachment */}
                        {msg.attachment && (
                          <div className="mt-3 bg-black/40 border border-white/10 rounded-[9px] p-2.5 flex items-center gap-3">
                            <div className="w-[30px] h-[30px] rounded-[6px] bg-white/10 flex items-center justify-center shrink-0">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7ecfbe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-[12px] text-white/90">{msg.attachment.name}</span>
                              <span className="text-[10px] text-white/50">{msg.attachment.size}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <div className="relative z-10 mt-auto pt-3 border-t border-white/10 flex gap-3 items-end">
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-[9px] p-[10px_12px] text-[13px] text-white font-sans outline-none resize-none min-h-[44px] max-h-[120px] transition-colors focus:border-[#1a6b5c]/65 placeholder:text-white/20 leading-[1.5]"
                placeholder="Type your message..."
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                rows={1}
              />
              <button className="h-[44px] px-[16px] shrink-0 bg-[#1a6b5c] border-none rounded-[9px] text-white text-[13px] font-semibold font-sans cursor-pointer flex items-center justify-center gap-[7px] transition-colors hover:bg-[#2a8a74]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#e4e2de] p-[.9rem_1.75rem] flex items-center justify-between bg-[#f7f6f2] mt-auto">
        <span className="text-[11.5px] text-[#aaa]">© 2025 Synapse Learning</span>
        <div className="flex gap-[1.4rem]">
          <a href="#" className="text-[11.5px] text-[#aaa] no-underline hover:text-[#666]">Privacy</a>
          <a href="#" className="text-[11.5px] text-[#aaa] no-underline hover:text-[#666]">Terms</a>
        </div>
      </footer>
    </div>
  );
}