import crypto from 'crypto';
import { supabase } from '../config/supabase';

export const createSession = async (req, res) => {
  try {
    const { title, scheduledStartTime } = req.body;
    const hostId = req.user.id; // Assuming your Express auth middleware still provides this

    // 1. Basic Validation
    if (!title) {
      return res.status(400).json({ error: 'Session title is required.' });
    }

    // 2. Generate a unique Room ID for WebSockets/WebRTC
    const roomId = crypto.randomBytes(4).toString('hex'); 

    // 3. Save to Database using Supabase
    const { data: newSession, error } = await supabase
      .from('sessions')
      .insert([
        {
          title: title,
          host_id: hostId, // Mapped to the snake_case column in Supabase
          scheduled_time: scheduledStartTime || new Date().toISOString(),
          status: 'scheduled',
          room_id: `room-${roomId}`
        }
      ])
      .select() // CRITICAL: This tells Supabase to return the inserted row (including the auto-generated UUID)
      .single(); // Ensures we get an object back instead of an array of length 1

    // Handle Supabase-specific errors (e.g., violating a unique constraint on room_id)
    if (error) {
      console.error('Supabase insertion error:', error);
      return res.status(400).json({ error: error.message });
    }

    // 4. Return success response
    return res.status(201).json({
      status: 'success',
      message: 'Session created successfully',
      data: {
        sessionId: newSession.id,
        roomId: newSession.room_id,
        title: newSession.title,
        status: newSession.status
      }
    });

  } catch (error) {
    // This catches actual server crashes/network failures, not Supabase validation errors
    console.error('Error in createSession controller:', error);
    return res.status(500).json({ error: 'Internal server error while creating session.' });
  }
};