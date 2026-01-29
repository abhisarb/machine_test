const express = require('express');
const multer = require('multer');
const { uploadLeads, getLeads } = require('../controllers/leadController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.mimetype === 'application/vnd.ms-excel') {
            cb(null, true);
        } else {
            cb(new Error('Only csv, xlsx and xls files are allowed'), false);
        }
    }
});

router.route('/').get(protect, getLeads);
router.post('/upload', protect, upload.single('file'), uploadLeads);

module.exports = router;
