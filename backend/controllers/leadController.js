const fs = require('fs');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const Lead = require('../models/leadModel');
const Agent = require('../models/agentModel');

const uploadLeads = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const results = [];

    try {
        if (req.file.mimetype === 'text/csv') {
            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', (data) => results.push(data))
                    .on('end', resolve)
                    .on('error', reject);
            });
        } else {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet);
            results.push(...data);
        }

        const agents = await Agent.find({});
        if (agents.length === 0) {
            return res.status(400).json({ message: 'No agents found to distribute leads' });
        }

        const leadsToSave = [];
        results.forEach((item, index) => {
            const agentIndex = index % agents.length;
            leadsToSave.push({
                firstName: item.FirstName || item.firstName,
                phone: item.Phone || item.phone,
                notes: item.Notes || item.notes,
                agent: agents[agentIndex]._id,
            });
        });

        await Lead.insertMany(leadsToSave);
        fs.unlinkSync(filePath);

        res.status(201).json({ message: 'Leads distributed successfully', count: leadsToSave.length });
    } catch (error) {
        res.status(500).json({ message: 'Error processing file', error: error.message });
    }
};

const getLeads = async (req, res) => {
    const leads = await Lead.find({}).populate('agent', 'name email');
    res.json(leads);
};

module.exports = { uploadLeads, getLeads };
