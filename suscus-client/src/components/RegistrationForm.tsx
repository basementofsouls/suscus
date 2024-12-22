import { useContext, useState } from "react";
import "../css/loginForm.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const RegistrationForm: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await store.registration(form.email, form.password, form.username);

      if (store.isAuth) {
        navigate("/gallery");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value.replace(" ", "").slice(0, 50),
          })
        }
        className="login-form-input"
      />
      <input
        type="username"
        placeholder="username"
        value={form.username}
        onChange={(e) =>
          setForm({
            ...form,
            username: e.target.value.replace(" ", "").slice(0, 50),
          })
        }
        className="login-form-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value.replace(" ", "").slice(0, 50),
          })
        }
        className="login-form-input"
      />
      <button
        type="submit"
        className={`${
          form.password.length < 6 ||
          form.email.indexOf("@") == -1 ||
          form.username.length == 0
            ? "unactive"
            : ""
        }`}
      >
        Sign up
      </button>
    </form>
  );
};

export default observer(RegistrationForm);
