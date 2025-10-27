// For now, use in-memory database. Later we'll switch to PostgreSQL
const MemoryDB = require('./memoryDB');

// Create a single instance
const memoryDB = new MemoryDB();

// Create database interface that matches PostgreSQL
const db = {
  query: async (text, params) => {
    return await memoryDB.query(text, params);
  },

  // Direct access to memory data (for development)
  memory: {
    users: () => memoryDB.users,
    contactLists: () => memoryDB.contactLists,
    listContacts: () => memoryDB.listContacts,
    payments: () => memoryDB.payments,
    userDownloads: () => memoryDB.userDownloads,
    analyticsEvents: () => memoryDB.analyticsEvents
  }
};

console.log('✅ Database configuration loaded (In-Memory Mode)');

module.exports = db;