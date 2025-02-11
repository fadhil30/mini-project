"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Interface untuk tipe data User
interface User {
  id: number;
  fullName: string;
  email: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<User | null>(null); // Menggunakan User

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json(); // Definisikan tipe response

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Simpan token ke local storage
      localStorage.setItem("token", data.token);

      // Fetch data user setelah login berhasil
      await fetchUserData(data.token);

      alert("Login Successful");
      router.push("/"); // Redirect ke dashboard setelah login sukses
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8000/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData: User = await response.json(); // Tentukan tipe User
      setUserData(userData); // Simpan data user ke state
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch user data"
      );
    }
  };

  // Ambil data user jika token sudah ada di localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="grid grid-cols-2 bg-white shadow-lg rounded-lg w-3/4 overflow-hidden">
        {/* Bagian Kiri */}
        <div className="bg-indigo-900 text-white flex flex-col justify-center items-start px-10">
          <h1 className="text-4xl font-bold mb-4">Discover tailored events</h1>
          <p className="text-lg mb-6">
            Sign in for personalized recommendations today!
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

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
                  type={passwordVisible ? "text" : "password"}
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
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Tampilkan data user jika sudah login */}
          {userData && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg">
              <h3 className="text-lg font-bold text-green-700">
                Welcome, {userData.fullName}!
              </h3>
              <p className="text-gray-600">Email: {userData.email}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </div>

          {/* Tombol Sign in for Promotor */}
          <div className="mt-4 text-center">
            <a
              href="/promotorLogin"
              className="text-sm text-indigo-600 hover:underline"
            >
              Sign in for Promotor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
