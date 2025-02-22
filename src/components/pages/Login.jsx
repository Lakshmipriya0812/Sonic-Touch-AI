import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-900">
      <div className="bg-white p-6 shadow-lg rounded-lg w-80">
        <h3 className="text-center text-xl font-bold">Login</h3>
        <form>
          <div className="mb-3">
            <input
              type="text"
              placeholder="User name"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-3 text-right">
            <a href="#" className="text-blue-600 text-sm">
              Forgot Password?
            </a>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <span className="text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 font-bold">
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
