'use client';

import { useState } from 'react';

export default function SignUpPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    referralNumber: '',
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Account created successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="grid grid-cols-2 bg-white shadow-lg rounded-lg w-3/4 overflow-hidden">
        {/* Left Section */}
        <div className="bg-[#2B293B] text-white flex flex-col justify-center items-start px-10">
          <h1 className="text-4xl font-bold mb-4">Discover tailored events</h1>
          <p className="text-lg mb-6">
            Sign up for personalized recommendations today!
          </p>
        </div>

        {/* Right Section */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

          {/* Social Buttons */}
          <div className="flex gap-4 mb-6">
            <button className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Sign up with Google
            </button>
            <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Sign up with Facebook
            </button>
          </div>

          <div className="relative text-center mb-4">
            <span className="absolute left-0 right-0 h-px bg-gray-300 top-1/2"></span>
            <span className="relative bg-white px-4 text-gray-500">OR</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {passwordVisible ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 mb-1"
                htmlFor="referralNumber"
              >
                Referral Number (Optional)
              </label>
              <input
                type="text"
                id="referralNumber"
                placeholder="Enter referral number"
                value={formData.referralNumber}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#2B293B] text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:underline">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
