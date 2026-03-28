import express from 'express';
import {createSession} from '../controllers/sessionController.js'

const router = express.Router();

router.post('/',createSession);
router.post('/:sessionId/join', joinSession);

export default router;