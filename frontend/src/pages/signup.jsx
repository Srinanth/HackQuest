import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight, Check } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center p-6 relative overflow-hidden font-sans text-[#0e0e0e] selection:bg-[#1a6b5c]/20">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');
          .font-serif { font-family: 'Instrument Serif', serif; }
          .font-sans { font-family: 'Geist', sans-serif; }
        `}
      </style>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_100%_0%,rgba(26,107,92,.08)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_0%_100%,rgba(14,14,14,.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="w-full max-w-[440px] relative z-10">
        
        {/* Header */}
        <div className="mb-[2.5rem] text-center">
          <div className="inline-flex items-center justify-center w-[48px] h-[48px] bg-[#0e0e0e] rounded-[14px] mb-[1.5rem] shadow-sm">
            <span className="font-serif text-[1.8rem] text-white">S</span>
          </div>
          <h1 className="font-serif text-[3rem] text-[#0e0e0e] leading-[1] tracking-[-.5px] mb-[.5rem]">
            {isLogin ? "Welcome Back" : "Join Synapse"}
          </h1>
          <p className="text-[14px] text-[#888] font-light">
            Collaborative learning. Defined by focus.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#e4e2de] rounded-[24px] p-[2.5rem] shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[1.5rem]">
            
            {/* Full Name (Signup Only) */}
            {!isLogin && (
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-bold text-[#888] uppercase tracking-[1px]">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#aaa] group-focus-within:text-[#1a6b5c] transition-colors" />
                  <input 
                    type="text" name="fullName" placeholder="e.g. Julian Voss" 
                    className="w-full pl-[2.5rem] pr-[1rem] py-[12px] bg-[#f7f6f2] border border-[#e4e2de] rounded-[12px] focus:bg-white focus:border-[#1a6b5c] outline-none transition-colors placeholder:text-[#aaa] text-[14px] text-[#0e0e0e] font-sans"
                    onChange={handleChange} required 
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-[6px]">
              <label className="text-[11px] font-bold text-[#888] uppercase tracking-[1px]">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#aaa] group-focus-within:text-[#1a6b5c] transition-colors" />
                <input 
                  type="email" name="email" placeholder="julian@synapse.edu" 
                  className="w-full pl-[2.5rem] pr-[1rem] py-[12px] bg-[#f7f6f2] border border-[#e4e2de] rounded-[12px] focus:bg-white focus:border-[#1a6b5c] outline-none transition-colors placeholder:text-[#aaa] text-[14px] text-[#0e0e0e] font-sans"
                  onChange={handleChange} required 
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-[6px]">
              <label className="text-[11px] font-bold text-[#888] uppercase tracking-[1px]">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#aaa] group-focus-within:text-[#1a6b5c] transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" 
                  className="w-full pl-[2.5rem] pr-[2.5rem] py-[12px] bg-[#f7f6f2] border border-[#e4e2de] rounded-[12px] focus:bg-white focus:border-[#1a6b5c] outline-none transition-colors placeholder:text-[#aaa] text-[14px] text-[#0e0e0e] font-sans tracking-widest"
                  onChange={handleChange} required 
                />
                <button 
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#0e0e0e] transition-colors bg-transparent border-none cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms (Signup Only) */}
            {!isLogin && (
              <div className="flex items-center gap-[10px] mt-[.5rem]">
                <div className="relative flex items-center justify-center w-[18px] h-[18px]">
                  <input type="checkbox" className="peer appearance-none w-[18px] h-[18px] bg-[#f7f6f2] border border-[#e4e2de] rounded-[4px] checked:bg-[#1a6b5c] checked:border-[#1a6b5c] transition-all cursor-pointer m-0" required />
                  <Check className="absolute w-[12px] h-[12px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                </div>
                <p className="text-[12.5px] text-[#888] font-light">
                  I agree to the <span className="text-[#0e0e0e] font-medium border-b border-[#0e0e0e]/30 cursor-pointer hover:border-[#0e0e0e]">Terms of Service</span>
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" disabled={loading}
              className="w-full bg-[#0e0e0e] hover:bg-[#1a6b5c] text-white font-semibold text-[13px] tracking-[.5px] py-[14px] rounded-[14px] transition-all flex items-center justify-center gap-[8px] active:scale-[0.98] shadow-sm mt-[.5rem] uppercase border-none cursor-pointer group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin w-[18px] h-[18px]" /> : (
                <>
                  {isLogin ? "Log In" : "Create Account"}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
          </form>
        </div>

        {/* Toggle Footer */}
        <div className="mt-[2rem] text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#888] text-[13px] font-light hover:text-[#0e0e0e] transition-colors bg-transparent border-none cursor-pointer"
          >
            {isLogin ? "New to Synapse? " : "Already have an account? "} 
            <span className="text-[#0e0e0e] font-medium border-b border-[#0e0e0e]/30 pb-[1px] hover:border-[#0e0e0e] transition-colors">
              {isLogin ? "Create an account" : "Log in here"}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Auth;