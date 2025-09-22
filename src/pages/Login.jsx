import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { resetHabitsOnLogin } from "../features/habits/habitsSlice";
import { Link, useNavigate } from "react-router-dom";
import SplashCursor from "../components/ui/SplashCursor";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("q@q.com");
  const [password, setPassword] = useState("123456");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError("Please fill all the fields");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }
    setFormError("");
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      dispatch(resetHabitsOnLogin(user.uid));
      navigate("/homepage");
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden text-white px-4 sm:px-6 lg:px-8">
      {/* ✨ Splash Cursor */}
      <SplashCursor />

      {/* 🔥 Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 animate-gradient-x"></div>

      {/* 🔮 Floating Glow Orbs */}
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob top-10 left-5 sm:left-10"></div>
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000 bottom-10 right-5 sm:right-10"></div>
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000 top-1/3 left-1/4"></div>

      {/* 🌟 Glassy Login Card */}
      <div className="relative backdrop-blur-xl bg-white/70 border border-white/30 text-gray-900 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md hover:scale-[1.02] transition duration-500">
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent text-center mb-6 sm:mb-8">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 sm:px-5 sm:py-3 rounded-full bg-white/90 border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-pink-400 outline-none transition duration-300 text-sm sm:text-base"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 sm:px-5 sm:py-3 rounded-full bg-white/90 border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none transition duration-300 text-sm sm:text-base"
          />

          {/* 🚨 Errors */}
          {formError && (
            <div className="text-red-500 text-xs sm:text-sm text-center">
              {formError}
            </div>
          )}
          {error && (
            <div className="text-red-500 text-xs sm:text-sm text-center">
              {error}
            </div>
          )}

          {/* 🚀 Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-semibold py-2.5 sm:py-3 rounded-full shadow-lg transition duration-300 disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {/* 🆕 Signup Redirect */}
        <p className="text-center text-gray-700 mt-5 sm:mt-6 text-sm sm:text-base">
          New user?{" "}
          <Link
            to="/signup"
            className="text-pink-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
