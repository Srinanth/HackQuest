import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Geist', sans-serif; }

  .root { min-height: 100vh; background: #f7f6f2; display: flex; flex-direction: column; }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 50; height: 56px;
    background: rgba(247,246,242,0.92); backdrop-filter: blur(16px);
    border-bottom: 1px solid #e4e2de;
    display: flex; align-items: center; justify-content: space-between; padding: 0 1.75rem;
  }
  .brand { font-family: 'Instrument Serif', serif; font-size: 17px; color: #0e0e0e; }
  .nav-links { display: flex; align-items: center; gap: 1.6rem; }
  .nl { font-size: 13px; color: #888; text-decoration: none; font-weight: 400; transition: color .15s; }
  .nl:hover { color: #0e0e0e; }
  .nl.on { color: #0e0e0e; font-weight: 500; border-bottom: 1.5px solid #0e0e0e; padding-bottom: 2px; }
  .nav-r { display: flex; align-items: center; gap: 10px; }
  .nbtn { background: #0e0e0e; color: #fff; border: none; padding: 7px 15px; border-radius: 20px; font-size: 12.5px; font-family: 'Geist', sans-serif; font-weight: 500; cursor: pointer; transition: opacity .2s; }
  .nbtn:hover { opacity: .72; }
  .ava { width: 28px; height: 28px; border-radius: 50%; background: #1a6b5c; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600; cursor: pointer; }

  /* LAYOUT */
  .main { flex: 1; display: grid; grid-template-columns: 340px 1fr; gap: 1.5rem; max-width: 1160px; margin: 0 auto; padding: 1.75rem 1.5rem; width: 100%; }

  /* SIDEBAR */
  .sb { display: flex; flex-direction: column; gap: 1.1rem; }
  .sb-h1 { font-family: 'Instrument Serif', serif; font-size: 1.9rem; color: #0e0e0e; line-height: 1.1; letter-spacing: -.5px; margin-bottom: .3rem; }
  .sb-h1 em { font-style: italic; color: #1a6b5c; }
  .sb-p { font-size: 13px; color: #888; font-weight: 300; line-height: 1.6; }

  /* FORM CARD — black */
  .fc { background: #0e0e0e; border-radius: 18px; padding: 1.4rem; display: flex; flex-direction: column; gap: 1rem; }
  .lbl { display: block; font-size: 10px; font-weight: 600; letter-spacing: 1.1px; text-transform: uppercase; color: rgba(255,255,255,.38); margin-bottom: 5px; }
  .fi { width: 100%; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); border-radius: 9px; padding: 10px 12px; font-size: 13px; color: #fff; font-family: 'Geist', sans-serif; outline: none; transition: border-color .2s; }
  .fi::placeholder { color: rgba(255,255,255,.22); }
  .fi:focus { border-color: rgba(26,107,92,.65); }
  .fta { width: 100%; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); border-radius: 9px; padding: 10px 12px; font-size: 13px; color: #fff; font-family: 'Geist', sans-serif; outline: none; resize: none; min-height: 84px; transition: border-color .2s; }
  .fta::placeholder { color: rgba(255,255,255,.22); }
  .fta:focus { border-color: rgba(26,107,92,.65); }
  .fsel { width: 100%; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); border-radius: 9px; padding: 10px 12px; font-size: 13px; color: #fff; font-family: 'Geist', sans-serif; outline: none; appearance: none; cursor: pointer; }
  .fsel option { background: #1a1a1a; }
  .frow { display: grid; grid-template-columns: 1fr 1fr; gap: .7rem; }
  .gbtn { width: 100%; padding: 12px; background: #1a6b5c; border: none; border-radius: 9px; color: #fff; font-size: 13px; font-weight: 600; font-family: 'Geist', sans-serif; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px; transition: background .2s; }
  .gbtn:hover { background: #2a8a74; }

  /* PRO CARD — green */
  .pc { background: #1a6b5c; border-radius: 18px; padding: 1.3rem; position: relative; overflow: hidden; }
  .pc::before { content: ''; position: absolute; top: -24px; right: -24px; width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,.08); }
  .pc-t { font-family: 'Instrument Serif', serif; font-size: 1.1rem; color: #fff; margin-bottom: 3px; }
  .pc-s { font-size: 12px; color: rgba(255,255,255,.65); font-weight: 300; margin-bottom: .8rem; }
  .pc-btn { background: rgba(255,255,255,.15); border: none; color: #fff; font-size: 12px; font-weight: 500; font-family: 'Geist', sans-serif; padding: 6px 13px; border-radius: 20px; cursor: pointer; transition: background .2s; }
  .pc-btn:hover { background: rgba(255,255,255,.25); }

  /* CONTENT */
  .ct { display: flex; flex-direction: column; gap: 1.1rem; }

  /* CONTENT HEADER */
  .ct-hd { display: flex; align-items: center; justify-content: space-between; }
  .ct-hl { display: flex; align-items: center; gap: 10px; }
  .ct-icon { width: 36px; height: 36px; border-radius: 9px; background: #0e0e0e; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ct-t { font-family: 'Instrument Serif', serif; font-size: 1.15rem; color: #0e0e0e; letter-spacing: -.2px; }
  .ct-s { font-size: 11.5px; color: #888; font-weight: 300; }
  .arr-wrap { display: flex; gap: 5px; }
  .arr { width: 28px; height: 28px; border-radius: 50%; border: 1px solid #e4e2de; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #0e0e0e; transition: all .15s; }
  .arr:hover { background: #0e0e0e; color: #fff; border-color: #0e0e0e; }

  /* QUESTION CARD — black */
  .qc { background: #0e0e0e; border-radius: 18px; padding: 1.75rem; display: flex; flex-direction: column; gap: 1.1rem; position: relative; overflow: hidden; }
  .qc::before { content: ''; position: absolute; top: 0; right: 0; width: 180px; height: 180px; background: radial-gradient(circle at 100% 0%, rgba(26,107,92,.22) 0%, transparent 70%); pointer-events: none; }
  .q-ctr { display: flex; align-items: center; justify-content: space-between; }
  .q-num { font-size: 10.5px; font-weight: 600; letter-spacing: 1.3px; text-transform: uppercase; color: rgba(255,255,255,.32); }
  .q-badge { background: rgba(26,107,92,.28); border: 1px solid rgba(26,107,92,.45); color: #7ecfbe; font-size: 10px; font-weight: 600; letter-spacing: .6px; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; }
  .q-txt { font-family: 'Instrument Serif', serif; font-size: 1.35rem; color: #fff; line-height: 1.3; font-weight: 400; max-width: 600px; }
  .opts { display: flex; flex-direction: column; gap: 9px; }
  .opt { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 12px; border: 1.5px solid transparent; cursor: pointer; text-align: left; transition: all .15s; background: rgba(255,255,255,.05); width: 100%; }
  .opt:hover:not(.opt-on) { background: rgba(255,255,255,.08); }
  .opt-on { background: rgba(26,107,92,.15) !important; border-color: #1a6b5c !important; }
  .opt-ltr { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 600; transition: all .15s; }
  .opt-ltr-d { background: rgba(255,255,255,.08); color: rgba(255,255,255,.45); }
  .opt-ltr-a { background: #1a6b5c; color: #fff; }
  .opt-txt { font-size: 13.5px; line-height: 1.5; flex: 1; }
  .opt-txt-d { color: rgba(255,255,255,.6); font-weight: 300; }
  .opt-txt-a { color: #fff; font-weight: 400; }

  /* PROGRESS STRIP */
  .ps { display: flex; align-items: center; gap: 10px; background: #fff; border-radius: 12px; padding: 10px 14px; border: 1px solid #e4e2de; }
  .pd-wrap { display: flex; gap: 3px; flex: 1; }
  .pd { height: 3px; border-radius: 2px; flex: 1; background: #e4e2de; }
  .pd.cur { background: #0e0e0e; }
  .pd.dn { background: #1a6b5c; }
  .pl { font-size: 11.5px; color: #888; white-space: nowrap; font-weight: 300; }
  .psub { background: #0e0e0e; color: #fff; border: none; padding: 7px 16px; border-radius: 20px; font-size: 12px; font-weight: 500; font-family: 'Geist', sans-serif; cursor: pointer; white-space: nowrap; transition: opacity .2s; }
  .psub:hover { opacity: .72; }

  /* BOTTOM ROW */
  .br { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }

  /* mastery white */
  .mc { background: #fff; border: 1px solid #e4e2de; border-radius: 18px; padding: 1.3rem; display: flex; flex-direction: column; gap: .8rem; }
  .mc-t { font-family: 'Instrument Serif', serif; font-size: 1rem; color: #0e0e0e; }
  .mc-p { font-size: 12.5px; color: #888; line-height: 1.6; font-weight: 300; }
  .pb-row { display: flex; justify-content: space-between; font-size: 11px; color: #888; margin-bottom: 4px; }
  .pb-row span:last-child { color: #1a6b5c; font-weight: 600; }
  .pb { background: #e4e2de; border-radius: 99px; height: 4px; overflow: hidden; }
  .pbf { height: 100%; border-radius: 99px; background: #1a6b5c; }

  /* insights green */
  .ic { background: #1a6b5c; border-radius: 18px; padding: 1.3rem; display: flex; flex-direction: column; gap: .75rem; position: relative; overflow: hidden; }
  .ic::after { content: ''; position: absolute; bottom: -16px; right: -16px; width: 70px; height: 70px; border-radius: 50%; background: rgba(255,255,255,.07); }
  .ic-t { font-family: 'Instrument Serif', serif; font-size: 1rem; color: #fff; }
  .ic-q { font-size: 12.5px; color: rgba(255,255,255,.72); line-height: 1.6; font-weight: 300; font-style: italic; }
  .ic-lnk { font-size: 10.5px; font-weight: 600; color: #fff; letter-spacing: .8px; text-transform: uppercase; border: none; border-bottom: 1px solid rgba(255,255,255,.3); padding-bottom: 2px; background: none; cursor: pointer; font-family: 'Geist', sans-serif; transition: border-color .2s; width: fit-content; }
  .ic-lnk:hover { border-bottom-color: rgba(255,255,255,.8); }

  /* SESSION */
  .sc { background: #fff; border: 1px solid #e4e2de; border-left: 3px solid #0e0e0e; border-radius: 18px; padding: 1.1rem 1.4rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .sc-l { display: flex; align-items: center; gap: .9rem; }
  .sc-th { width: 46px; height: 46px; border-radius: 10px; background: #0e0e0e; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .sc-t { font-family: 'Instrument Serif', serif; font-size: .95rem; color: #0e0e0e; margin-bottom: 2px; }
  .sc-m { font-size: 11.5px; color: #888; font-weight: 300; }
  .sc-btn { background: #0e0e0e; color: #fff; border: none; padding: 7px 15px; border-radius: 20px; font-size: 12px; font-weight: 500; font-family: 'Geist', sans-serif; cursor: pointer; white-space: nowrap; transition: opacity .2s; }
  .sc-btn:hover { opacity: .72; }

  /* FOOTER */
  .foot { border-top: 1px solid #e4e2de; padding: .9rem 1.75rem; display: flex; align-items: center; justify-content: space-between; background: #f7f6f2; }
  .foot span { font-size: 11.5px; color: #aaa; }
  .foot-lnks { display: flex; gap: 1.4rem; }
  .foot-lnks a { font-size: 11.5px; color: #aaa; text-decoration: none; }
  .foot-lnks a:hover { color: #666; }
`;

const OPTS = [
  { id: "A", text: "The hippocampus consolidates short-term memories into long-term storage via synaptic strengthening" },
  { id: "B", text: "The prefrontal cortex modulates emotional responses through direct inhibition of the amygdala" },
  { id: "C", text: "Neurogenesis in the cerebellum is responsible for procedural memory formation" },
];

export default function ExamPrepQuiz() {
  const [sel, setSel] = useState("B");
  const [subj, setSubj] = useState("");
  const [topics, setTopics] = useState("");
  const [diff, setDiff] = useState("Medium");
  const [nq, setNq] = useState("10");

  return (
    <div className="root">
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <div style={{display:"flex",alignItems:"center",gap:"1.6rem"}}>
          <span className="brand">Synapse</span>
          <div className="nav-links">
            {["Dashboard","Sessions","Quizzes"].map(l=>(
              <a key={l} href="#" className={`nl${l==="Quizzes"?" on":""}`}>{l}</a>
            ))}
          </div>
        </div>
        <div className="nav-r">
          <button className="nbtn">New Session</button>
          <div className="ava">SA</div>
        </div>
      </nav>

      <div className="main">

        {/* SIDEBAR */}
        <aside className="sb">
          <div>
            <h1 className="sb-h1">AI Quiz <em>Generator</em></h1>
            <p className="sb-p">Transform study materials into tailored assessments in seconds.</p>
          </div>

          <div className="fc">
            <div>
              <label className="lbl">Subject Area</label>
              <input className="fi" value={subj} onChange={e=>setSubj(e.target.value)} placeholder="e.g. Cognitive Neuroscience" />
            </div>
            <div>
              <label className="lbl">Specific Topics</label>
              <textarea className="fta" value={topics} onChange={e=>setTopics(e.target.value)} placeholder="Enter key concepts or paste study notes..." />
            </div>
            <div className="frow">
              <div>
                <label className="lbl">Difficulty</label>
                <select className="fsel" value={diff} onChange={e=>setDiff(e.target.value)}>
                  {["Easy","Medium","Hard"].map(d=><option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="lbl">Questions</label>
                <select className="fsel" value={nq} onChange={e=>setNq(e.target.value)}>
                  {["5","10","15","20"].map(n=><option key={n}>{n}</option>)}
                </select>
              </div>
            </div>
            <button className="gbtn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Generate Quiz
            </button>
          </div>

          <div className="pc">
            <p className="pc-t">Upgrade to Pro</p>
            <p className="pc-s">Unlimited quizzes, PDF uploads and session history.</p>
            <button className="pc-btn">Learn more →</button>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="ct">

          <div className="ct-hd">
            <div className="ct-hl">
              <div className="ct-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div>
                <p className="ct-t">Neural Plasticity</p>
                <p className="ct-s">Cognitive Neuroscience · 10 questions · Medium</p>
              </div>
            </div>
            <div className="arr-wrap">
              <button className="arr">←</button>
              <button className="arr">→</button>
            </div>
          </div>

          {/* Question card */}
          <div className="qc">
            <div className="q-ctr">
              <span className="q-num">Question 1 of 10</span>
              <span className="q-badge">AI-Tailored</span>
            </div>
            <p className="q-txt">Which statement best describes the role of synaptic plasticity in memory consolidation?</p>
            <div className="opts">
              {OPTS.map(o=>{
                const on = sel===o.id;
                return (
                  <button key={o.id} onClick={()=>setSel(o.id)} className={`opt${on?" opt-on":""}`}>
                    <div className={`opt-ltr ${on?"opt-ltr-a":"opt-ltr-d"}`}>{o.id}</div>
                    <span className={`opt-txt ${on?"opt-txt-a":"opt-txt-d"}`}>{o.text}</span>
                    {on && (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{flexShrink:0}}>
                        <circle cx="12" cy="12" r="12" fill="#1a6b5c"/>
                        <path d="M7 12l4 4 6-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress strip */}
          <div className="ps">
            <div className="pd-wrap">
              {Array.from({length:10},(_,i)=>(
                <div key={i} className={`pd${i===0?" cur":""}`}/>
              ))}
            </div>
            <span className="pl">1 / 10</span>
            <button className="psub">Submit →</button>
          </div>

          <div className="br">
            <div className="mc">
              <p className="mc-t">Subject Mastery</p>
              <p className="mc-p">Based on your sessions, this quiz targets your gaps in Neural Plasticity.</p>
              <div>
                <div className="pb-row"><span>Confidence</span><span>65%</span></div>
                <div className="pb"><div className="pbf" style={{width:"65%"}}/></div>
              </div>
            </div>
            <div className="ic">
              <p className="ic-t">AI Insights</p>
              <p className="ic-q">"Tests cross-functional brain region analysis — common in high-level medical board exams."</p>
              <button className="ic-lnk">View full analysis</button>
            </div>
          </div>

          <div className="sc">
            <div className="sc-l">
              <div className="sc-th">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <div>
                <p className="sc-t">Previous Session</p>
                <p className="sc-m">Neural Plasticity · Completed 2h ago · 8 / 10 correct</p>
              </div>
            </div>
            <button className="sc-btn">Review →</button>
          </div>

        </div>
      </div>

      <footer className="foot">
        <span>© 2025 Synapse</span>
        <div className="foot-lnks">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
}