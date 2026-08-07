const ApiError = require('../utils/apiError');
const { setRelay, getRelayState } = require('../config/mqtt');

// GET /api/device/relay — last known state reported by the ESP32
const getState = (req, res) => {
  res.status(200).json({ success: true, state: getRelayState() });
};

// POST /api/device/relay  { "state": "ON" | "OFF" }
const toggleRelay = (req, res, next) => {
  try {
    const { state } = req.body;
    if (!['ON', 'OFF'].includes(String(state).toUpperCase())) {
      throw new ApiError(400, "state must be 'ON' or 'OFF'");
    }
    const requested = setRelay(state);
    res.status(200).json({ success: true, requested });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(503, error.message));
  }
};

module.exports = { getState, toggleRelay };
