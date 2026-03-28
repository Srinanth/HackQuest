import { supabase } from '../config/supabase.js';

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ 
      message: "User created successfully", 
      user: data.user 
    });

  } catch (err) {
    res.status(500).json({ error: "Server error during signup" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const logout = async (req, res) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };