const API_URL = "http://localhost:5000"; // ✅ Replace with your actual backend URL

// ✅ Register a new user
export const registerUser = async (first_name, last_name, username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name, last_name, username, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registration failed");
    return data;
  } catch (error) {
    throw error;
  }
};

// ✅ Log in user and get a JWT token
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    // ✅ Store token in localStorage
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

// ✅ Verify user session using stored token
export const verifyUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: token },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Invalid token");

    return data; // ✅ Returns user data if valid
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
};

// ✅ Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
};
