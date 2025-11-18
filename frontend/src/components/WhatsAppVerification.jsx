import React, { useState } from 'react';

const WhatsAppVerification = ({ userData, onVerified, onBack }) => {
  const [verificationStatus, setVerificationStatus] = useState('pending'); // 'pending', 'checking', 'verified', 'failed'
  const [hasJoinedGroup, setHasJoinedGroup] = useState(false);
  
  // Replace this with your actual WhatsApp group invite link
  const whatsappGroupLink = process.env.REACT_APP_WHATSAPPGROUPLINK;
  
  const handleJoinWhatsAppGroup = () => {
    // Open WhatsApp group directly
    window.open(whatsappGroupLink, '_blank');
    
    // Update UI to show they clicked to join
    setHasJoinedGroup(true);
  };

  const handleVerifyJoined = () => {
    if (!hasJoinedGroup) {
      alert('Please join the WhatsApp group first by clicking the "Join WhatsApp Group" button.');
      return;
    }

    setVerificationStatus('checking');

    // In a real app, this would:
    // 1. Check if the phone number is a valid WhatsApp number
    // 2. Verify if they actually joined the group (via WhatsApp Business API)
    // 3. Check group membership through backend API

    // Simulate verification process
    setTimeout(() => {
      // For demo purposes, let's assume verification succeeds
      // In reality, you'd check with your backend API
      
      const phoneNumber = `${userData.countryCode}${userData.phone}`;
      console.log('Verifying WhatsApp number:', phoneNumber);
      console.log('Checking group membership for:', userData.name);
      
      // Simulate random success/failure for demo
      const verificationSuccess = Math.random() > 0.2; // 80% success rate for demo
      
      setVerificationStatus('verified');
      setTimeout(() => {
        onVerified();
      }, 1500);

      
      // if (verificationSuccess) {
      // } else {
      //   setVerificationStatus('failed');
      // }
    }, 3000); // 3 seconds to simulate checking
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border p-8 text-center">
            
            {/* Header */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Verify Your WhatsApp</h3>
              <p className="text-gray-600">
                Join our exclusive WhatsApp group to complete verification and access contact lists.
              </p>
            </div>

            {/* User Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h4 className="font-semibold mb-2">Your Registration Details:</h4>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>WhatsApp:</strong> {userData.countryCode}{userData.phone}</p>
            </div>

            {/* Verification Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
              <h4 className="font-semibold text-blue-700 mb-3">Verification Steps:</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <span className="mr-3">1️⃣</span>
                  <span>Click "Join WhatsApp Group" below</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">2️⃣</span>
                  <span>Join the BALALAIKATV Members Group</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">3️⃣</span>
                  <span>Come back and click "Verify I Joined"</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">4️⃣</span>
                  <span>We'll verify your membership automatically</span>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {verificationStatus === 'pending' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-700 text-sm">
                  ⏳ Please join our WhatsApp group first, then click verify.
                </p>
              </div>
            )}

            {verificationStatus === 'checking' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                  <p className="text-blue-700 text-sm font-medium">Checking your WhatsApp and group membership...</p>
                </div>
                <p className="text-blue-600 text-xs">This may take a few moments</p>
              </div>
            )}

            {verificationStatus === 'verified' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-700 text-sm font-medium">
                  ✅ Verified! Your WhatsApp is active and you're in the group.
                </p>
              </div>
            )}

            {verificationStatus === 'failed' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 text-sm font-medium mb-2">
                  ❌ Verification Failed
                </p>
                <p className="text-red-600 text-xs">
                  Either your WhatsApp number is not active or you haven't joined the group yet. 
                  Please try again.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Join Group Button */}
              <button
                onClick={handleJoinWhatsAppGroup}
                disabled={verificationStatus === 'checking'}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold flex items-center justify-center"
              >
                <span className="mr-2">📱</span>
                {hasJoinedGroup ? '✅ Rejoin WhatsApp Group' : 'Join WhatsApp Group'}
              </button>
              
              {/* Verify Button */}
              <button
                onClick={handleVerifyJoined}
                disabled={verificationStatus === 'checking'}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
              >
                {verificationStatus === 'checking' ? 'Verifying...' : 'Verify I Joined ✓'}
              </button>
              
              {/* Retry Button (only show if failed) */}
              {verificationStatus === 'failed' && (
                <button
                  onClick={() => {
                    setVerificationStatus('pending');
                    setHasJoinedGroup(false);
                  }}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium"
                >
                  🔄 Try Again
                </button>
              )}
              
              {/* Back Button */}
              <button
                onClick={onBack}
                disabled={verificationStatus === 'checking'}
                className="w-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 py-3 rounded-lg font-medium"
              >
                ← Back to Registration
              </button>
            </div>

            <div className="mt-6 text-xs text-gray-500 space-y-1">
              <p>🔒 Your phone number will be verified through WhatsApp</p>
              <p>👥 Group membership is required for contact access</p>
              <p>⚡ Verification usually takes 10-30 seconds</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppVerification;