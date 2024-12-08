import { useState } from "react";
import  axios from "axios";

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post('http://localhost:3000/auth/login', form);
        localStorage.setItem('token', data.access_token);
        alert('Login successful!');
      } catch (error) {
        console.error(error);
        alert('Error during login.');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    );
  };
  
  export default Login;
  