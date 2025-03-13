import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // ✅ Import Link
import { loginUser } from "../api/auth"; // ✅ Ensure this API function exists

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(username, password);
      alert("Login successful!");
      navigate("/dashboard"); // ✅ Redirect after login
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin} className="auth-form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      
      {/* ✅ Use Link instead of <a> */}
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
