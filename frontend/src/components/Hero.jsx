import React from 'react';

const Hero = ({ stats = { contacts: 0, downloads: 0, privacy: 100 } }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
          Grow Your Audience
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Connect with a wide network across Nigeria. Vendors, Expand your reach, audience and sales.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">{stats.contacts}</div>
            <div className="text-gray-600">Registered Contacts</div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">{stats.downloads}+</div>
            <div className="text-gray-600">Downloads</div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-4xl font-bold text-green-600 mb-2">{stats.privacy}%</div>
            <div className="text-gray-600">Privacy Protected</div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;