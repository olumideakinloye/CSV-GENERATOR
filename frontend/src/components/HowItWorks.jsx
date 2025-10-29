import React, { useState, useEffect, useRef } from 'react';

const HowItWorks = ({ 
  stepsData = null,
  sectionTitle = "How to Connect with Our Community",
  sectionDescription = "Follow these simple steps to participate in our program",
  ctaTitle = "Ready to Get Started?",
  ctaDescription = "Join thousands of entrepreneurs and vendors who are already growing their networks through BALALAIKA TV.",
  ctaButtonText = "Start Your Journey Now",
  theme = "purple",
  autoAdvance = true,
  autoAdvanceInterval = 5000
}) => {
  // Default steps data
  const defaultSteps = [
    {
      number: "1",
      icon: "📝",
      title: "Input Your Contacts",
      description: "Sign up with your name, email, and phone number to join our expanding network of connections.",
      buttonText: "Register Now",
      color: "purple",
      details: "Registration takes less than 2 minutes. We only require basic information to get you started.",
      buttonAction: (step) => alert(`Action triggered: ${step.buttonText}`)
    },
    {
      number: "2", 
      icon: "📱",
      title: "Follow Us on Social Media",
      description: "Verify your WhatsApp accounts to unlock access.",
      buttonText: "📱 WhatsApp",
      color: "green",
      details: "Connect with us on WhatsApp to receive real-time updates and join our community groups.",
      buttonAction: (step) => alert(`Action triggered: ${step.buttonText}`)
    },
    {
      number: "3",
      icon: "💳", 
      title: "Subscribe for Engagement List",
      description: "For just ₦1,000, join weekly curated campaign list that enhance your visibility.",
      buttonText: "Pay ₦1,000",
      color: "blue",
      details: "Gain immediate access to our premium network after payment. New contacts added weekly.",
      buttonAction: (step) => alert(`Action triggered: ${step.buttonText}`)
    }
  ];

  const steps = stepsData || defaultSteps;
  
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(autoAdvance);
  const sectionRef = useRef(null);
  const autoAdvanceTimerRef = useRef(null);

  // Color theme mapping
  const colorThemes = {
    purple: { primary: 'purple', gradient: 'from-purple-100 to-blue-100' },
    blue: { primary: 'blue', gradient: 'from-blue-100 to-cyan-100' },
    green: { primary: 'green', gradient: 'from-green-100 to-emerald-100' },
    orange: { primary: 'orange', gradient: 'from-orange-100 to-red-100' },
    indigo: { primary: 'indigo', gradient: 'from-indigo-100 to-purple-100' }
  };

  const currentTheme = colorThemes[theme] || colorThemes.purple;

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setProgress(0);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Progress animation when visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(100);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Auto-advance functionality
  useEffect(() => {
    if (isVisible && isAutoAdvancing && autoAdvance) {
      autoAdvanceTimerRef.current = setInterval(() => {
        setActiveStep(prev => (prev + 1) % steps.length);
      }, autoAdvanceInterval);
    }

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }
    };
  }, [isVisible, isAutoAdvancing, autoAdvance, steps.length, autoAdvanceInterval]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    if (isAutoAdvancing) {
      setIsAutoAdvancing(false);
      setTimeout(() => setIsAutoAdvancing(true), 10000);
    }
  };

  const handleButtonClick = (step, e) => {
    e.stopPropagation();
    if(step.number == "1"){
      const registerSection = document.getElementById("register");
      if(registerSection){
        registerSection.scrollIntoView({behavior: "smooth"});
      }
    }else{
      console.log(step);
      
      if (step.buttonAction) {
        step.buttonAction(step);
      } else {
        alert(`Action triggered: ${step.buttonText}`);
      }
    }
  };

  const goToNextStep = () => {
    setActiveStep(prev => Math.min(steps.length - 1, prev + 1));
  };

  const goToPrevStep = () => {
    setActiveStep(prev => Math.max(0, prev - 1));
  };

  const getColorClasses = (color, type) => {
    const colorMap = {
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700',
        ring: 'ring-purple-300',
        full: 'bg-purple-600'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        button: 'bg-green-500 hover:bg-green-600',
        ring: 'ring-green-300',
        full: 'bg-green-500'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
        ring: 'ring-blue-300',
        full: 'bg-blue-600'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        button: 'bg-orange-500 hover:bg-orange-600',
        ring: 'ring-orange-300',
        full: 'bg-orange-500'
      },
      indigo: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-600',
        button: 'bg-indigo-600 hover:bg-indigo-700',
        ring: 'ring-indigo-300',
        full: 'bg-indigo-600'
      }
    };

    const selectedColor = colorMap[color] || colorMap.purple;
    return selectedColor[type] || selectedColor.full;
  };

  const handleCTAClick = () => {
    alert('Starting your journey!');
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {sectionTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {sectionDescription}
            </p>
          </div>

          {/* Main Container with all steps in one div */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            {/* Progress Bar for Mobile */}
            <div className="md:hidden mb-8 px-4">
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 rounded-full"></div>
                <div 
                  className={`absolute top-1/2 left-0 h-1 ${getColorClasses(currentTheme.primary, 'full')} transform -translate-y-1/2 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${progress}%` }}
                ></div>
                <div className="flex justify-between relative">
                  {steps.map((step, index) => (
                    <div 
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        index <= activeStep 
                          ? getColorClasses(step.color, 'full') + ' text-white'
                          : 'bg-gray-200 text-gray-500'
                      } ${index === activeStep ? 'scale-125 shadow-lg' : ''}`}
                      onClick={() => handleStepClick(index)}
                    >
                      {step.number}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Steps Container - All steps in one row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
              {/* Connector Line for Desktop */}
              <div className="hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gray-300">
                <div 
                  className={`h-full ${getColorClasses(currentTheme.primary, 'full')} transition-all duration-1000 ease-out`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              {/* Individual Step Divs */}
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-50 rounded-xl p-6 transition-all duration-300 cursor-pointer border-2 ${
                    index === activeStep 
                      ? `border-${step.color}-500 shadow-lg scale-105 z-10` 
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  {/* Step Number Circle */}
                  <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-300 ${
                    getColorClasses(step.color, 'bg')
                  } ${index === activeStep ? `ring-4 ring-opacity-50 ${getColorClasses(step.color, 'ring')}` : ''}`}>
                    <span className={`text-2xl font-bold ${getColorClasses(step.color, 'text')}`}>
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110 text-center">
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-center">
                    {step.description}
                  </p>
                  
                  {/* Expanded details */}
                  {index === activeStep && (
                    <div className="mt-4 p-4 bg-white rounded-lg shadow-md animate-fadeIn border border-gray-200">
                      <p className="text-gray-700 text-sm text-center">{step.details}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Buttons Container - All buttons in one line */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
              {steps.map((step, index) => (
                <button 
                  key={index}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-white w-full md:w-auto text-center ${
                    getColorClasses(step.color, 'button')
                  } ${index === activeStep ? 'animate-pulse' : 'opacity-90 hover:opacity-100'}`}
                  onClick={(e) => handleButtonClick(step, e)}
                >
                  {step.buttonText}
                </button>
              ))}
            </div>
            
            {/* Step Navigation for Mobile */}
            <div className="md:hidden flex justify-between items-center mt-8">
              <button 
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 transition-colors duration-200 flex items-center"
                onClick={goToPrevStep}
                disabled={activeStep === 0}
              >
                ← Previous
              </button>
              
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeStep 
                        ? getColorClasses(currentTheme.primary, 'full') 
                        : 'bg-gray-300'
                    }`}
                    onClick={() => handleStepClick(index)}
                  />
                ))}
              </div>
              
              <button 
                className={`px-4 py-2 ${getColorClasses(currentTheme.primary, 'full')} text-white rounded-lg disabled:opacity-50 transition-colors duration-200 flex items-center`}
                onClick={goToNextStep}
                disabled={activeStep === steps.length - 1}
              >
                Next →
              </button>
            </div>
          </div>
          
          {/* Auto-advance toggle */}
          {autoAdvance && (
            <div className="text-center mt-6">
              <button 
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={() => setIsAutoAdvancing(!isAutoAdvancing)}
              >
                {isAutoAdvancing ? '⏸️ Pause Auto-advance' : '▶️ Resume Auto-advance'}
              </button>
            </div>
          )}
          
          {/* Bottom CTA */}
          <div className="text-center mt-8">
            <div className={`bg-gradient-to-r ${currentTheme.gradient} rounded-2xl p-8 transform transition-all duration-500 hover:scale-[1.02] border border-gray-200`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {ctaTitle}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {ctaDescription}
              </p>
              <button 
                className={`${getColorClasses(currentTheme.primary, 'button')} text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg`}
                onClick={handleCTAClick}
              >
                {ctaButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        /* Ensure border colors work with dynamic classes */
        .border-purple-500 { border-color: #8b5cf6; }
        .border-green-500 { border-color: #10b981; }
        .border-blue-500 { border-color: #3b82f6; }
        .border-orange-500 { border-color: #f59e0b; }
        .border-indigo-500 { border-color: #6366f1; }
      `}</style>
    </section>
  );
};

export default HowItWorks;