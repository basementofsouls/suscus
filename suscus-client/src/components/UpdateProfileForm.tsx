import { useState, useRef, useContext } from "react";
import "../css/CreatePublicationForm.css";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

const UpdateProfileForm: React.FC = () => {
  const { store } = useContext(Context);
  const [form, setForm] = useState({
    username: "",
    avatar: "",
    password: "",
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
      await store.update(form);
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
            type="avatar"
            placeholder="avatar"
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            className="create-publication-form-input"
          />
          <input
            type="password"
            placeholder="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="create-publication-form-input"
          />
          <button type="submit">Create</button>
        </form>
      </dialog>
    </>
  );
};

export default observer(UpdateProfileForm);
