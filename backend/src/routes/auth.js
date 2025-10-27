const express = require('express');
const { body } = require('express-validator');
const { register, getStats, verifyWhatsApp } = require('../controllers/authController');

const router = express.Router();

// Register user
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').isLength({ min: 7, max: 15 }).withMessage('Valid phone number required'),
  body('countryCode').notEmpty().withMessage('Country code required')
], register);

// Get statistics
router.get('/stats', getStats);

// Verify WhatsApp
router.post('/whatsapp-verify', [
  body('userId').isInt().withMessage('Valid user ID required')
], verifyWhatsApp);

module.exports = router;