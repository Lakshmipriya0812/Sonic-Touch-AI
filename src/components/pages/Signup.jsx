import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../api/auth";

const Signup = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await signupUser(name, email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError(data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="bg-white p-8 shadow-md rounded-xl w-96">
          <h3 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Create an Account
          </h3>

          {error && <p className="text-green-600 text-center">{error}</p>}

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              autoComplete="username"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              autoComplete="new-password"
            />
            {/* 
            <input
              type="password"
              placeholder="rewrite-Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              autoComplete="new-password"
            />
*/}
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-3 rounded-md font-semibold hover:bg-gray-900 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-gray-800 font-bold hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
