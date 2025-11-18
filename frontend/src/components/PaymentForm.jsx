import React, { useState, useEffect } from "react";
import { useStats } from '../context/StatsContext';

const PaymentForm = ({ userData, onPaymentSuccess, onBack }) => {
  const [paymentStatus, setPaymentStatus] = useState('ready'); // 'ready', 'processing', 'success', 'failed'
  const [paymentReference, setPaymentReference] = useState('');
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY; // Replace with your own public key
  const amount = 1000 * 100; // Amount in Kobo (₦5000)
  const [isPaystackReady, setIsPaystackReady] = useState(false);
  const { incrementDownloads } = useStats();

  useEffect(() => {
    if (window.PaystackPop) {
      console.log("Paystack ready!");
      setIsPaystackReady(true);
    } else {
      console.error("Paystack script NOT found");
    }
  }, []);

  const handleDownload = async (url) => {
    try {
      const res = await fetch(`http://localhost:${process.env.REACT_APP_PORT}` + url); // no credentials
      if (!res.ok) throw new Error("Network response not OK");

      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Untitled.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      incrementDownloads();
      updateDownloadState();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download file. Check server and file URL.");
    }
  };

  const updateDownloadState = async () =>{
    try {
      const res = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/set-download-state`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: userData.phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Unable to update download state in database. Check internet connection");
      }else{
        if(data.success){
          console.log(data.message);
        }
      }
    } catch (error) {
      console.error(error);      
    }
  }
  const setRefrence = async (ref) => {
    try {
      const res = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/setRef`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: ref, phone: userData.phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Unable to save refrence in database. Check internet connection");
      }else{
        if(data.success){
          console.log(data.message);
          
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Async helper for verification
  const verifyPayment = async (reference) => {
    try {
      const res = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();

      if (data.success) {
        alert("Payment successful! File will begin downloading automatically.");
        setPaymentStatus("success")
        setTimeout(() => {
          onPaymentSuccess({
            reference,
            amount: 1000,
            userData
          });
        }, 2000);
        handleDownload(data.downloadUrl);
        setRefrence(reference);
      } else {
        alert("Payment verification failed");
        setPaymentStatus("failed")
      }
    } catch (error) {
      console.log(error);
      setPaymentStatus("failed")
      alert("Server error verifying payment");
    }
  };

  function paystackCallback(response) {
    setPaymentReference(response.reference);
    verifyPayment(response.reference).catch(err => {
      console.error("Error in Paystack callback:", err);
    });
  }

  const handlePay = () => {
    if (!window.PaystackPop) {
      alert("Paystack script not loaded yet.");
      setPaymentStatus("failed")
      return;
    }
    if (!userData.email) {
      alert("Invalid email address. Please provide a valid email address");
      onBack();
      return;
    } else {

    }
    if (!isPaystackReady) {
      alert("Payment system still loading, please wait a second...");
      setPaymentStatus("failed")
      return;
    }
    try {
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: userData.email,
        amount: amount,
        currency: "NGN",
        metadata: {
          custom_fields: [
            {
              display_name: "Email",
              variable_name: "email",
              value: userData.email,
            },
          ],
        },
        callback: paystackCallback,
        onClose: function () { console.log("Payment closed."); setPaymentStatus("failed"); },
      });
      handler.openIframe();
    } catch (err) {
      console.error("Paystack setup error:", err);
      alert("Unable to initialize payment. Please refresh and try again.");
      setPaymentStatus("failed");
    }
  }

  // Simulate Paystack integration
  const initiatePayment = () => {
    setPaymentStatus('processing');

    // In a real app, this would integrate with Paystack
    // For now, we'll simulate the payment process
    console.log('Initiating payment for:', userData);
    console.log('Amount: ₦1,000');

    // Make payment
    handlePay()
  };

  const retryPayment = () => {
    setPaymentStatus('ready');
    setPaymentReference('');
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border p-8 text-center">

            {/* Header */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Subscribe for Engagement List</h3>
              <p className="text-gray-600">
                For just ₦1,000, join weekly curated campaign list that enhance your visibility.
              </p>
            </div>

            {/* User Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h4 className="font-semibold mb-2">Subscriber Details:</h4>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Phone:</strong> {userData.countryCode}{userData.phone}</p>
            </div>

            {/* What You Get */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h4 className="font-semibold text-blue-700 mb-3">What You Get:</h4>
              <div className="text-left space-y-2 text-sm text-blue-600">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Weekly curated engagement campaigns</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Access to structured contact list</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>WhatsApp community updates</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Enhanced visibility and reach</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>30-day access to contact database</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">₦1,000</div>
              <div className="text-gray-600">One-time payment • 30 days access</div>
              <div className="text-sm text-gray-500 mt-1">
                Normally ₦2,500 - Limited time offer!
              </div>
            </div>

            {/* Payment Status */}
            {paymentStatus === 'ready' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-700 text-sm">
                  🔒 Secure payment powered by Paystack
                </p>
              </div>
            )}

            {paymentStatus === 'processing' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                  <p className="text-blue-700 text-sm font-medium">Processing your payment...</p>
                </div>
                <p className="text-blue-600 text-xs">Reference: {paymentReference}</p>
                <p className="text-blue-600 text-xs">Please don't close this page</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-700 text-sm font-medium mb-1">
                  ✅ Payment Successful!
                </p>
                <p className="text-green-600 text-xs">
                  Reference: {paymentReference}
                </p>
                <p className="text-green-600 text-xs">
                  You now have access to contact lists!
                </p>
              </div>
            )}

            {paymentStatus === 'failed' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 text-sm font-medium mb-1">
                  ❌ Payment Failed
                </p>
                <p className="text-red-600 text-xs mb-2">
                  Your payment could not be processed. Please try again.
                </p>
                <p className="text-red-600 text-xs">
                  Reference: {paymentReference}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {paymentStatus === 'ready' && (
                <button
                  onClick={initiatePayment}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold text-lg"
                >
                  💳 Pay ₦1,000 Now
                </button>
              )}

              {paymentStatus === 'processing' && (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-4 rounded-lg font-semibold cursor-not-allowed"
                >
                  Processing Payment...
                </button>
              )}

              {paymentStatus === 'success' && (
                <button
                  disabled
                  className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold"
                >
                  ✅ Payment Complete - Redirecting...
                </button>
              )}

              {paymentStatus === 'failed' && (
                <button
                  onClick={retryPayment}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold"
                >
                  🔄 Try Payment Again
                </button>
              )}

              {/* Back Button */}
              {paymentStatus !== 'processing' && paymentStatus !== 'success' && (
                <button
                  onClick={onBack}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium"
                >
                  ← Back to Verification
                </button>
              )}
            </div>

            {/* Payment Methods */}
            {paymentStatus === 'ready' && (
              <div className="mt-6 text-xs text-gray-500">
                <p className="mb-2">Accepted Payment Methods:</p>
                <div className="flex justify-center space-x-4">
                  <span className="px-2 py-1 bg-gray-100 rounded">💳 Cards</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">🏦 Bank Transfer</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">📱 USSD</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentForm;