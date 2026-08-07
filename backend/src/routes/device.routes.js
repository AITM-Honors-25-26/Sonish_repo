const express = require('express');
const protect = require('../middleware/auth.middleware');
const { getState, toggleRelay } = require('../controllers/device.controller');

const router = express.Router();

router.get('/relay', protect, getState);
router.post('/relay', protect, toggleRelay);

module.exports = router;
