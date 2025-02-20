import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#1e3a8a" }}>
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h3 className="text-center fw-bold">Login</h3>
        <form>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="User name" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" />
          </div>
          <div className="mb-3 text-end">
            <a href="#" className="text-decoration-none">Forgot Password?</a>
          </div>
          <button className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <span>Don't have an account? <a href="#" className="fw-bold text-primary">Sign Up</a></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
