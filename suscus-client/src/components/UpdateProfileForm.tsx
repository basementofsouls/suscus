import { useState, useContext } from "react";
import "../css/UpdateProfileForm.css";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

const UpdateProfileForm: React.FC = () => {
  const { store } = useContext(Context);
  const [form, setForm] = useState({
    username: "",
    password: "",
    file: null as File | null,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("password", form.password);
      if (form.file) {
        formData.append("file", form.file);
        console.log(form.file);
      }
      await store.update(formData);
    } catch (error) {
      console.error(error);
      alert("Error during login.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <input
          type="username"
          placeholder="username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="update-profile-form-input"
        />
        <input
          type="password"
          placeholder="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="update-profile-form-input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, file: e.target.files?.[0] || null })
          }
          className="update-profile-form-input"
        />
        <button type="submit">Сохранить</button>
      </form>
    </>
  );
};

export default observer(UpdateProfileForm);
