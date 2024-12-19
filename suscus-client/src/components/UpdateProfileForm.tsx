import { useState, useRef, useContext } from "react";
import "../css/CreatePublicationForm.css";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

const UpdateProfileForm: React.FC = () => {
  const { store } = useContext(Context);
  const [form, setForm] = useState({
    username: "",
    password: "",
    file: null as File | null,
  });
  const [OpenPopUp, isOpenPopUp] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleChangePopUpState = () => {
    if (OpenPopUp) {
      dialogRef.current?.close();
    } else {
      dialogRef.current?.showModal();
    }
    isOpenPopUp(!OpenPopUp);
  };

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
      <div onClick={handleChangePopUpState}>update</div>
      <dialog className="popup" ref={dialogRef}>
        <form onSubmit={handleSubmit} className="create-publication-form">
          <div onClick={handleChangePopUpState}>X</div>
          <input
            type="username"
            placeholder="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="create-publication-form-input"
          />
          <input
            type="password"
            placeholder="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="create-publication-form-input"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, file: e.target.files?.[0] || null })
            }
            className="create-publication-form-input"
          />
          <button type="submit">Create</button>
        </form>
      </dialog>
    </>
  );
};

export default observer(UpdateProfileForm);
