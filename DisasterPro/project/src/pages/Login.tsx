import React, { useState } from 'react';
import { Button } from '../components/ui/button';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword && formData.email) {
      setIsRegistered(true);
      setIsRegistering(false);
      alert('Registration successful! You can now log in.');
    } else {
      alert('Please enter valid details and ensure passwords match.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? 'Register' : 'Login'}
        </h2>

        {isRegistering ? (
          // Register Form
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
            <Button className="w-full" type="submit">Register</Button>
          </form>
        ) : (
          // Login Form
          <form className="space-y-4">
            <div>
              <label htmlFor="emailLogin" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="emailLogin"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="passwordLogin" className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                id="passwordLogin"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            <Button className="w-full" type="submit" disabled={!isRegistered}>Login</Button>
          </form>
        )}

        {/* Toggle Button */}
        <p className="mt-4 text-center text-sm">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-400 hover:underline ml-1"
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;