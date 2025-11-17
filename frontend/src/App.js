import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import RegistrationForm from "./components/RegistrationForm";
import WhatsAppVerification from "./components/WhatsAppVerification";
import PaymentForm from "./components/PaymentForm";
import SuccessPage from "./components/SuccessPage";
import Footer from "./components/Footer";
import { StatsProvider, useStats } from "./context/StatsContext";

// Inner App component that uses the stats
const AppContent = () => {
  const { stats } = useStats();
  const [currentStep, setCurrentStep] = useState("registration"); // 'registration', 'whatsapp', 'payment', 'success'
  const [userData, setUserData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const handleRegistrationComplete = (data) => {
    setUserData(data);
    setCurrentStep("whatsapp");
  };

  const maskString = (str) => {
  if (str.length <= 6) return str; // too short to mask
  const first = str.slice(0, 3);   // first 3 chars
  const last = str.slice(-3);      // last 3 chars
  const middle = "*".repeat(str.length - 6); // mask the middle
  return first + middle + last;
}

  const handleWhatsAppVerified = () => {
    setCurrentStep("payment");
  };

  const handlePaymentSuccess = (data) => {
    setPaymentData(data);
    setCurrentStep("success");
  };

  const handleStartOver = () => {
    setCurrentStep("registration");
    setUserData(null);
    setPaymentData(null);
  };

  const handleBackToRegistration = () => {
    setCurrentStep("registration");
    setUserData(null);
  };
  const handleBackToWorks = () => {
    setCurrentStep("registration");
    setUserData(null);
    setTimeout(() => {      
      const WorksSection = document.getElementById("works");
        if(WorksSection){
          WorksSection.scrollIntoView({behavior: "smooth"});
        }else{
          alert('bad')
        }
    }, 100);
  };

  const handleBackToWhatsApp = () => {
    setCurrentStep("whatsapp");
  };
  const initializePayment = (amount) => {
    const reference = `BALALAIKATV_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    // let handler = PaystackPop.setup({
    //   key: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxx", // Paystack public key
    //   email: document.getElementById("email-address").value,
    //   amount: document.getElementById("amount").value * 100, // Amount in Kobo
    //   currency: "NGN",
    //   ref: reference, // Generate a random reference
    //   callback: function (response) {
    //     // This happens after payment is successful
    //     alert("Payment complete! Reference: " + response.reference);
    //     // You can also verify the payment on your server here
    //   },
    //   onClose: function () {
    //     alert("Transaction was not completed, window closed.");
    //   },
    // });

    // handler.openIframe();
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Hero stats={stats} />

      {/* Show static sections only on registration step */}
      {currentStep === "registration" && (
        <>
          <HowItWorks />
          <Features onMaskString={maskString} />
        </>
      )}

      {/* Main content area */}
      <main className="flex-grow">
        {/* Step-by-step flow */}
        {currentStep === "registration" && (
          <RegistrationForm
            onRegistrationComplete={handleRegistrationComplete}
          />
        )}

        {currentStep === "whatsapp" && userData && (
          <WhatsAppVerification
            userData={userData}
            onVerified={handleWhatsAppVerified}
            onBack={handleBackToRegistration}
          />
        )}
        {currentStep === "payment" && userData && (
          <PaymentForm
            userData={userData}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={handleBackToWhatsApp}
          />
        )}
        {currentStep === "success" && paymentData && (
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
