import React, { createContext, useContext, useState } from 'react';

const StatsContext = createContext();

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    contacts: 0,
    downloads: 0,
    privacy: 100 // This stays at 100%
  });

  const incrementContacts = () => {
    setStats(prev => ({
      ...prev,
      contacts: prev.contacts + 1
    }));
  };

  const incrementDownloads = () => {
    setStats(prev => ({
      ...prev,
      downloads: prev.downloads + 1
    }));
  };

  return (
    <StatsContext.Provider value={{
      stats,
      incrementContacts,
      incrementDownloads
    }}>
      {children}
    </StatsContext.Provider>
  );
};