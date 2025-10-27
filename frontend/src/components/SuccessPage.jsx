import React from 'react';
import { useStats } from '../context/StatsContext';

const SuccessPage = ({ paymentData, onStartOver }) => {
  const { incrementDownloads } = useStats();

  const handleDownloadContacts = () => {
    // Simulate download
    incrementDownloads();
    alert('Contact list downloaded! Check the stats counter above.');
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border p-8 text-center">
            
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-green-600">Welcome to BALALAIKATV!</h3>
              <p className="text-gray-600 mb-4">
                You're now part of our growing network. You have full access to our contact database!
              </p>
            </div>

            {/* Payment Summary */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-left">
              <h4 className="font-semibold text-green-700 mb-3">Payment Summary:</h4>
              <div className="space-y-1 text-sm text-green-600">
                <p><strong>Reference:</strong> {paymentData.reference}</p>
                <p><strong>Amount Paid:</strong> ₦{paymentData.amount.toLocaleString()}</p>
                <p><strong>Subscriber:</strong> {paymentData.userData.name}</p>
                <p><strong>Email:</strong> {paymentData.userData.email}</p>
                <p><strong>Access Valid Until:</strong> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h4 className="font-semibold text-blue-700 mb-3">What's Next:</h4>
              <div className="space-y-2 text-sm text-blue-600">
                <div className="flex items-center">
                  <span className="mr-3">📥</span>
                  <span>Download your first contact list below</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">📱</span>
                  <span>Check WhatsApp group for weekly campaigns</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">🚀</span>
                  <span>Start growing your business network</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">💰</span>
                  <span>Access renewal reminder will be sent via email</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleDownloadContacts}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold text-lg"
              >
                📥 Download Contact List
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium">
                  👥 Browse Contacts
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium">
                  📊 View Analytics
                </button>
              </div>

              <button
                onClick={onStartOver}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium"
              >
                🔄 Register Another Account
              </button>
            </div>

            {/* Support Info */}
            <div className="mt-8 text-xs text-gray-500 bg-gray-50 rounded-lg p-4">
              <p className="mb-2"><strong>Need Help?</strong></p>
              <p>📧 Email: support@balalaikatv.com</p>
              <p>📱 WhatsApp: +234-XXX-XXX-XXXX</p>
              <p>🕒 Support Hours: 9AM - 6PM (Mon-Fri)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;