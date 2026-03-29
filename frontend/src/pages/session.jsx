import React, { useState, useEffect, useRef } from "react";
import { supabase } from '../lib/supabase.js';

// Mocking user context for testing. In a real app, get this from your Auth context.
const MY_USER_ID = 'student-' + Math.floor(Math.random() * 1000);
const IS_HOST = true; // Change to true to test host capabilities

export default function SynapseSession() {
  // --- UI STATE ---
  const [chatOpen, setChatOpen] = useState(false);
  const [upvotes, setUpvotes] = useState(124);
  const [userUpvotes, setUserUpvotes] = useState(0);

  // --- SESSION STATE ---
  const [canDraw, setCanDraw] = useState(IS_HOST); // Hosts can draw by default
  const [raisedHands, setRaisedHands] = useState([]);
  const [hasRaisedHand, setHasRaisedHand] = useState(false);
  
  // --- NEW: TOOL STATE ---
  const [isEraser, setIsEraser] = useState(false);

  // --- WHITEBOARD REFS ---
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const channelRef = useRef(null);

  // Current drawing settings
  const color = '#0e0e0e';
  const strokeSize = 3;

  // --- 1. SUPABASE REALTIME (The Unified useEffect) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Make canvas crisp
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Connect to specific session channel
    const roomChannel = supabase.channel('session-room-123'); 
    channelRef.current = roomChannel;

    // Attach all listeners
    roomChannel
      // A. Listen for drawing strokes
      .on('broadcast', { event: 'draw-stroke' }, (payload) => {
        const { x0, y0, x1, y1, strokeColor, size, erase } = payload.payload;
        drawLine(ctx, x0, y0, x1, y1, strokeColor, size, erase);
      })
      // B. Listen for hand raises (Host receives this)
      .on('broadcast', { event: 'raise-hand' }, (payload) => {
        const studentId = payload.payload.userId;
        setRaisedHands(prev => {
          if (!prev.includes(studentId)) return [...prev, studentId];
          return prev;
        });
      })
      // C. Listen for permission granted (Student receives this)
      .on('broadcast', { event: 'grant-draw' }, (payload) => {
        if (payload.payload.userId === MY_USER_ID) {
          setCanDraw(true);
          setHasRaisedHand(false);
          alert('The host has granted you whiteboard access!');
        }
      })
      // D. Listen for clear page event
      .on('broadcast', { event: 'clear-page' }, () => {
        const cvs = canvasRef.current;
        if (cvs) {
          cvs.getContext('2d').clearRect(0, 0, cvs.width, cvs.height);
        }
      })
      .subscribe();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      supabase.removeChannel(roomChannel);
    };
  }, []);

  // --- 2. INTERACTION LOGIC ---
  const handleUpvote = () => {
    if (userUpvotes < 5) {
      setUpvotes((prev) => prev + 1);
      setUserUpvotes((prev) => prev + 1);
    }
  };

  const raiseHand = () => {
    if (hasRaisedHand || canDraw) return;
    setHasRaisedHand(true);
    channelRef.current.send({
      type: 'broadcast',
      event: 'raise-hand',
      payload: { userId: MY_USER_ID, name: 'Student' }
    });
  };

  const grantPermission = (studentId) => {
    channelRef.current.send({
      type: 'broadcast',
      event: 'grant-draw',
      payload: { userId: studentId }
    });
    setRaisedHands(prev => prev.filter(id => id !== studentId)); 
  };

  // --- 3. EXPORT & CLEAR LOGIC ---
  const clearPage = () => {
    if (!canDraw) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'clear-page',
        payload: {}
      });
    }
  };

  const downloadCurrentPage = () => {
    const canvas = canvasRef.current;
    // Create a temporary canvas to draw the white background before exporting
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Fill with white background (otherwise transparent parts will be black in some viewers)
    tempCtx.fillStyle = '#ffffff';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    const dataUrl = tempCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `session-page-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const savePageToDatabase = async () => {
    const canvas = canvasRef.current;
    canvas.toBlob(async (blob) => {
      const fileName = `page-${Date.now()}.png`;
      const { data, error } = await supabase.storage
        .from('whiteboards')
        .upload(`sessions/room-123/${fileName}`, blob);
        
      if (error) {
        console.error('Error saving page:', error);
        return;
      }
      alert('Page saved to database successfully!');
    }, 'image/png');
  };

  // --- 4. DRAWING LOGIC ---
  const drawLine = (ctx, x0, y0, x1, y1, strokeColor, size, erase = false) => {
    // If erasing, use 'destination-out' to make pixels transparent. Otherwise normal drawing.
    ctx.globalCompositeOperation = erase ? 'destination-out' : 'source-over';
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = erase ? size * 6 : size; // Make eraser significantly thicker
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
    
    // Reset back to default
    ctx.globalCompositeOperation = 'source-over';
  };

  const startDrawing = (e) => {
    if (!canDraw) return; // Prevent drawing if no permission
    isDrawing.current = true;
    lastPos.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  };

  const draw = (e) => {
    if (!isDrawing.current || !canDraw) return;

    const ctx = canvasRef.current.getContext('2d');
    const currentX = e.nativeEvent.offsetX;
    const currentY = e.nativeEvent.offsetY;

    // Pass the isEraser state to the drawLine function
    drawLine(ctx, lastPos.current.x, lastPos.current.y, currentX, currentY, color, strokeSize, isEraser);

    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'draw-stroke',
        payload: {
          x0: lastPos.current.x,
          y0: lastPos.current.y,
          x1: currentX,
          y1: currentY,
          strokeColor: color,
          size: strokeSize,
          erase: isEraser // Tell everyone else if we are erasing
        },
      });
    }
    lastPos.current = { x: currentX, y: currentY };
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  // --- RENDER ---
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
            {/* Conditional Raised Hand UI for Host */}
            {IS_HOST && raisedHands.length > 0 && (
              <button onClick={() => grantPermission(raisedHands[0])} className="text-[11px] font-bold text-[#1a6b5c] bg-[#1a6b5c]/10 px-3 py-1.5 rounded-full animate-pulse mr-2">
                {raisedHands.length} Hand(s) Raised - Click to Grant
              </button>
            )}

            {/* Drawing Tools: Pen & Eraser */}
            <div className="flex bg-white border border-[#e4e2de] p-[3px] rounded-[12px] mr-2">
              <button 
                onClick={() => setIsEraser(false)} 
                className={`p-[6px] rounded-[8px] transition-colors ${!isEraser ? 'bg-[#f7f6f2] text-[#0e0e0e]' : 'text-[#aaa] hover:text-[#0e0e0e]'} ${!canDraw && 'opacity-50 cursor-not-allowed'}`}
                disabled={!canDraw}
                title="Pen"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </button>
              <button 
                onClick={() => setIsEraser(true)} 
                className={`p-[6px] rounded-[8px] transition-colors ${isEraser ? 'bg-[#f7f6f2] text-[#0e0e0e]' : 'text-[#aaa] hover:text-[#0e0e0e]'} ${!canDraw && 'opacity-50 cursor-not-allowed'}`}
                disabled={!canDraw}
                title="Eraser"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4C13.5 3.5 14.5 3.5 15 4L20 9C20.5 9.5 20.5 10.5 20 11L11 20" />
                </svg>
              </button>
            </div>

            {!IS_HOST && (
              <button 
                onClick={raiseHand}
                disabled={hasRaisedHand || canDraw}
                className={`flex items-center gap-2 px-[16px] py-[8px] rounded-[20px] text-[11px] font-bold uppercase tracking-[.8px] transition-colors ${canDraw ? 'bg-green-600 text-white' : hasRaisedHand ? 'bg-[#e4e2de] text-[#888]' : 'bg-[#1a6b5c] text-white hover:bg-[#2a8a74]'}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V3a2 2 0 0 0-4 0v10.5"/><path d="M6 14v-1.5a2 2 0 0 0-4 0v5C2 21.5 5 22 8 22h4c3.5 0 6-2.5 6-6v-4a2 2 0 0 0-4 0v3"/></svg>
                {canDraw ? 'Can Draw' : hasRaisedHand ? 'Hand Raised' : 'Raise Hand'}
              </button>
            )}

            <button onClick={clearPage} disabled={!canDraw} className={`flex items-center gap-2 px-[16px] py-[8px] bg-red-50 border border-red-200 text-red-600 rounded-[20px] text-[11px] font-bold uppercase tracking-[.8px] hover:bg-red-100 transition-colors ${!canDraw && 'opacity-50 cursor-not-allowed'}`}>
              Clear Page
            </button>
            
            <button onClick={downloadCurrentPage} className="flex items-center gap-2 px-[16px] py-[8px] bg-white border border-[#e4e2de] text-[#0e0e0e] rounded-[20px] text-[11px] font-bold uppercase tracking-[.8px] hover:bg-[#f7f6f2] transition-colors">
              Save Local
            </button>
            <button onClick={savePageToDatabase} className="flex items-center gap-2 px-[16px] py-[8px] bg-white border border-[#e4e2de] text-[#0e0e0e] rounded-[20px] text-[11px] font-bold uppercase tracking-[.8px] hover:bg-[#f7f6f2] transition-colors">
              To Book
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden flex bg-[#f7f6f2] p-[1rem] gap-[1rem]">
          
          {/* Whiteboard Canvas */}
          <div className="flex-1 whiteboard-grid rounded-[18px] border border-[#e4e2de] shadow-sm relative overflow-hidden">
            
            {/* THE LIVE HTML5 CANVAS */}
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
              // Change cursor based on tool and permissions
              className={`absolute inset-0 w-full h-full touch-none z-0 ${!canDraw ? 'cursor-not-allowed' : isEraser ? 'cursor-cell' : 'cursor-crosshair'}`}
            />

            {/* Instructor Overlay & Upvote */}
            <div className="absolute bottom-6 left-6 flex items-stretch gap-3 z-10 pointer-events-none">
              <div className="bg-white/95 backdrop-blur-md p-[10px_14px] rounded-[16px] shadow-sm border border-[#e4e2de] flex items-center gap-3 pointer-events-auto">
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
                className={`flex items-center gap-[8px] px-[16px] rounded-[16px] transition-all shadow-sm border pointer-events-auto
                  ${userUpvotes > 0 
                    ? "bg-[#1a6b5c]/10 text-[#1a6b5c] border-[#1a6b5c]/30" 
                    : "bg-white text-[#888] border-[#e4e2de] hover:bg-[#f7f6f2] hover:text-[#0e0e0e]"
                  }
                  ${userUpvotes >= 5 ? "opacity-75 cursor-not-allowed" : "cursor-pointer active:scale-95"}
                `}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={userUpvotes > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span className="text-[14px] font-bold font-sans">{upvotes}</span>
                <div className="flex gap-[2px] ml-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`w-[4px] h-[4px] rounded-full transition-colors ${i < userUpvotes ? 'bg-[#1a6b5c]' : 'bg-[#e4e2de]'}`}></span>
                  ))}
                </div>
              </button>
            </div>

            {/* Instructor Controls Float */}
            <div className="absolute top-6 right-6 flex flex-col gap-2 bg-white/90 backdrop-blur-md p-[6px] rounded-[14px] shadow-sm border border-[#e4e2de] z-10">
              {['unlock', 'users', 'settings'].map((icon, i) => (
                <button key={i} className={`p-[10px] rounded-[10px] transition-colors ${icon==='settings'?'text-[#1a6b5c] bg-[#1a6b5c]/10':'text-[#888] hover:bg-[#f7f6f2] hover:text-[#0e0e0e]'}`}>
                   <div className="w-4 h-4 flex items-center justify-center">
                    {icon === 'unlock' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>}
                    {icon === 'users' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                    {icon === 'settings' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
                   </div>
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