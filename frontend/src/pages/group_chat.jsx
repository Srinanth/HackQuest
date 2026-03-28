import React, { useState } from "react";

const MEMBERS = {
  instructors: [
    { id: "i1", name: "Dr. Marcus Thorne", status: "Online • Active Now", initials: "MT", dot: "bg-[#006A61]", isInst: true },
  ],
  students: [
    { id: "s1", name: "Julian Voss (You)", status: "Online", initials: "JV", dot: "bg-[#006A61]" },
    { id: "s2", name: "Sarah Jenkins", status: "Online", initials: "SJ", dot: "bg-[#006A61]" },
    { id: "s3", name: "Liam Ross", status: "Online", initials: "LR", dot: "bg-[#006A61]" },
    { id: "s4", name: "Chloe Mitchell", status: "Away • 12m", initials: "CM", dot: "bg-[#CBD5E1]" },
    { id: "s5", name: "Alex Thompson", status: "Offline", initials: "AT", dot: "bg-transparent border border-gray-300", faded: true },
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

export default function GroupChat() {
  const [msgInput, setMsgInput] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FB] text-[#191C1E] font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700&display=swap');
          .font-manrope { font-family: 'Manrope', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex overflow-hidden mx-auto w-full max-w-[1400px]">
        
        {/* CHAT SECTION */}
        <section className="flex-1 flex flex-col relative bg-[#F7F9FB]">
          
          {/* Chat Header */}
          <header className="h-[64px] bg-white/80 backdrop-blur-md flex items-center justify-between px-6 z-10 sticky top-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#D0E1FB] rounded-xl flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#005BBF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <div>
                <h1 className="font-manrope font-bold text-[16px] text-[#191C1E]">Arch 301: Modernism Seminar</h1>
                <div className="flex items-center gap-2 mt-[2px]">
                  <span className="w-2 h-2 rounded-full bg-[#006A61]"></span>
                  <p className="font-inter font-medium text-[12px] text-[#414754]">18 Participants • 5 Online</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full hover:bg-slate-200/50 flex items-center justify-center transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#414754" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </button>
              <button className="w-9 h-9 rounded-full hover:bg-slate-200/50 flex items-center justify-center transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#414754" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </button>
            </div>
          </header>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 pb-32">
            <div className="max-w-[768px] mx-auto flex flex-col gap-6">
              
              {MESSAGES.map((msg, i) => {
                if (msg.type === "divider") {
                  return (
                    <div key={`div-${i}`} className="flex justify-center my-4">
                      <span className="bg-[#ECEEF0] text-[#414754] font-inter font-bold text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                const isMe = msg.isMe;
                const isInst = msg.isInstructor;

                return (
                  <div key={msg.id} className={`flex gap-4 ${isMe ? "flex-row-reverse" : "flex-row"} w-full`}>
                    
                    {/* Avatar */}
                    <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold text-[12px] text-white
                      ${isMe ? "bg-[#1A73E8]" : isInst ? "bg-[#006A61]" : "bg-[#64748B]"}`}>
                      {msg.initials}
                    </div>

                    {/* Message Body */}
                    <div className={`flex flex-col gap-1.5 max-w-[680px] ${isMe ? "items-end" : "items-start"}`}>
                      
                      {/* Name & Time */}
                      <div className={`flex items-baseline gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                        <span className={`font-manrope font-bold text-[14px] ${isInst ? "text-[#006A61]" : "text-[#191C1E]"}`}>
                          {msg.sender}
                        </span>
                        {isInst && (
                          <span className="bg-[#006A61]/10 text-[#006A61] font-inter font-bold text-[9px] uppercase tracking-wide px-2 py-0.5 rounded">Instructor</span>
                        )}
                        <span className="font-inter text-[10px] text-[#414754]">{msg.time}</span>
                      </div>

                      {/* Message Bubble */}
                      <div className={`p-4 shadow-sm font-inter text-[14px] leading-[1.62] 
                        ${isMe 
                          ? "bg-[#005BBF] text-white rounded-tl-xl rounded-b-xl" 
                          : isInst 
                            ? "bg-[#D0E1FB] text-[#191C1E] border-l-4 border-[#005BBF] rounded-tr-xl rounded-b-xl"
                            : "bg-[#F2F4F6] text-[#191C1E] rounded-tr-xl rounded-b-xl"
                        }`}>
                        
                        <p>{msg.text}</p>
                        
                        {/* Attachment Block (if any) */}
                        {msg.attachment && (
                          <div className="mt-3 bg-white/60 border border-slate-300/30 rounded-lg p-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-[#005BBF] flex items-center justify-center shrink-0">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-inter font-semibold text-[12px] text-[#191C1E]">{msg.attachment.name}</span>
                              <span className="font-inter text-[10px] text-[#414754]">{msg.attachment.size}</span>
                            </div>
                            <button className="ml-auto w-6 h-6 bg-white rounded flex items-center justify-center hover:bg-slate-100 shadow-sm border border-slate-200">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#005BBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F7F9FB] via-[#F7F9FB] to-transparent pt-12">
            <div className="max-w-[896px] mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-2 flex items-end gap-2">
              <button className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-[#414754]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              
              <textarea 
                className="flex-1 max-h-[120px] min-h-[40px] resize-none outline-none py-2.5 font-inter text-[14px] placeholder-slate-400 bg-transparent text-[#191C1E]"
                placeholder="Type your message to the group..."
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                rows={1}
              />
              
              <div className="flex items-center gap-1 mb-[2px]">
                <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-[#414754]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </button>
                <div className="px-1">
                  <button className="w-10 h-10 bg-[#005BBF] rounded-xl flex items-center justify-center hover:bg-[#004a9e] transition-colors shadow-[0_4px_6px_-2px_rgba(0,0,0,0.1)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SIDEBAR */}
        <aside className="w-[320px] bg-[#F2F4F6] border-l border-slate-200/60 flex flex-col shrink-0">
          
          <div className="p-6 border-b border-slate-200/60">
            <h3 className="font-manrope font-bold text-[16px] text-[#191C1E]">Group Members</h3>
            <p className="font-inter text-[12px] text-[#414754] mt-1">18 Participants Total</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
            
            {/* Instructors Section */}
            <div>
              <h4 className="font-inter font-semibold text-[10px] uppercase tracking-wider text-[#414754] px-2 mb-2">Instructors</h4>
              <div className="flex flex-col gap-1">
                {MEMBERS.instructors.map(member => (
                  <div key={member.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/60 transition-colors cursor-pointer">
                    <div className="relative w-10 h-10 shrink-0">
                      <div className="w-full h-full rounded-full bg-[#006A61]/10 border border-[#006A61]/30 flex items-center justify-center font-bold text-[14px] text-[#006A61]">
                        {member.initials}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#F2F4F6] rounded-full ${member.dot}`}></span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-inter font-semibold text-[14px] text-[#191C1E]">{member.name}</span>
                      <span className="font-inter font-medium text-[11px] text-[#006A61]">{member.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Students Section */}
            <div>
              <h4 className="font-inter font-semibold text-[10px] uppercase tracking-wider text-[#414754] px-2 mb-2">Students — 17</h4>
              <div className="flex flex-col gap-1">
                {MEMBERS.students.map(member => (
                  <div key={member.id} className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/60 transition-colors cursor-pointer ${member.faded ? 'opacity-60 grayscale' : ''}`}>
                    <div className="relative w-10 h-10 shrink-0">
                      <div className="w-full h-full rounded-full bg-[#E2E8F0] flex items-center justify-center font-bold text-[14px] text-[#414754]">
                        {member.initials}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#F2F4F6] rounded-full ${member.dot}`}></span>
                    </div>
                    <div className="flex flex-col">
                      <span className={`font-inter text-[14px] text-[#191C1E] ${member.id === 's1' ? 'font-semibold' : 'font-medium'}`}>{member.name}</span>
                      <span className={`font-inter text-[11px] ${member.id === 's1' ? 'text-[#006A61] font-medium' : 'text-[#414754]'}`}>{member.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          <div className="p-4 bg-slate-200/30">
            <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl font-inter font-bold text-[12px] uppercase tracking-wide text-[#414754] flex justify-center items-center gap-2 hover:bg-white/50 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Invite Member
            </button>
          </div>
        </aside>

      </main>
      
      {/* FOOTER */}
      <footer className="bg-[#F8FAFC] border-t border-slate-200 py-6 px-12 flex justify-between items-center z-20">
        <span className="font-inter text-[12px] text-[#64748B]">© 2024 StudioConnect Learning Platform</span>
        <div className="flex gap-6">
          <a href="#" className="font-inter text-[12px] text-[#64748B] hover:text-[#0F172A] underline opacity-80 transition-colors">Help Center</a>
          <a href="#" className="font-inter text-[12px] text-[#64748B] hover:text-[#0F172A] underline opacity-80 transition-colors">Community Guidelines</a>
          <a href="#" className="font-inter text-[12px] text-[#64748B] hover:text-[#0F172A] underline opacity-80 transition-colors">Privacy</a>
        </div>
      </footer>

    </div>
  );
}