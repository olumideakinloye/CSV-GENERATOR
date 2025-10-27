const { validationResult } = require('express-validator');
const db = require('../config/memoryDB');

// Register new user
const register = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { name, email, phone, countryCode } = req.body;

    // Check if user already exists
    const existingUser = db.users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        error: 'User already exists' 
      });
    }

    // Create user
    const newUser = {
      id: db.users.length + 1,
      name,
      email,
      phone,
      country_code: countryCode,
      created_at: new Date(),
      whatsapp_verified: false
    };

    db.users.push(newUser);

    // Log analytics
    db.analyticsEvents.push({
      event_type: 'user_registered',
      user_id: newUser.id,
      metadata: { name, phone: countryCode + phone },
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      created_at: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      user: newUser
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Registration failed. Please try again.' 
    });
  }
};

/// Get user statistics
const getStats = async (req, res) => {
  try {
    console.log('📊 Fetching stats...');
    
    // Simple stats query for memory database
    const statsResult = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as contacts,
        (SELECT COUNT(*) FROM user_downloads) as downloads,
        100 as privacy
    `);

    console.log('📊 Stats query result:', statsResult);

    const stats = statsResult.rows[0] || { contacts: 0, downloads: 0, privacy: 100 };
    
    console.log('📊 Final stats:', stats);

    res.json({
      success: true,
      stats: {
        contacts: parseInt(stats.contacts) || 0,
        downloads: parseInt(stats.downloads) || 0,
        privacy: parseInt(stats.privacy) || 100
      }
    });

  } catch (error) {
    console.error('❌ Stats error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch stats',
      details: error.message
    });
  }
};

// Verify WhatsApp
const verifyWhatsApp = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const user = db.users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    user.whatsapp_verified = true;
    user.whatsapp_verified_at = new Date();

    db.analyticsEvents.push({
      event_type: 'whatsapp_verified',
      user_id: user.id,
      metadata: { verified_at: new Date().toISOString() },
      created_at: new Date()
    });

    res.json({ 
      success: true,
      message: 'WhatsApp verification successful' 
    });

  } catch (error) {
    console.error('WhatsApp verification error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Verification failed' 
    });
  }
};

module.exports = {
  register,
  getStats,
  verifyWhatsApp
};
