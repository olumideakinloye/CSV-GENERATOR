import React, { useState } from 'react';

const countryCodes = [
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
];

const CountrySelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedCountry = countryCodes.find(c => c.code === value) || countryCodes[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 border border-gray-300 rounded-l-lg bg-gray-50 flex items-center space-x-2 hover:bg-gray-100 min-w-[120px]"
      >
        <span>{selectedCountry.flag}</span>
        <span className="text-sm font-medium">{selectedCountry.code}</span>
        <span className="text-xs">▼</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-64">
          {countryCodes.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => {
                onChange(country.code);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
            >
              <span className="text-lg">{country.flag}</span>
              <span className="font-medium">{country.code}</span>
              <span className="text-sm text-gray-500">{country.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySelector;