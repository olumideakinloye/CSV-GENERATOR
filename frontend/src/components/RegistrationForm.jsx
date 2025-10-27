import React, { useState } from 'react';
import CountrySelector from './CountrySelector';
import { useStats } from '../context/StatsContext';

const RegistrationForm = ({ onRegistrationComplete }) => {
  const { incrementContacts } = useStats();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+234',
    agreed: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate phone
  const validatePhone = (phone) => {
    const regex = /^[0-9]{7,15}$/;
    return regex.test(phone.replace(/[\s-()]/g, ''));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate agreement
    if (!formData.agreed) {
      newErrors.agreed = 'Please agree to the Terms and Conditions';
    }

    setErrors(newErrors);

    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Registration data:', formData);
        incrementContacts(); // Increase the contact count
        
        // Move to WhatsApp verification step
        onRegistrationComplete(formData);
        
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border p-8">
            <h2 className="text-3xl font-bold text-center mb-2">Join the Network</h2>
            <p className="text-gray-600 text-center mb-8">
              Register your contact information to connect with more people and expand your network
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <CountrySelector
                    value={formData.countryCode}
                    onChange={(code) => setFormData(prev => ({ ...prev, countryCode: code }))}
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                    className="flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="8012345678"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agree"
                  checked={formData.agreed}
                  onChange={(e) => setFormData(prev => ({ ...prev, agreed: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="agree" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-purple-600 hover:underline">Terms and Conditions</a>
                  {' '}and{' '}
                  <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              {errors.agreed && <p className="text-red-500 text-sm">{errors.agreed}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold transition-colors"
              >
                {isSubmitting ? 'Registering...' : 'Register Now'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;