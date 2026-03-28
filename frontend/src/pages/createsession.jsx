import React, { useState, useEffect } from "react";

// --- MOCK DATA ---
const INITIAL_SESSIONS = [
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

const MOCK_USERS = [
  { id: "u1", name: "Dr. Marcus Thorne", initials: "MT", role: "Faculty", activeClass: "Quantum Mechanics", bg: "bg-[#0e0e0e]", text: "text-white" },
  { id: "u2", name: "Prof. Elena Vance", initials: "EV", role: "Faculty", activeClass: null, bg: "bg-[#1a6b5c]", text: "text-white" },
  { id: "u3", name: "Sarah Jenkins", initials: "SJ", role: "Student", activeClass: "Fluid Dynamics", bg: "bg-white", text: "text-[#0e0e0e]", border: "border border-[#e4e2de]" },
  { id: "u4", name: "Julian Aris", initials: "JA", role: "Student", activeClass: null, bg: "bg-[#e4e2de]", text: "text-[#0e0e0e]" },
  { id: "u5", name: "Liam Sterling", initials: "LS", role: "Student", activeClass: null, bg: "bg-[#0e0e0e]", text: "text-white" },
  { id: "u6", name: "Chloe Dupont", initials: "CD", role: "Student", activeClass: "Modern Architecture", bg: "bg-[#1a6b5c]", text: "text-white" },
];

export default function SynapseApp() {
  const [currentView, setCurrentView] = useState("dashboard"); // 'dashboard' | 'create'
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [editingSession, setEditingSession] = useState(null); // Holds the session being edited

  // Add a new session and return to dashboard
  const handleCreateSession = (newSession) => {
    setSessions([newSession, ...sessions]);
    setCurrentView("dashboard");
  };

  // Update an existing session and return to dashboard
  const handleUpdateSession = (updatedSession) => {
    setSessions(sessions.map(s => s.id === updatedSession.id ? updatedSession : s));
    setEditingSession(null);
    setCurrentView("dashboard");
  };

  // Switch to edit mode
  const handleEditClick = (session) => {
    setEditingSession(session);
    setCurrentView("create");
  };

  // Reset states when cancelling
  const handleCancel = () => {
    setEditingSession(null);
    setCurrentView("dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col font-sans text-[#0e0e0e]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');
          .font-serif { font-family: 'Instrument Serif', serif; }
          .font-sans { font-family: 'Geist', sans-serif; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #e4e2de; border-radius: 10px; }
        `}
      </style>

      

      {/* ROUTER / VIEW MANAGER */}
      <div className="flex-1 flex flex-col">
        {currentView === "dashboard" ? (
          <DashboardView 
            sessions={sessions} 
            onNavigate={setCurrentView} 
            onEdit={handleEditClick}
          />
        ) : (
          <CreateEditSessionView 
            initialSession={editingSession}
            onCancel={handleCancel} 
            onSubmit={editingSession ? handleUpdateSession : handleCreateSession} 
          />
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-[#e4e2de] p-[1.5rem_2.5rem] flex flex-col md:flex-row items-center justify-between bg-[#f7f6f2] shrink-0">
        <span className="text-[11.5px] text-[#aaa]">© 2025 Synapse Learning Ecosystem</span>
        <div className="flex gap-[1.5rem] mt-4 md:mt-0">
          <a href="#" className="text-[11.5px] text-[#aaa] hover:text-[#0e0e0e] transition-colors">Help Center</a>
          <a href="#" className="text-[11.5px] text-[#aaa] hover:text-[#0e0e0e] transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
}


// ==========================================
// DASHBOARD VIEW
// ==========================================
function DashboardView({ sessions, onNavigate, onEdit }) {
  const [search, setSearch] = useState("");

  return (
    <main className="flex-1 max-w-[1240px] mx-auto w-full p-[2.5rem_1.5rem] grid grid-cols-[1fr_360px] gap-[2rem] items-start">
      <section className="flex flex-col gap-[1.5rem]">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-[.5rem]">
          <div>
            <div className="flex items-center gap-[1rem] mb-[.2rem]">
              <h1 className="font-serif text-[2.2rem] text-[#0e0e0e] leading-[1.1] tracking-[-.5px]">
                Your <em>Dashboard</em>
              </h1>
              <button 
                onClick={() => onNavigate("create")}
                className="bg-[#1a6b5c] text-white px-[14px] py-[6px] rounded-[20px] text-[12px] font-sans font-medium cursor-pointer hover:bg-[#2a8a74] transition-colors flex items-center gap-[6px] shadow-sm"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Create Session
              </button>
            </div>
            <p className="text-[13px] text-[#888] font-light">
              {sessions.length} total sessions · stay engaged
            </p>
          </div>
        </div>

        {/* Dynamic Session Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.2rem]">
          {sessions.map((session) => (
            <div 
              key={session.id} 
              className={`bg-white border rounded-[18px] p-[1.5rem] flex flex-col relative overflow-hidden transition-shadow hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
                ${session.primary ? "border-[#1a6b5c]/30 shadow-[0_2px_10px_-4px_rgba(26,107,92,0.15)]" : "border-[#e4e2de]"}`}
            >
              <div className={`text-[9.5px] font-bold tracking-[1px] uppercase px-[10px] py-[4px] rounded-[20px] w-fit mb-[1.2rem] ${session.statusColor}`}>
                {session.status}
              </div>
              <h3 className="font-serif text-[1.35rem] text-[#0e0e0e] leading-[1.2] mb-[.6rem] pr-4">{session.title}</h3>
              <p className="text-[12.5px] text-[#888] font-light leading-[1.6] mb-[2rem] flex-1 line-clamp-2">{session.desc}</p>

              <div className="border-t border-[#e4e2de] pt-[1.2rem] flex items-center justify-between mt-auto">
                <div className="flex items-center">
                  <div className="flex -space-x-[8px]">
                    {session.avatars.map((ava, i) => (
                      <div key={i} className={`w-[28px] h-[28px] rounded-full border-[2px] border-white flex items-center justify-center text-[9px] font-medium ${ava.bg} ${ava.text} ${ava.border||''} relative z-${30-i*10}`}>
                        {ava.init}
                      </div>
                    ))}
                    {session.extraAvatars && (
                      <div className="w-[28px] h-[28px] rounded-full border-[2px] border-white bg-[#f7f6f2] flex items-center justify-center text-[9px] font-medium text-[#888] relative z-0">
                        {session.extraAvatars}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Button: Adapts based on the session's action string */}
                <button 
                  onClick={() => session.action === "Edit Session" ? onEdit(session) : alert(`Joining ${session.title}...`)}
                  className={`text-[12px] font-medium px-[14px] py-[8px] rounded-[20px] transition-colors border
                  ${session.action === "Edit Session" 
                    ? "bg-[#0e0e0e] text-white border-[#0e0e0e] hover:bg-[#333]" 
                    : session.primary 
                      ? "bg-[#1a6b5c] text-white border-[#1a6b5c] hover:bg-[#2a8a74]" 
                      : "bg-white text-[#0e0e0e] border-[#e4e2de] hover:bg-[#f7f6f2]"}`}
                >
                  {session.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Right Column: Mini Groups */}
      <aside className="hidden lg:flex flex-col gap-[1.5rem]">
        <div className="bg-white border border-[#e4e2de] rounded-[18px] p-[1.5rem] flex flex-col h-[700px] shadow-sm">
            <div className="flex flex-col gap-[1rem] mb-[1.2rem]">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-[1.3rem] text-[#0e0e0e]">Study Groups</h2>
                <span className="bg-[#f7f6f2] text-[#888] text-[10px] font-semibold px-[8px] py-[3px] rounded-[6px]">4 Active</span>
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

            <div className="flex-1 overflow-y-auto flex flex-col gap-[4px] pr-[4px]">
              {GROUPS.map((group) => (
                <div key={group.id} className={`flex items-center gap-[12px] p-[10px] rounded-[14px] cursor-pointer transition-colors border border-transparent ${group.active ? "bg-[#1a6b5c]/5 border-[#1a6b5c]/10" : "hover:bg-[#f7f6f2]"}`}>
                  <div className="relative w-[42px] h-[42px] shrink-0">
                    <div className={`w-full h-full rounded-full flex items-center justify-center font-serif text-[1.1rem] ${group.active ? "bg-[#1a6b5c] text-white" : "bg-[#f7f6f2] border border-[#e4e2de] text-[#0e0e0e]"}`}>
                      {group.initials}
                    </div>
                    {group.id === 1 && <span className="absolute bottom-0 right-0 w-[12px] h-[12px] border-[2px] border-white rounded-full bg-[#1a6b5c]"></span>}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-[2px]">
                      <span className="font-sans font-medium text-[13.5px] text-[#0e0e0e] truncate pr-2">{group.name}</span>
                      <span className="text-[10px] text-[#888] shrink-0">{group.time}</span>
                    </div>
                    <span className={`text-[11.5px] truncate font-light ${group.active ? "text-[#1a6b5c]" : "text-[#888]"}`}>{group.msg}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-[1rem] w-full text-[12px] font-medium text-[#888] hover:text-[#0e0e0e] transition-colors py-[8px]">View all archived chats →</button>
        </div>
      </aside>
    </main>
  );
}


// ==========================================
// CREATE & EDIT SESSION VIEW
// ==========================================
function CreateEditSessionView({ initialSession, onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    title: initialSession?.title || "",
    subject: "",
    date: "",
    time: initialSession?.status?.split('· ')[1] || "",
    desc: initialSession?.desc && initialSession.desc !== "No description provided." ? initialSession.desc : ""
  });
  
  // Single selected user logic
  const [selectedUser, setSelectedUser] = useState(initialSession?.invitedUser || null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Title is required!");

    // Set Avatars: Always include the creator (You/JV) first, then the single invited user if one exists
    const creatorAvatar = { init: "JV", bg: "bg-[#0e0e0e]", text: "text-white" };
    const avatars = [creatorAvatar];
    
    if (selectedUser) {
      avatars.push({ init: selectedUser.initials, bg: selectedUser.bg, text: selectedUser.text, border: selectedUser.border });
    }

    const payload = {
      id: initialSession ? initialSession.id : Date.now(),
      status: `Scheduled · ${formData.time || 'TBD'}`,
      statusColor: "text-[#1a6b5c] bg-[#1a6b5c]/10", // Green badge for new/edited sessions
      title: formData.title,
      desc: formData.desc || "No description provided.",
      avatars: avatars,
      extraAvatars: null,
      action: "Edit Session", // Forced to Edit Session as per requirements
      primary: true,
      invitedUser: selectedUser, // Store the raw user object so it can be restored on edit
    };

    onSubmit(payload);
  };

  const handleSelectUser = (user) => {
    // If clicking the same user, deselect. Otherwise, replace the selected user (Max 1)
    if (selectedUser?.id === user.id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  return (
    <div className="flex-1 w-full max-w-[800px] mx-auto p-[2rem_1.5rem]">
      
      <div className="flex items-center justify-between mb-[2rem]">
        <div>
          <button onClick={onCancel} className="text-[#888] hover:text-[#0e0e0e] text-[13px] flex items-center gap-1 mb-[1rem] transition-colors">
            ← Back to Dashboard
          </button>
          <h1 className="font-serif text-[2.5rem] text-[#0e0e0e] leading-[1.1] tracking-[-.5px]">
            {initialSession ? "Edit" : "Create"} <em>Session</em>
          </h1>
        </div>
      </div>

      <div className="bg-white border border-[#e4e2de] rounded-[18px] shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-[2rem] flex flex-col gap-[1.5rem]">
          
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem]">
            <div className="flex flex-col gap-[6px] md:col-span-2">
              <label className="text-[11px] font-bold text-[#888] uppercase tracking-[1px]">Session Title *</label>
              <input 
                type="text" 
                placeholder="e.g., Intro to Quantum Computing"
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#f7f6f2] border border-[#e4e2de] rounded-[12px] p-[12px_16px] text-[14px] text-[#0e0e0e] outline-none focus:border-[#1a6b5c] transition-colors placeholder:text-[#aaa]"
              />
            </div>

            <div className="grid grid-cols-2 gap-[1rem] md:col-span-2">
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-bold text-[#888] uppercase tracking-[1px]">Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-[#f7f6f2] border border-[#e4e2de] rounded-[12px] p-[12px_16px] text-[14px] text-[#0e0e0e] outline-none focus:border-[#1a6b5c] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-bold text-[#888] uppercase tracking-[1px]">Time</label>
                <input 
                  type="time" 
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-[#f7f6f2] border border-[#e4e2de] rounded-[12px] p-[12px_16px] text-[14px] text-[#0e0e0e] outline-none focus:border-[#1a6b5c] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[6px] md:col-span-2">
              <label className="text-[11px] font-bold text-[#888] uppercase tracking-[1px]">Description & Goals</label>
              <textarea 
                placeholder="What will be covered in this session?"
                rows={3}
                value={formData.desc}
                onChange={e => setFormData({...formData, desc: e.target.value})}
                className="w-full bg-[#f7f6f2] border border-[#e4e2de] rounded-[12px] p-[12px_16px] text-[14px] text-[#0e0e0e] outline-none focus:border-[#1a6b5c] transition-colors placeholder:text-[#aaa] resize-none"
              />
            </div>
          </div>

          {/* Invite Section (Restricted to 1 Invitee) */}
          <div className="border-t border-[#e4e2de] pt-[1.5rem]">
            <div className="flex items-center justify-between mb-[1rem]">
              <div>
                <h3 className="font-serif text-[1.2rem] text-[#0e0e0e]">Participant</h3>
                <p className="text-[12px] text-[#888]">Invite one peer or faculty member to join you.</p>
              </div>
              <button 
                type="button"
                onClick={() => setShowInviteModal(true)}
                className="text-[12px] font-medium bg-[#f7f6f2] border border-[#e4e2de] text-[#0e0e0e] px-[14px] py-[8px] rounded-[20px] hover:bg-[#e4e2de]/50 transition-colors flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                {selectedUser ? "Change Invitee" : "Invite Person"}
              </button>
            </div>

            {/* Single Selected Avatar Preview */}
            {selectedUser && (
              <div className="flex gap-[10px] bg-[#f7f6f2]/50 p-[1rem] rounded-[12px] border border-[#e4e2de]">
                <div className="flex items-center justify-between w-full bg-white border border-[#e4e2de] p-[10px] rounded-[14px] shadow-sm">
                  <div className="flex items-center gap-[12px]">
                    <div className={`w-[32px] h-[32px] rounded-full ${selectedUser.bg} ${selectedUser.text} ${selectedUser.border||''} flex items-center justify-center text-[11px] font-bold`}>
                      {selectedUser.initials}
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[13px] font-medium text-[#0e0e0e]">{selectedUser.name}</span>
                       <span className="text-[10px] text-[#888]">{selectedUser.role}</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => setSelectedUser(null)} className="p-2 text-[#aaa] hover:text-red-500 transition-colors bg-[#f7f6f2] rounded-full">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Submit Actions */}
          <div className="flex justify-end gap-[1rem] mt-[1rem]">
            <button 
              type="button" 
              onClick={onCancel}
              className="px-[20px] py-[10px] rounded-[12px] text-[13px] font-medium text-[#888] hover:bg-[#f7f6f2] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-[24px] py-[10px] rounded-[12px] text-[13px] font-semibold text-white bg-[#1a6b5c] hover:bg-[#2a8a74] shadow-md transition-all active:scale-95"
            >
              {initialSession ? "Update Session" : "Create Session"}
            </button>
          </div>
        </form>
      </div>

      {/* INVITE MODAL OVERLAY (Single Select) */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-[#0e0e0e]/40 backdrop-blur-sm z-50 flex items-center justify-center p-[1rem]">
          <div className="bg-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] w-full max-w-[480px] overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-[1.5rem] border-b border-[#e4e2de] flex items-center justify-between bg-[#f7f6f2]/50">
              <h2 className="font-serif text-[1.5rem] text-[#0e0e0e]">Invite a Participant</h2>
              <button onClick={() => setShowInviteModal(false)} className="w-[32px] h-[32px] rounded-full bg-white border border-[#e4e2de] flex items-center justify-center hover:bg-[#f7f6f2] text-[#888] hover:text-[#0e0e0e] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto p-[1rem] flex flex-col gap-[8px]">
              {MOCK_USERS.map((user) => {
                const isSelected = selectedUser?.id === user.id;
                return (
                  <div 
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className={`flex items-center justify-between p-[12px] rounded-[16px] cursor-pointer border transition-all
                      ${isSelected ? "bg-[#1a6b5c]/5 border-[#1a6b5c]/30" : "bg-white border-transparent hover:bg-[#f7f6f2]"}`}
                  >
                    <div className="flex items-center gap-[12px]">
                      {/* Avatar */}
                      <div className={`w-[40px] h-[40px] rounded-full ${user.bg} ${user.text} ${user.border||''} flex items-center justify-center text-[13px] font-bold shadow-sm`}>
                        {user.initials}
                      </div>
                      
                      {/* Details */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-[8px] mb-[2px]">
                          <span className="font-sans font-medium text-[14px] text-[#0e0e0e]">{user.name}</span>
                          {/* Faculty Tag Requirement */}
                          {user.role === 'Faculty' && (
                            <span className="bg-[#0e0e0e] text-white text-[9px] px-[6px] py-[2px] rounded-[4px] uppercase tracking-wider font-bold">
                              Faculty
                            </span>
                          )}
                        </div>
                        
                        {/* Active Class Requirement (Green text + pulse indicator) */}
                        {user.activeClass ? (
                          <span className="text-[#1a6b5c] text-[10.5px] font-medium flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#1a6b5c] rounded-full animate-pulse"></span>
                            In Class: {user.activeClass}
                          </span>
                        ) : (
                          <span className="text-[#888] text-[10.5px] font-light">Available</span>
                        )}
                      </div>
                    </div>

                    {/* Radio-style indicator for single select */}
                    <div className={`w-[22px] h-[22px] rounded-full border-[2px] flex items-center justify-center transition-colors
                      ${isSelected ? "border-[#1a6b5c]" : "border-[#e4e2de]"}`}>
                      {isSelected && <div className="w-[10px] h-[10px] bg-[#1a6b5c] rounded-full"></div>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-[1.5rem] border-t border-[#e4e2de] bg-[#f7f6f2] flex justify-end">
              <button 
                onClick={() => setShowInviteModal(false)}
                className="bg-[#0e0e0e] text-white px-[24px] py-[10px] rounded-[12px] text-[13px] font-medium hover:opacity-80 transition-opacity shadow-sm"
              >
                Done {selectedUser ? "(1)" : "(0)"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}