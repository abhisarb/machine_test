const Agent = require('../models/agentModel');

const addAgent = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // Validation: Phone format +91 + 10 digits
        const phoneRegex = /^\+91\d{10}$/;
        if (!phoneRegex.test(mobile)) {
            return res.status(400).json({ message: 'Phone number must be in format +91 followed by 10 digits' });
        }

        const agentExists = await Agent.findOne({ $or: [{ email }, { mobile }] });

        if (agentExists) {
            const field = agentExists.email === email ? 'Email' : 'Phone number';
            return res.status(400).json({ message: `${field} already exists` });
        }

        const agent = await Agent.create({ name, email, mobile, password });

        if (agent) {
            res.status(201).json(agent);
        } else {
            res.status(400).json({ message: 'Invalid agent data' });
        }
    } catch (error) {
        console.error('Add Agent Error:', error);
        res.status(500).json({ message: 'Server error adding agent' });
    }
};

const getAgents = async (req, res) => {
    try {
        const agents = await Agent.find({});
        res.json(agents);
    } catch (error) {
        console.error('Get Agents Error:', error);
        res.status(500).json({ message: 'Server error fetching agents' });
    }
};

const updateAgent = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // Validation: Phone format +91 + 10 digits
        if (mobile) {
            const phoneRegex = /^\+91\d{10}$/;
            if (!phoneRegex.test(mobile)) {
                return res.status(400).json({ message: 'Phone number must be in format +91 followed by 10 digits' });
            }
        }

        const agent = await Agent.findById(req.params.id);

        if (agent) {
            // Check if updated email or mobile already exists in other agents
            if (email && email !== agent.email) {
                const emailExists = await Agent.findOne({ email });
                if (emailExists) return res.status(400).json({ message: 'Email already exists' });
            }
            if (mobile && mobile !== agent.mobile) {
                const mobileExists = await Agent.findOne({ mobile });
                if (mobileExists) return res.status(400).json({ message: 'Phone number already exists' });
            }

            agent.name = name || agent.name;
            agent.email = email || agent.email;
            agent.mobile = mobile || agent.mobile;
            if (password) {
                agent.password = password;
            }

            const updatedAgent = await agent.save();
            res.json(updatedAgent);
        } else {
            res.status(404).json({ message: 'Agent not found' });
        }
    } catch (error) {
        console.error('Update Agent Error:', error);
        res.status(500).json({ message: 'Server error updating agent' });
    }
};

const deleteAgent = async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id);

        if (agent) {
            await Agent.deleteOne({ _id: req.params.id });
            res.json({ message: 'Agent removed' });
        } else {
            res.status(404).json({ message: 'Agent not found' });
        }
    } catch (error) {
        console.error('Delete Agent Error:', error);
        res.status(500).json({ message: 'Server error deleting agent' });
    }
};

module.exports = { addAgent, getAgents, updateAgent, deleteAgent };
