const mongoose = require('mongoose');

const leadSchema = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        phone: { type: String, required: true },
        notes: { type: String },
        agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
    },
    { timestamps: true }
);

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;
