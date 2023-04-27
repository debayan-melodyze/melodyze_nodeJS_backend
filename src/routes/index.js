import express from 'express';

const router = express.Router();

import { readData } from '../controllers/readController.js';
import { writeData } from '../controllers/writeController.js';


router.post('/read', readData);
router.post('/write', writeData);

export default router;
