const express = require('express');
const router = express.Router();

const { readFile } = require('../controllers/readController');
const { writeFile } = require('../controllers/writeController');

router.get('/read/:filePath', readFile);
router.post('/write/:filePath', writeFile);

module.exports = router;
