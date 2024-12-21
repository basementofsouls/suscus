import { useState, useRef } from "react";
import "../css/CreatePublicationForm.css";
import { observer } from "mobx-react-lite";
import PublicationService from "../services/publication.service";
import CategoriesList from "./categoriesList";

const CreatePublicationForm: React.FC = () => {
  const [categories, setCategories] = useState<Array<number>>([]);
  const [OpenPopUp, isOpenPopUp] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [form, setForm] = useState({
    title: "",
    file: null as File | null,
  });

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
      formData.append("title", form.title);
      if (form.file) {
        formData.append("file", form.file);
      }
      if (categories.length > 0) {
        formData.append("categories", JSON.stringify(categories));
      }
      await PublicationService.createPublication(formData);
    } catch (error) {
      console.error(error);
      alert("Error during login.");
    }
  };

  return (
    <>
      <div onClick={handleChangePopUpState} className="button-purple">
        +
      </div>
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
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, file: e.target.files?.[0] || null })
            }
            className="create-publication-form-input"
          />
          <button type="submit">Create</button>
        </form>
        <CategoriesList setSearchCategories={setCategories} />
      </dialog>
    </>
  );
};

export default observer(CreatePublicationForm);
