const mongoose = require('mongoose');

const agentSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobile: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;
