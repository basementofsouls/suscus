import { useState } from "react";
import { authLogin } from "../services/auth.services";
import "../css/loginForm.css";

const LoginForm: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await authLogin(form);

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        alert("Login successful!");
      } else {
        alert("Error during login.");
      }
    } catch (error) {
      console.error(error);
      alert("Error during login.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="login-form-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="login-form-input"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
