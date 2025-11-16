import React, { useState, useEffect } from "react";
import CountrySelector from './CountrySelector';

const PaystackPayment = ({ onBack }) => {
    const publicKey = "pk_test_4696b78b248df5ccee31c7b1a313d8dbfbc8ba1b"; // Replace with your own public key
    const amount = 1000 * 100; // Amount in Kobo (₦5000)
    const [errors, setErrors] = useState({});
    const [isPaystackReady, setIsPaystackReady] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState("Make Payment");
    const [formData, setFormData] = useState({
        email: '',
        agreed: false
    });

    useEffect(() => {
        if (window.PaystackPop) {
            console.log("Paystack ready!");
            setIsPaystackReady(true);
        } else {
            console.error("Paystack script NOT found");
        }
    }, []);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleDownload = async (url) => {
        setIsSubmitting("Downloading CVS...");
        try {
            const res = await fetch("http://localhost:5000" + url); // no credentials
            if (!res.ok) throw new Error("Network response not OK");

            const blob = await res.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "Untitled.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("Download failed:", err);
            alert("Failed to download file. Check server and file URL.");
            setIsSubmitting("Make Payment");
        }
        onBack();
    };

    // Async helper for verification
    const verifyPayment = async (reference) => {
        try {
            const res = await fetch("http://localhost:5000/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reference }),
            });
            const data = await res.json();

            if (data.success) {
                handleDownload(data.downloadUrl)
                // alert("Payment successful! You can now download the file.");
            } else {
                alert("Payment verification failed");
            }
        } catch (error) {
            console.log(error);

            alert("Server error verifying payment");
        }
    };

    function paystackCallback(response) {
        verifyPayment(response.reference).catch(err => {
            console.error("Error in Paystack callback:", err);
        });
    }
    const handlePay = () => {
        if (!window.PaystackPop) {
            alert("Paystack script not loaded yet.");
            return;
        }

        if (!formData.email) {
            alert("Please provide an email.");
            return;
        }
        if (!isPaystackReady) {
            alert("Payment system still loading, please wait a second...");
            return;
        }
        try {
            const handler = window.PaystackPop.setup({
                key: publicKey,
                email: formData.email,
                amount: amount,
                currency: "NGN",
                metadata: {
                    custom_fields: [
                        {
                            display_name: "Email",
                            variable_name: "email",
                            value: formData.email,
                        },
                    ],
                },
                callback: paystackCallback,
                onClose: function () { console.log("Payment closed.");  setIsSubmitting("Make Payment"); },
            });
            handler.openIframe();
        } catch (err) {
            console.error("Paystack setup error:", err);
            alert("Unable to initialize payment. Please refresh and try again.");
            setIsSubmitting("Make Payment");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        //Ensure user hasen't made any paymnts 
        if (isSubmitting === "Make Payment") {

            // Validate email
            if (!formData.email.trim()) {
                newErrors.email = 'Email address is required';
            } else if (!validateEmail(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }

            // Validate agreement
            if (!formData.agreed) {
                newErrors.agreed = 'Please agree to the Terms and Conditions';
            }

            setErrors(newErrors);

            // If no errors, submit form
            if (Object.keys(newErrors).length === 0) {
                setIsSubmitting(true);
                handlePay()
            }
        }
    }

    return (
        <section className="py-16" id="direct-payment">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl border p-8">
                        <h2 className="text-3xl font-bold text-center mb-2">Pay with Paystack</h2>
                        <p className="text-gray-600 text-center mb-8">
                            Please enter your email address
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">

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

                            {/* Buttons */}
                            <div className="flex flex-col justify-center items-center gap-5 px-[20%]">

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    // disabled={isSubmitting}
                                    className="w-full bg-purple-600 outline-none hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 px-2 rounded-lg font-semibold transition-colors"
                                >
                                    {isSubmitting === true ? 'Validating...' : isSubmitting}
                                </button>

                                {/* Back Button */}
                                <button
                                    onClick={onBack}
                                    // disabled={isSubmitting}
                                    className="w-full bg-gray-200 outline-none hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 py-3 px-2 rounded-lg font-medium"
                                >
                                    ← Back to Registration
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaystackPayment;