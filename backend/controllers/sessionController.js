import crypto from 'crypto';
import { AccessToken } from 'livekit-server-sdk';
import { supabase } from '../config/supabase.js';

export const createSession = async (req, res) => {
  try {
    const { title, scheduledStartTime } = req.body;
    req.user = { id: '4d64a58b-9ea1-4c92-8767-9c29ab113b52' };
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
export const joinSession = async (req, res) => {
  try {
    // --- TEMPORARY MOCK FOR TESTING ---
    req.user = { id: '4d64a58b-9ea1-4c92-8767-9c29ab113b52', name: 'Faaaa' }; 
    // ----------------------------------

    const { sessionId } = req.params;
    const userId = req.user.id;
    const userName = req.user.name;

    // 1. Check if the session exists
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: 'Session not found.' });
    }

    if (session.status === 'completed') {
      return res.status(403).json({ error: 'This session has already ended.' });
    }

    // 2. Determine Role and Permissions
    const isHost = session.host_id === userId;
    const role = isHost ? 'host' : 'student';
    // Hosts can always draw and speak. Students start with false.
    const canDraw = isHost; 
    const canSpeak = isHost;

    // 3. Register or Update Participant in Database
    // We use upsert so if they refresh the page, it just updates their entry
    const { data: participant, error: participantError } = await supabase
      .from('session_participants')
      .upsert({
        session_id: sessionId,
        user_id: userId,
        role: role,
        can_draw: canDraw,
        can_speak: canSpeak
      }, { onConflict: 'session_id, user_id' })
      .select()
      .single();

    if (participantError) {
      console.error('Error adding participant:', participantError);
      return res.status(500).json({ error: 'Could not join session.' });
    }

    // 4. Generate WebRTC (LiveKit) Token for Voice
    // Replace the mock keys with process.env.LIVEKIT_API_KEY later
    const livekitApiKey = process.env.LIVEKIT_API_KEY || 'devkey';
    const livekitApiSecret = process.env.LIVEKIT_API_SECRET || 'secret';

    const at = new AccessToken(livekitApiKey, livekitApiSecret, {
      identity: userId,
      name: userName,
    });

    // Attach permissions to the token
    at.addGrant({
      roomJoin: true,
      room: session.room_id,
      canPublish: canSpeak,      // Can they turn on their mic?
      canSubscribe: true,        // Can they hear others?
      canPublishData: true       // Needed for custom WebRTC data tracking
    });

    const voiceToken = await at.toJwt();

    // 5. Send Payload back to Frontend
    return res.status(200).json({
      status: 'success',
      data: {
        sessionDetails: {
          id: session.id,
          title: session.title,
          roomId: session.room_id,
        },
        participantDetails: {
          role: participant.role,
          canDraw: participant.can_draw,
          canSpeak: participant.can_speak,
        },
        tokens: {
          voiceToken: voiceToken // Frontend will pass this to the LiveKit client
        }
      }
    });

  } catch (error) {
    console.error('Error in joinSession:', error);
    return res.status(500).json({ error: 'Internal server error while joining session.' });
  }
};