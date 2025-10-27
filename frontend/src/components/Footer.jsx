import React from 'react';

const Footer = ({ 
  companyInfo = {
    name: "BALALAIKATV",
    description: "Connecting entrepreneurs and vendors across Nigeria. Build your network, grow your business.",
    email: "support@balalaikatv.com",
    phone: "+2348123456789"
  },
  footerSectionsData = null,
  socialLinksData = null,
  newsletterTitle = "Stay Updated",
  newsletterDescription = "Get notified when new contact lists are available",
  stats = {
    members: 500,
    states: 25,
    successRate: 98
  },
  theme = "purple"
}) => {
  const currentYear = new Date().getFullYear();

  // Default footer sections
  const defaultFooterSections = {
    company: {
      title: "BALALAIKATV",
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Mission", href: "#" },
        { name: "Success Stories", href: "#" },
        { name: "Contact Us", href: "#" }
      ]
    },
    services: {
      title: "Services",
      links: [
        { name: "Browse Contacts", href: "#" },
        { name: "Download Lists", href: "#" },
        { name: "Affiliate Program", href: "#" },
        { name: "WhatsApp Groups", href: "#" }
      ]
    },
    support: {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Refund Policy", href: "#" }
      ]
    },
    connect: {
      title: "Connect",
      links: [
        { name: "📱 WhatsApp", href: "#" },
        { name: "📧 Email Support", href: `mailto:${companyInfo.email}` },
        { name: "📞 Phone Support", href: `tel:${companyInfo.phone}` },
        { name: "💬 Live Chat", href: "#" }
      ]
    }
  };

  const defaultSocialLinks = [
    { name: "WhatsApp", icon: "📱", href: "#" },
    { name: "Telegram", icon: "✈️", href: "#" },
    { name: "Twitter", icon: "🐦", href: "#" },
    { name: "LinkedIn", icon: "💼", href: "#" }
  ];

  const footerSections = footerSectionsData || defaultFooterSections;
  const socialLinks = socialLinksData || defaultSocialLinks;

  // Theme configuration
  const themeColors = {
    purple: {
      primary: 'purple-400',
      gradient: 'from-purple-600 to-purple-700',
      hover: 'purple-500'
    },
    blue: {
      primary: 'blue-400',
      gradient: 'from-blue-600 to-blue-700',
      hover: 'blue-500'
    },
    green: {
      primary: 'green-400',
      gradient: 'from-green-600 to-green-700',
      hover: 'green-500'
    }
  };

  const currentTheme = themeColors[theme] || themeColors.purple;

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    alert(`Thank you for subscribing with: ${email}`);
    e.target.reset();
  };

  const handleSupportClick = () => {
    alert('Opening support chat...');
  };

  return (
    <footer className="bg-gray-900 text-white">
      
      {/* Main Footer Content Container */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Top Section Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            
            {/* Company Info Container */}
            <div className="lg:col-span-1">
              <div className={`text-2xl font-bold text-${currentTheme.primary} mb-4`}>
                {companyInfo.name}
              </div>
              <div className="text-gray-400 mb-6 leading-relaxed">
                {companyInfo.description}
              </div>
              
              {/* Social Links Container */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 hover:bg-${currentTheme.hover} rounded-lg flex items-center justify-center transition-colors duration-300`}
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Footer Links Containers */}
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key} className="lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 block py-1"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section Container */}
          <div className="border-t border-gray-800 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Newsletter Form Container */}
              <div>
                <h3 className="text-xl font-semibold mb-2">{newsletterTitle}</h3>
                <div className="text-gray-400 mb-4">
                  {newsletterDescription}
                </div>
                <form onSubmit={handleNewsletterSubmit} className="flex max-w-md">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    required
                  />
                  <button 
                    type="submit"
                    className={`bg-${currentTheme.primary} hover:bg-${currentTheme.hover} px-6 py-3 rounded-r-lg font-semibold transition-colors duration-300`}
                  >
                    Subscribe
                  </button>
                </form>
              </div>
              
              {/* Stats Container */}
              <div className="grid grid-cols-3 gap-4 text-center lg:text-right">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className={`text-2xl font-bold text-${currentTheme.primary}`}>{stats.members}+</div>
                  <div className="text-gray-400 text-sm">Active Members</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">{stats.states}+</div>
                  <div className="text-gray-400 text-sm">Nigerian States</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">{stats.successRate}%</div>
                  <div className="text-gray-400 text-sm">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer Container */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              
              {/* Copyright Container */}
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} {companyInfo.name}. All rights reserved. Built with ❤️ in Nigeria.
              </div>
              
              {/* Legal Links Container */}
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Support Button Container */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={handleSupportClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors duration-300 hover:scale-110"
        >
          <span className="text-2xl">💬</span>
        </button>
      </div>

      {/* Fallback styles for dynamic color classes */}
      <style jsx>{`
        .bg-purple-400 { background-color: #a78bfa; }
        .hover\\:bg-purple-500:hover { background-color: #8b5cf6; }
        .text-purple-400 { color: #a78bfa; }
        
        .bg-blue-400 { background-color: #60a5fa; }
        .hover\\:bg-blue-500:hover { background-color: #3b82f6; }
        .text-blue-400 { color: #60a5fa; }
        
        .bg-green-400 { background-color: #34d399; }
        .hover\\:bg-green-500:hover { background-color: #10b981; }
        .text-green-400 { color: #34d399; }
      `}</style>
    </footer>
  );
};

export default Footer;