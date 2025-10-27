import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BrowseContacts = () => {
  const sampleContacts = [
    { id: 1, name: "Ahmed S***", category: "Fashion", location: "Lagos", rating: "⭐⭐⭐⭐⭐" },
    { id: 2, name: "Funmi A***", category: "Catering", location: "Abuja", rating: "⭐⭐⭐⭐" },
    { id: 3, name: "David O***", category: "Electronics", location: "Port Harcourt", rating: "⭐⭐⭐⭐⭐" },
    { id: 4, name: "Sarah L***", category: "Beauty", location: "Lagos", rating: "⭐⭐⭐⭐" },
    { id: 5, name: "Michael C***", category: "Fitness", location: "Abuja", rating: "⭐⭐⭐⭐⭐" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Browse Contact Lists
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Preview our verified contact database. Subscribe to access full details.
              </p>
            </div>

            {/* Filter Section */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>All Categories</option>
                  <option>Fashion</option>
                  <option>Food & Catering</option>
                  <option>Electronics</option>
                  <option>Beauty</option>
                  <option>Fitness</option>
                </select>
                
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>All Locations</option>
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Port Harcourt</option>
                  <option>Kano</option>
                </select>
                
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>All Ratings</option>
                  <option>⭐⭐⭐⭐⭐ 5 Stars</option>
                  <option>⭐⭐⭐⭐ 4+ Stars</option>
                  <option>⭐⭐⭐ 3+ Stars</option>
                </select>
                
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium">
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Contacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleContacts.map((contact) => (
                <div key={contact.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{contact.name}</h3>
                    <span className="text-sm">{contact.rating}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><strong>Category:</strong> {contact.category}</p>
                    <p><strong>Location:</strong> {contact.location}</p>
                    <p><strong>Phone:</strong> +234-***-***-***</p>
                    <p><strong>Email:</strong> ***@email.com</p>
                  </div>
                  
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded font-medium">
                    Subscribe to View Full Details
                  </button>
                </div>
              ))}
            </div>

            {/* Subscription CTA */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 mt-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Access Full Contact Details?
              </h2>
              <p className="text-gray-600 mb-6">
                Subscribe now for just ₦1,000 and get complete access to our verified contact database.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Subscribe Now - ₦1,000
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrowseContacts;