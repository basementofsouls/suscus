import { useState, useRef } from "react";
import "../css/CreatePublicationForm.css";
import { observer } from "mobx-react-lite";
import PublicationService from "../services/publication.service";

const CreatePublicationForm: React.FC = () => {
  const [form, setForm] = useState({ title: "", url: "" });
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
      await PublicationService.createPublication(form);
    } catch (error) {
      console.error(error);
      alert("Error during login.");
    }
  };

  return (
    <>
      <div onClick={handleChangePopUpState}>+</div>
      <dialog className="popup" ref={dialogRef}>
        <form onSubmit={handleSubmit} className="create-publication-form">
          <div onClick={handleChangePopUpState}>X</div>
          <input
            type="title"
            placeholder="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="create-publication-form-input"
          />
          <input
            type="url"
            placeholder="url"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="create-publication-form-input"
          />
          <button type="submit">Create</button>
        </form>
      </dialog>
    </>
  );
};

export default observer(CreatePublicationForm);
