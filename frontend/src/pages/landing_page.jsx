import { useState, useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f9f7f4;
    --ink: #111010;
    --muted: #888;
    --teal: #1a6b5c;
    --teal-pale: #edf4f2;
    --border: #e4e2de;
  }

  body {
    font-family: 'Geist', sans-serif;
    background: var(--bg);
    color: var(--ink);
    min-height: 100vh;
  }

  /* NAV */
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4rem 2.5rem;
    border-bottom: 1px solid var(--border);
  }
  .brand {
    font-family: 'Instrument Serif', serif;
    font-size: 18px;
    letter-spacing: -0.3px;
  }
  .nav-cta {
    background: var(--ink);
    color: #fff;
    border: none;
    padding: 8px 18px;
    border-radius: 6px;
    font-size: 13px;
    font-family: 'Geist', sans-serif;
    font-weight: 400;
    cursor: pointer;
    letter-spacing: 0.1px;
    transition: opacity 0.2s;
  }
  .nav-cta:hover { opacity: 0.75; }

  /* HERO */
  .hero {
    max-width: 680px;
    margin: 0 auto;
    padding: 7rem 2rem 5rem;
    text-align: center;
  }
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    color: var(--teal);
    background: var(--teal-pale);
    border-radius: 20px;
    padding: 4px 12px;
    font-weight: 500;
    letter-spacing: 0.3px;
    margin-bottom: 2rem;
  }
  .tag-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--teal);
    animation: blink 2s infinite;
  }
  @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

  h1 {
    font-family: 'Instrument Serif', serif;
    font-size: clamp(2.8rem, 6vw, 4.2rem);
    line-height: 1.08;
    letter-spacing: -1.5px;
    color: var(--ink);
    margin-bottom: 1.4rem;
    font-weight: 400;
  }
  h1 em { font-style: italic; color: var(--teal); }

  .sub {
    font-size: 16px;
    color: var(--muted);
    line-height: 1.75;
    font-weight: 300;
    margin-bottom: 2.5rem;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
  }
  .btn-main {
    background: var(--ink);
    color: #fff;
    border: none;
    padding: 12px 26px;
    border-radius: 8px;
    font-size: 14px;
    font-family: 'Geist', sans-serif;
    font-weight: 400;
    cursor: pointer;
    transition: opacity 0.2s;
    letter-spacing: 0.1px;
  }
  .btn-main:hover { opacity: 0.75; }
  .btn-ghost {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 12px 26px;
    border-radius: 8px;
    font-size: 14px;
    font-family: 'Geist', sans-serif;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
  }
  .btn-ghost:hover { color: var(--ink); border-color: #bbb; }

  /* CARD */
  .card-wrap {
    max-width: 680px;
    margin: 3rem auto 0;
    padding: 0 2rem;
  }
  .auth-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 40px rgba(0,0,0,0.06);
  }
  .card-top {
    padding: 2rem 2rem 1.5rem;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-top-text h3 {
    font-family: 'Instrument Serif', serif;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: -0.3px;
    margin-bottom: 4px;
  }
  .card-top-text p {
    font-size: 13px;
    color: var(--muted);
    font-weight: 300;
  }
  .card-icon-wrap {
    width: 42px; height: 42px;
    background: var(--teal-pale);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
  }
  .card-body {
    padding: 1.8rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .pill-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .pill {
    font-size: 12px;
    padding: 5px 12px;
    border-radius: 20px;
    border: 1px solid var(--border);
    color: var(--muted);
    background: var(--bg);
    font-weight: 300;
  }
  .pill.active {
    background: var(--teal-pale);
    border-color: transparent;
    color: var(--teal);
    font-weight: 500;
  }
  .card-footer {
    padding: 1.2rem 2rem;
    border-top: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg);
  }
  .card-footer-text {
    font-size: 12.5px;
    color: var(--muted);
    font-weight: 300;
  }
  .card-btn {
    background: var(--teal);
    color: #fff;
    border: none;
    padding: 9px 20px;
    border-radius: 7px;
    font-size: 13px;
    font-family: 'Geist', sans-serif;
    font-weight: 400;
    cursor: pointer;
    transition: opacity 0.2s;
    display: flex; align-items: center; gap: 6px;
  }
  .card-btn:hover { opacity: 0.8; }

  /* SOCIAL PROOF */
  .proof {
    text-align: center;
    padding: 3rem 2rem 4rem;
    color: var(--muted);
    font-size: 13px;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.4rem;
    flex-wrap: wrap;
  }
  .proof-divider { color: var(--border); }
  .proof-stat { color: var(--ink); font-weight: 500; }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--border);
    padding: 1.2rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  footer span { font-size: 12px; color: var(--muted); font-weight: 300; }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links a { font-size: 12px; color: var(--muted); text-decoration: none; }
  .footer-links a:hover { color: var(--ink); }

  @media (max-width: 560px) {
    nav { padding: 1.2rem; }
    .hero { padding: 4rem 1.2rem 3rem; }
    .card-wrap { padding: 0 1.2rem; }
    footer { flex-direction: column; gap: 0.8rem; }
    .cta-row { flex-direction: column; }
    .btn-main, .btn-ghost { width: 100%; }
  }
`;

const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a6b5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function Landing() {
  return (
    <>
      <style>{css}</style>

      <nav>
        <div className="brand">Synapse</div>
        <button className="nav-cta">Get started</button>
      </nav>

      <div className="hero">
        <div className="tag">
          <span className="tag-dot" />
          Now in early access
        </div>

        <h1>
          Study together.<br />
          Learn <em>faster.</em>
        </h1>

        <p className="sub">
          Collaborative problem-solving sessions with structured roles, shared workspaces, and full session playback — built for students who take learning seriously.
        </p>

        <div className="cta-row">
          <button className="btn-main">Start for free</button>
          <button className="btn-ghost">See how it works</button>
        </div>
      </div>

      <div className="card-wrap">
        <div className="auth-card">
          <div className="card-top">
            <div className="card-top-text">
              <h3>Join a session</h3>
              <p>Pick a role and start collaborating</p>
            </div>
            <div className="card-icon-wrap">
              <IconUsers />
            </div>
          </div>
          <div className="card-body">
            <div className="pill-row">
              <span className="pill active">Solver</span>
              <span className="pill">Reviewer</span>
              <span className="pill">Observer</span>
            </div>
            <div className="pill-row">
              <span className="pill active">Mathematics</span>
              <span className="pill">Computer Science</span>
              <span className="pill">Physics</span>
              <span className="pill">Economics</span>
            </div>
          </div>
          <div className="card-footer">
            <span className="card-footer-text">Free to join — no credit card needed</span>
            <button className="card-btn">
              Sign up <IconArrow />
            </button>
          </div>
        </div>
      </div>

      <div className="proof">
        <span><span className="proof-stat">4,200+</span> active students</span>
        <span className="proof-divider">·</span>
        <span><span className="proof-stat">18,000+</span> sessions completed</span>
        <span className="proof-divider">·</span>
        <span>Sessions saved for <span className="proof-stat">7 days</span></span>
      </div>

      <footer>
        <span>© 2025 Synapse</span>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </footer>
    </>
  );
}