import express from 'express';

const router = express.Router();

import { applyReverb } from '../audio_effect_applier/applyReverb.js';

router.post('/test', applyReverb);


export default router;
