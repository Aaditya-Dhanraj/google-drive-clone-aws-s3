const express = require('express');
const multer = require('multer');
const { updateFileTree, getFileTree } = require('../controllers/fileTreeController');
const router = express.Router();

const {ensureAuthenticated} = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Update File Tree
router.post('/', ensureAuthenticated, updateFileTree);

// Get folder structure
router.get('/', ensureAuthenticated, getFileTree);

module.exports = router;
