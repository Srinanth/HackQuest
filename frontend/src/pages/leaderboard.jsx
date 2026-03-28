import React, { useState } from "react";

const PODIUM = [
  { rank: 2, name: "Elena Vance", upvotes: "2,840", title: "Insight Contributor", initials: "EV", bg: "bg-[#0e0e0e]", text: "text-white", cardBg: "bg-white text-[#0e0e0e] border-[#e4e2de]" },
  { rank: 1, name: "Julian Aris", upvotes: "3,120", title: "Master Collaborator", initials: "JA", bg: "bg-white", text: "text-[#1a6b5c]", cardBg: "bg-[#1a6b5c] text-white border-[#1a6b5c] scale-105 z-10 shadow-[0_8px_30px_rgba(26,107,92,0.2)]" },
  { rank: 3, name: "Maya Thorne", upvotes: "2,610", title: "Visual Thinker", initials: "MT", bg: "bg-[#e4e2de]", text: "text-[#0e0e0e]", cardBg: "bg-white text-[#0e0e0e] border-[#e4e2de]" },
];

const RANKINGS = [
  { rank: 4, name: "Liam Sterling", role: "Product Design", sessions: 42, upvotes: "2,450", initials: "LS" },
  { rank: 5, name: "Sarah Jenkins", role: "History of Art", sessions: 38, upvotes: "2,310", initials: "SJ" },
  { rank: 6, name: "Chloe Dupont", role: "Philosophy", sessions: 35, upvotes: "2,190", initials: "CD" },
  { rank: 7, name: "Marcus Webb", role: "Creative Coding", sessions: 31, upvotes: "1,980", initials: "MW" },
];

