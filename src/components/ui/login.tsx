"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [employeeId, setEmployeeId] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId.trim()) {
      router.push("/dashboard"); // Redirect to dashboard
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Left Side Image */}
        <div className="p-8 flex flex-col justify-between bg-blue-100">
          <img
            src="/icons/start.png"
            alt="Illustration"
            className="w-full h-96 object-cover rounded-xl"
          />
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Understand the concept in a simpler and fun way
            </h2>
          </div>
        </div>

        {/* Right Side Login Form */}
        <div className="p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <img
              src="/icons/logo.png"
              alt="Logo"
              className="w-24 h-24 mx-auto mb-4 object-contain"
            />
            <h1 className="text-2xl font-bold mb-1">Welcome To</h1>
            <h2 className="text-3xl font-bold text-gray-900">Physics Wallah</h2>
            <p className="text-gray-600 mt-2">
              Please enter your Employee ID to login
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter Employee ID"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Current Organization: </span>
            <span className="text-blue-600 font-medium">Physics Wallah</span>
            <button className="block mx-auto text-blue-600 hover:underline mt-1">
              Switch Organization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
