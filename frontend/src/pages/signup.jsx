import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ChevronRight, Check } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        navigate('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { data: { full_name: formData.fullName } }
        });
        if (error) throw error;
        alert("Success! Please check your email for a verification link.");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>

      <div className="w-full max-w-[460px] relative z-10">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-2xl mb-6 shadow-lg shadow-emerald-200">
            <div className="w-6 h-6 border-4 border-white rounded-sm"></div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
            {isLogin ? "Welcome Back" : "Get Started"}
          </h1>
          <p className="text-slate-500 text-[15px] font-medium">
            Collaborative learning with <span className="text-emerald-600 font-bold">7-day persistence</span>.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-emerald-900/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                  <input 
                    type="text" name="fullName" placeholder="Leonardo da Vinci" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 text-slate-900 font-medium"
                    onChange={handleChange} required 
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="email" name="email" placeholder="leo@scholarly.edu" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 text-slate-900 font-medium"
                  onChange={handleChange} required 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} name="password" placeholder="••••••••••••" 
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 text-slate-900 font-medium"
                  onChange={handleChange} required 
                />
                <button 
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms (Signup Only) */}
            {!isLogin && (
              <div className="flex items-center gap-3 pt-2 ml-1">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input type="checkbox" className="peer appearance-none w-5 h-5 bg-slate-100 rounded-md checked:bg-emerald-500 transition-all cursor-pointer" required />
                  <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <p className="text-xs text-slate-400 font-medium">I agree to the <span className="text-slate-900 font-bold underline cursor-pointer">Terms</span></p>
              </div>
            )}

            <button 
              type="submit" disabled={loading}
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-xl shadow-slate-200 mt-4 group"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  {isLogin ? "LOG IN" : "CREATE ACCOUNT"}
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
          </form>
        </div>

        {/* Toggle Footer */}
        <div className="mt-10 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-400 text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            {isLogin ? "New here? " : "Joined before? "} 
            <span className="text-slate-900 font-black underline underline-offset-4">
              {isLogin ? "Create an account" : "Log in now"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;