const Agent = require('../models/agentModel');

const addAgent = async (req, res) => {
    const { name, email, mobile, password } = req.body;
    const agentExists = await Agent.findOne({ email });

    if (agentExists) {
        return res.status(400).json({ message: 'Agent already exists' });
    }

    const agent = await Agent.create({ name, email, mobile, password });

    if (agent) {
        res.status(201).json(agent);
    } else {
        res.status(400).json({ message: 'Invalid agent data' });
    }
};

const getAgents = async (req, res) => {
    const agents = await Agent.find({});
    res.json(agents);
};

module.exports = { addAgent, getAgents };
