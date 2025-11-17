import React, { useState, useEffect, useRef } from 'react';

const Features = ({ onMaskString }) => {
  const features = [
    {
      icon: "🔒",
      title: "Privacy First",
      description: "Your contact information is anonymized in public listings.",
      color: "purple"
    },
    {
      icon: "🌐",
      title: "Cross-Network Reach",
      description: "Grow your audience and increase your reach and leads. Expand your sales volume and social network.",
      color: "blue"
    },
    {
      icon: "💰",
      title: "Affordable Access",
      description: "Gain access to structured engagement opportunities. Support the platform while accessing valuable connections.",
      color: "green"
    }
  ];

  const benefits = [
    "Connect with verified vendors across Nigeria",
    "Access to exclusive WhatsApp communities",
    "Weekly curated engagement campaigns",
    "Structured contact lists for easy import",
    "30-day renewable access plans",
    "24/7 customer support"
  ];

  const [animatedStats, setAnimatedStats] = useState({
    vendors: 0,
    states: 0,
    business: 0,
    satisfaction: 0
  });

  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (statsVisible) {
      // Animate counters
      const duration = 2000; // ms
      const steps = 100;
      const stepDuration = duration / steps;

      const animateValue = (start, end, setValue) => {
        let current = start;
        const range = end - start;
        const increment = range / steps;

        const timer = setInterval(() => {
          current += increment;
          if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
          }
          setValue(Math.floor(current));
        }, stepDuration);
      };

      animateValue(0, 500, (value) => setAnimatedStats(prev => ({ ...prev, vendors: value })));
      animateValue(0, 25, (value) => setAnimatedStats(prev => ({ ...prev, states: value })));
      animateValue(0, 50, (value) => setAnimatedStats(prev => ({ ...prev, business: value })));
      animateValue(0, 98, (value) => setAnimatedStats(prev => ({ ...prev, satisfaction: value })));
    }
  }, [statsVisible]);

  const [expandedFeature, setExpandedFeature] = useState(null);
  const [list, setList] = useState([]);

  const handleFeatureClick = (index) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  const getList = async () => {
    alert("good")
    try {
      const res = await fetch("http://localhost:5000/get-list");

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const list = await res.json();

      setList(list.data);
      console.log(list.data);

      alert("good")
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Main Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-xl transition-all duration-300 cursor-pointer ${expandedFeature === index
                  ? 'shadow-xl transform -translate-y-2 bg-gradient-to-b from-white to-gray-50'
                  : 'shadow-md hover:shadow-lg'
                  }`}
                onClick={() => handleFeatureClick(index)}
              >

                {/* Icon */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${feature.color === 'purple' ? 'bg-purple-100' :
                  feature.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                  } transition-transform duration-300 ${expandedFeature === index ? 'scale-110' : ''}`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Expanded content */}
                {expandedFeature === index && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      {feature.color === 'purple'
                        ? 'All data is encrypted and never shared with third parties without consent.'
                        : feature.color === 'blue'
                          ? 'Connect with audiences across Facebook, Instagram, WhatsApp, and more.'
                          : 'Plans start at just ₦5,000 per month with no hidden fees.'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detailed Benefits Section */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left Side - Content */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose BALALAIKA TV?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We're more than just a contact list provider. We're your partner in building meaningful business relationships across Nigeria.
                </p>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start transition-transform duration-200 hover:translate-x-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Stats Card */}
              <div
                ref={statsRef}
                className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Our Impact
                </h3>

                <div className="space-y-6">
                  <div className="text-center border-b border-gray-100 pb-4">
                    <div className="text-3xl font-bold text-purple-600">{animatedStats.vendors}+</div>
                    <div className="text-gray-600 text-sm">Active Vendors</div>
                  </div>

                  <div className="text-center border-b border-gray-100 pb-4">
                    <div className="text-3xl font-bold text-blue-600">{animatedStats.states}+</div>
                    <div className="text-gray-600 text-sm">Nigerian States</div>
                  </div>

                  <div className="text-center border-b border-gray-100 pb-4">
                    <div className="text-3xl font-bold text-green-600">₦{animatedStats.business}M+</div>
                    <div className="text-gray-600 text-sm">Business Generated</div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{animatedStats.satisfaction}%</div>
                    <div className="text-gray-600 text-sm">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Connect?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Grow your audience and connect with the large engagement list already networking through BALALAIKA TV
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg" onClick={getList}>
                👥 Browse List
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                📥 Download List
              </button>
            </div>
            {list.length > 0 && (
            <div className="list">
              <table style={{borderCollapse: "collapse", width: "50%"}}>
                <thead>
                <tr>
                  <th style={{border: "1px solid black", padding: "10px"}}></th>
                  <th style={{border: "1px solid black", padding: "10px"}}>Name</th>
                  <th style={{border: "1px solid black", padding: "10px"}}>Email</th>
                  <th style={{border: "1px solid black", padding: "10px"}}>Phone</th>
                </tr>
                </thead>
                <tbody>
                {list.map((item, i) => (
                  <tr key={item._id}>
                    <td style={{border: "1px solid black", padding: "10px"}}>{i + 1}</td>
                    <td style={{border: "1px solid black", padding: "10px"}}>{onMaskString(item.name)}</td>
                    <td style={{border: "1px solid black", padding: "10px"}}>{onMaskString(item.email)}</td>
                    <td style={{border: "1px solid black", padding: "10px"}}>{onMaskString(item.phone)}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;