import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    // Basic validation
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <button className="login-button" onClick={handleLogin}>Login</button>
      
      <p className="signup-link">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
