// Simple in-memory database for development
class MemoryDB {
  constructor() {
    this.users = [];
    this.contactLists = [];
    this.listContacts = [];
    this.payments = [];
    this.userDownloads = [];
    this.analyticsEvents = [];
    this.nextId = 1;
    
    this.initializeSampleData();
  }

  initializeSampleData() {
    this.contactLists = [
      {
        id: 1,
        name: 'Nigerian Vendors Network',
        description: 'Verified vendors across Lagos, Abuja, and Port Harcourt',
        category: 'vendors',
        total_contacts: 450,
        price_naira: 100000,
        active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Social Media Influencers',
        description: 'Micro and macro influencers with 5K+ followers',
        category: 'influencers',
        total_contacts: 280,
        price_naira: 100000,
        active: true,
        created_at: new Date().toISOString()
      }
    ];

    this.listContacts = [
      {
        id: 1, list_id: 1, name: 'Ahmed S***', phone: '+234801***4567',
        email: 'ahmed.s***@email.com', business_name: 'A*** Fashion Store',
        category: 'Fashion', location: 'Lagos', anonymized: true,
        created_at: new Date().toISOString()
      },
      {
        id: 2, list_id: 1, name: 'Funmi A***', phone: '+234802***7890',
        email: 'funmi.a***@email.com', business_name: 'F*** Catering',
        category: 'Food', location: 'Abuja', anonymized: true,
        created_at: new Date().toISOString()
      }
    ];

    console.log('✅ Memory database initialized with sample data');
  }

  async query(sql, params = []) {
    const normalizedSQL = sql.toLowerCase().replace(/\s+/g, ' ').trim();
    
    try {
      // Stats queries
      if (normalizedSQL.includes('contacts') && normalizedSQL.includes('downloads') && normalizedSQL.includes('privacy')) {
        return { 
          rows: [{
            contacts: this.users.length,
            downloads: this.userDownloads.length,
            privacy: 100
          }]
        };
      }
      
      // User exists check
      if (normalizedSQL.includes('select id from users where email')) {
        const email = params[0];
        const user = this.users.find(u => u.email === email);
        return { rows: user ? [{ id: user.id }] : [] };
      }
      
      // Insert new user
      if (normalizedSQL.includes('insert into users')) {
        const [name, email, phone, countryCode] = params;
        const newUser = {
          id: this.nextId++,
          name, email, phone,
          country_code: countryCode,
          email_verified: false,
          whatsapp_verified: false,
          whatsapp_verified_at: null,
          payment_status: 'pending',
          subscription_active: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        this.users.push(newUser);
        console.log(`✅ User registered: ${name} (${email})`);
        return { rows: [newUser] };
      }
      
      // Update WhatsApp verification
      if (normalizedSQL.includes('update users set whatsapp_verified')) {
        const userId = params[0];
        const userIndex = this.users.findIndex(u => u.id == userId);
        if (userIndex !== -1) {
          this.users[userIndex].whatsapp_verified = true;
          this.users[userIndex].whatsapp_verified_at = new Date().toISOString();
          console.log(`✅ WhatsApp verified for user ID: ${userId}`);
        }
        return { rows: [] };
      }
      
      // Analytics events
      if (normalizedSQL.includes('insert into analytics_events')) {
        const [eventType, userId, metadata, ipAddress, userAgent] = params;
        const event = {
          id: this.nextId++,
          event_type: eventType,
          user_id: userId,
          metadata: metadata,
          ip_address: ipAddress,
          user_agent: userAgent,
          created_at: new Date().toISOString()
        };
        this.analyticsEvents.push(event);
        return { rows: [event] };
      }
      
      // Default response
      return { rows: [] };
      
    } catch (error) {
      console.error('Memory DB query error:', error);
      throw error;
    }
  }
}

module.exports = MemoryDB;