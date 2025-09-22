// src/pages/Signup.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, resetSignup } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import SplashCursor from "../components/ui/SplashCursor";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupSuccess, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile to disable cursor effect
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setFormError("⚠️ Please fill all the fields");
      return;
    }
    if (password.length < 6) {
      setFormError("⚠️ Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("⚠️ Passwords do not match");
      return;
    }

    setFormError("");
    dispatch(signupUser({ username: name, email, password }));
  };

  // Redirect after signup
  useEffect(() => {
    if (signupSuccess) {
      navigate("/login");
      dispatch(resetSignup());
    }
  }, [signupSuccess, navigate, dispatch]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden text-white px-4 sm:px-6">
      {/* 💫 Splash Cursor (only desktop) */}
      {!isMobile && <SplashCursor />}

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 animate-gradient-x"></div>

      {/* Floating Blobs */}
      <div className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob top-10 left-6 sm:left-10"></div>
      <div className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000 bottom-10 right-6 sm:right-10"></div>
      <div className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000 top-1/2 left-1/4 sm:left-1/3"></div>

      {/* Signup Card */}
      <div className="relative backdrop-blur-xl bg-white/80 border border-white/30 text-gray-900 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 max-w-sm sm:max-w-md w-full transition duration-500 hover:shadow-pink-400/30">
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent text-center mb-6 sm:mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <input
            autoFocus
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/95 border border-gray-200 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none transition duration-300 text-sm sm:text-base"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/95 border border-gray-200 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-pink-400 outline-none transition duration-300 text-sm sm:text-base"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/95 border border-gray-200 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none transition duration-300 text-sm sm:text-base"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/95 border border-gray-200 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-pink-400 outline-none transition duration-300 text-sm sm:text-base"
          />

          {/* Error Messages */}
          {(formError || error) && (
            <div className="text-red-500 text-xs sm:text-sm text-center">
              {formError || error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-semibold py-2.5 sm:py-3 rounded-full shadow-lg transition duration-300 disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                Signing Up...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Redirect to login */}
        <p className="text-center text-gray-700 mt-4 sm:mt-6 text-sm sm:text-base">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-500 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
