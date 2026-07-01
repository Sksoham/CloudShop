import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

import "./ForgotPassword.css";

function ForgotPassword() {
  return (
    <div className="forgot-page">

      <div className="forgot-card">

        <h1>Forgot Password?</h1>

        <p>
          Enter your email address and we'll send you a password reset link.
        </p>

        <form>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Enter your email"
              required
            />

          </div>

          <button
            className="forgot-btn"
            type="submit"
          >
            Send Reset Link
          </button>

        </form>

        <p className="back-login">

          Remember your password?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;