export default function SynapseLeaderboard() {
  const [timeframe, setTimeframe] = useState("All Time");

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#0e0e0e] font-sans selection:bg-[#1a6b5c]/20">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');
          .font-serif { font-family: 'Instrument Serif', serif; }
          .font-sans { font-family: 'Geist', sans-serif; }
        `}
      </style>

      

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-[1000px] w-full mx-auto p-[3rem_1.5rem_5rem] flex flex-col">
        
        {/* Header Section */}
        <div className="text-center mb-[4rem]">
          <h1 className="font-serif text-[3.5rem] leading-[1.1] text-[#0e0e0e] tracking-tight mb-[1rem]">
            Session <em>Masters</em>
          </h1>
          <p className="text-[14px] text-[#888] font-light max-w-[600px] mx-auto leading-[1.6]">
            Celebrating the collaborative spirit of Synapse. Upvotes are awarded for insight, guidance, and creative contributions during live sessions.
          </p>
        </div>

        {/* Podium Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem] mb-[4rem] items-end px-[1rem]">
          {PODIUM.map((user) => (
            <div key={user.rank} className={`flex flex-col items-center ${user.rank === 1 ? "order-first md:order-none" : ""}`}>
              {/* Avatar Bubble */}
              <div className={`relative mb-[1.5rem] ${user.rank === 1 ? "w-[100px] h-[100px]" : "w-[80px] h-[80px]"}`}>
                <div className={`w-full h-full rounded-full flex items-center justify-center border-[4px] border-[#f7f6f2] font-serif ${user.bg} ${user.text} ${user.rank === 1 ? "text-[2.5rem]" : "text-[2rem]"}`}>
                  {user.initials}
                </div>
                {/* Rank Badge */}
                <div className={`absolute -bottom-2 -right-2 w-[32px] h-[32px] rounded-full border-[3px] border-[#f7f6f2] flex items-center justify-center font-bold text-[12px] font-sans
                  ${user.rank === 1 ? "bg-[#1a6b5c] text-white" : "bg-[#0e0e0e] text-white"}`}>
                  {user.rank}
                </div>
                {/* Crown for Rank 1 */}
                {user.rank === 1 && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#f7f6f2] p-[4px] rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a6b5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                )}
              </div>

              {/* Podium Card */}
              <div className={`w-full rounded-[18px] p-[1.8rem] text-center border transition-transform ${user.cardBg}`}>
                <h3 className="font-serif text-[1.5rem] leading-[1.2] mb-[.2rem]">{user.name}</h3>
                <p className={`font-sans font-semibold text-[1.2rem] tracking-[-.5px] mb-[.8rem] flex items-center justify-center gap-1.5 ${user.rank === 1 ? "text-[#7ecfbe]" : "text-[#1a6b5c]"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  {user.upvotes}
                </p>
                <div className={`inline-block px-[10px] py-[4px] rounded-[20px] text-[9.5px] font-bold tracking-[1px] uppercase
                  ${user.rank === 1 ? "bg-white/10 text-white" : "bg-[#f7f6f2] text-[#888]"}`}>
                  {user.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white border border-[#e4e2de] rounded-[18px] overflow-hidden mb-[3rem]">
          <div className="p-[1.5rem_2rem] border-b border-[#e4e2de] flex justify-between items-center bg-[#f7f6f2]/50">
            <h2 className="font-serif text-[1.3rem] text-[#0e0e0e]">Session Rankings</h2>
            
            {/* Segmented Control */}
            <div className="flex bg-[#f7f6f2] border border-[#e4e2de] rounded-full p-[4px]">
              {["Monthly", "All Time"].map((tf) => (
                <button 
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-[16px] py-[6px] rounded-full text-[11px] font-semibold transition-all
                    ${timeframe === tf ? "bg-white text-[#0e0e0e] shadow-sm border border-[#e4e2de]" : "text-[#888] hover:text-[#0e0e0e]"}`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white">
                  <th className="px-[2rem] py-[1rem] text-[10px] font-bold text-[#aaa] uppercase tracking-[1.5px] border-b border-[#e4e2de]">Rank</th>
                  <th className="px-[2rem] py-[1rem] text-[10px] font-bold text-[#aaa] uppercase tracking-[1.5px] border-b border-[#e4e2de]">Student</th>
                  <th className="px-[2rem] py-[1rem] text-[10px] font-bold text-[#aaa] uppercase tracking-[1.5px] border-b border-[#e4e2de] text-center">Sessions</th>
                  <th className="px-[2rem] py-[1rem] text-[10px] font-bold text-[#aaa] uppercase tracking-[1.5px] border-b border-[#e4e2de] text-right">Upvotes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e2de]">
                {RANKINGS.map((row) => (
                  <tr key={row.rank} className="hover:bg-[#f7f6f2] transition-colors group">
                    <td className="px-[2rem] py-[1.2rem] text-[13px] font-semibold text-[#888] group-hover:text-[#0e0e0e] transition-colors">
                      {row.rank}
                    </td>
                    <td className="px-[2rem] py-[1.2rem]">
                      <div className="flex items-center gap-[1rem]">
                        <div className="w-[36px] h-[36px] rounded-full bg-[#f7f6f2] border border-[#e4e2de] flex items-center justify-center text-[11px] font-medium text-[#0e0e0e]">
                          {row.initials}
                        </div>
                        <div>
                          <p className="font-sans font-medium text-[13.5px] text-[#0e0e0e]">{row.name}</p>
                          <p className="text-[11.5px] text-[#888] font-light">{row.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-[2rem] py-[1.2rem] text-[13px] text-[#0e0e0e] font-medium text-center">
                      {row.sessions}
                    </td>
                    <td className="px-[2rem] py-[1.2rem] text-right">
                      <span className="bg-[#1a6b5c]/10 text-[#1a6b5c] px-[10px] py-[4px] rounded-[12px] text-[12px] font-bold flex items-center gap-1 w-fit ml-auto">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        {row.upvotes}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-[1rem] text-center border-t border-[#e4e2de] bg-[#f7f6f2]/50">
            <button className="text-[11px] font-semibold text-[#0e0e0e] hover:opacity-70 transition-opacity">
              View All 20 Rankings →
            </button>
          </div>
        </div>

        {/* Your Rank Section (Black Card) */}
        <div className="bg-[#0e0e0e] rounded-[18px] p-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-[2rem] relative overflow-hidden">
          {/* Abstract background flourish */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_100%_0%,rgba(26,107,92,.25)_0%,transparent_70%)] pointer-events-none"></div>
          
          <div className="flex items-center gap-[1.5rem] relative z-10">
            <div className="w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center border-[4px] border-[#0e0e0e] shadow-[0_0_0_2px_rgba(255,255,255,0.2)]">
              <span className="font-serif text-[2.5rem] text-[#1a6b5c]">42</span>
            </div>
            <div>
              <h2 className="font-serif text-[1.8rem] text-white leading-[1.2] mb-[.2rem]">Your Standings</h2>
              <p className="text-[13px] text-white/60 font-light max-w-[320px] leading-[1.5]">
                You're in the top 15% of students this month! Attend 2 more sessions to break into the Top 30.
              </p>
            </div>
          </div>
          
          <div className="flex gap-[1rem] relative z-10 w-full md:w-auto">
            <div className="bg-white/10 border border-white/10 p-[1.2rem] rounded-[14px] text-center flex-1 md:min-w-[120px]">
              <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-white/50 mb-[.2rem]">Sessions</p>
              <p className="text-[1.8rem] font-serif text-white">12</p>
            </div>
            <div className="bg-white/10 border border-white/10 p-[1.2rem] rounded-[14px] text-center flex-1 md:min-w-[120px]">
              <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-white/50 mb-[.2rem]">Upvotes</p>
              <p className="text-[1.8rem] font-serif text-[#7ecfbe] flex items-center justify-center gap-1.5">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                 845
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#e4e2de] p-[2rem_2.5rem] flex flex-col md:flex-row items-center justify-between bg-[#f7f6f2] mt-auto gap-[1rem]">
        <div className="flex flex-col items-center md:items-start gap-[.2rem]">
          <span className="font-serif text-[1.2rem] text-[#0e0e0e]">Synapse</span>
          <span className="text-[11.5px] text-[#aaa]">© 2025 Synapse. The Curated Learning Experience.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-[1.5rem]">
          {["Honor Code", "Terms of Service", "Privacy Policy", "Support"].map((link) => (
            <a key={link} href="#" className="text-[11.5px] text-[#aaa] no-underline hover:text-[#0e0e0e] transition-colors">
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}