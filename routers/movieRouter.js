
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Rotte

// Rotta di index
router.get('/', movieController.index);

// Rotta di show
router.get('/:id', movieController.show);

module.exports = router;