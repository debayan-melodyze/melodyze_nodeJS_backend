import express from 'express';

const router = express.Router();

import { readData } from '../controllers/readController.js';
import { writeData } from '../controllers/writeController.js';

router.get('/read/:filePath', readData);
router.post('/write/:filePath', writeData);

export default router;
