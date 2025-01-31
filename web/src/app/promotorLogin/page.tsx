'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    console.log('Login Data:', formData);
    alert('Login Successful');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="grid grid-cols-2 bg-white shadow-lg rounded-lg w-3/4 overflow-hidden">
        {/* Bagian Kiri */}
        <div className="bg-indigo-900 text-white flex flex-col justify-center items-start px-10">
          <h1 className="text-4xl font-bold mb-4">Make your own event with us</h1>
          <p className="text-lg mb-6">
            Join your team event here!
          </p>
        </div>

        {/* Bagian Kanan */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {/* Tombol Login Sosial */}
          <div className="flex gap-4 mb-6">
            <button className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Login with Google
            </button>
            <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Login with Facebook
            </button>
          </div>

          <div className="relative text-center mb-4">
            <span className="absolute left-0 right-0 h-px bg-gray-300 top-1/2"></span>
            <span className="relative bg-white px-4 text-gray-500">OR</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="email">
                E-mail Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your e-mail"
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

            <button
              type="submit"
              className="w-full py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center text-sm text-gray-500">
            Don’t have an promoter account?{' '}
            <a href="/promotorSignup" className="text-indigo-600 hover:underline">
              Sign up as promoter here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
