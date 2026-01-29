const express = require('express');
const { addAgent, getAgents } = require('../controllers/agentController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(protect, addAgent).get(protect, getAgents);

module.exports = router;
