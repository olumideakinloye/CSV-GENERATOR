import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import RegistrationForm from './components/RegistrationForm';
import WhatsAppVerification from './components/WhatsAppVerification';
import PaymentForm from './components/PaymentForm';
import SuccessPage from './components/SuccessPage';
import Footer from './components/Footer';
import { StatsProvider, useStats } from './context/StatsContext';

// Inner App component that uses the stats
const AppContent = () => {
  const { stats } = useStats();
  const [currentStep, setCurrentStep] = useState('registration'); // 'registration', 'whatsapp', 'payment', 'success'
  const [userData, setUserData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const handleRegistrationComplete = (data) => {
    setUserData(data);
    setCurrentStep('whatsapp');
  };

  const handleWhatsAppVerified = () => {
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = (data) => {
    setPaymentData(data);
    setCurrentStep('success');
  };

  const handleStartOver = () => {
    setCurrentStep('registration');
    setUserData(null);
    setPaymentData(null);
  };

  const handleBackToRegistration = () => {
    setCurrentStep('registration');
    setUserData(null);
  };

  const handleBackToWhatsApp = () => {
    setCurrentStep('whatsapp');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Hero stats={stats} />
      
      {/* Show static sections only on registration step */}
      {currentStep === 'registration' && (
        <>
          <HowItWorks />
          <Features />
        </>
      )}
      
      {/* Main content area */}
      <main className="flex-grow">
        {/* Step-by-step flow */}
        {currentStep === 'registration' && (
          <RegistrationForm onRegistrationComplete={handleRegistrationComplete} />
        )}
        
        {currentStep === 'whatsapp' && userData && (
          <WhatsAppVerification 
            userData={userData}
            onVerified={handleWhatsAppVerified}
            onBack={handleBackToRegistration}
          />
        )}

        {currentStep === 'payment' && userData && (
          <PaymentForm
            userData={userData}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={handleBackToWhatsApp}
          />
        )}

        {currentStep === 'success' && paymentData && (
          <SuccessPage
            paymentData={paymentData}
            onStartOver={handleStartOver}
          />
        )}
      </main>
      
      {/* Footer appears on all pages */}
      <Footer />
    </div>
  );
};

// Main App component with Stats Provider
function App() {
  return (
    <StatsProvider>
      <AppContent />
    </StatsProvider>
  );
}

export default App;