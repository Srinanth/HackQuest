import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative">
      {/* Decorative Top Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500"></div>

      <div className="w-full max-w-[440px] relative z-10">
        
        {/* Header Section */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-50 rounded-2xl mb-6 border border-emerald-100">
            <ShieldCheck className="text-emerald-600 w-7 h-7" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 text-sm mt-3 font-medium">
            Log in to access your <span className="text-emerald-600 font-bold underline underline-offset-4 decoration-emerald-200">7-day study session</span>.
          </p>
        </header>

        {/* Login Form */}
        <div className="bg-white rounded-[2.5rem] p-2">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="email" 
                  name="email"
                  placeholder="leo@scholarly.edu" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 text-slate-900 font-semibold"
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Security Key</label>
                <button type="button" className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  placeholder="••••••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 text-slate-900 font-semibold"
                  onChange={handleChange}
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-black py-4.5 rounded-2xl shadow-xl shadow-emerald-900/10 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  LOG IN <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
        </div>

        {/* Footer Link */}
        <footer className="mt-12 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Don't have an account? 
            <Link 
              to="/signup" 
              className="ml-2 text-slate-900 font-black underline underline-offset-4 hover:text-emerald-600 transition-colors"
            >
              Join the circle
            </Link>
          </p>
        </footer>
      </div>

    </div>
  );
};

export default Login;