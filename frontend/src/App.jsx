import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

// Pages
import AuthPage from './pages/signup';
import Login from './pages/login';
import Landing from './pages/landing_page';
import GroupChat from './pages/group_chat';
import MainLayout from './components/MainLayout';
import ExamPrepQuiz from './pages/exam_prep_quiz';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="antialiased text-slate-900 bg-white">
      <Routes>
        {/* Public Route */}
        

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/" element={<Landing />} />
        

        <Route element={<MainLayout />}>
          <Route path="/groupchat" element={<GroupChat />} /> 
          <Route path="/quiz" element={<ExamPrepQuiz />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;