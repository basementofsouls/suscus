import { useContext, useState } from "react";
import "../css/loginForm.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const LoginForm: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await store.login(form.email, form.password);

      if (store.isAuth) {
        navigate("/gallery");
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
      <button type="submit">Sign in</button>
    </form>
  );
};

export default observer(LoginForm);
