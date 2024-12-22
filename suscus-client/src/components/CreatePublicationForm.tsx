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
    description: "",
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
      if (form.description) {
        formData.append("description", form.description);
      }
      if (categories.length > 0) {
        formData.append("categories", JSON.stringify(categories));
      }
      await PublicationService.createPublication(formData);
      handleChangePopUpState();
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
      <dialog className="create-publication-popup popup" ref={dialogRef}>
        <div className="popup-header">
          <h3>Add Publication</h3>
          <div onClick={handleChangePopUpState}>X</div>
        </div>
        <div className="create-publication-content">
          <form onSubmit={handleSubmit} className="create-publication-form">
            <div className="publication-form-row">
              <div>
                <h3 className="publication-form-title">Title</h3>
                <input
                  type="title"
                  placeholder="title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value.slice(0, 50) })
                  }
                  className="create-publication-form-input"
                />
              </div>
              <div>
                <h3 className="publication-form-title">Image</h3>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (
                      file &&
                      (file.type === "image/png" || file.type === "image/jpeg")
                    ) {
                      setForm({ ...form, file: e.target.files?.[0] || null });
                    } else {
                      alert("Можно загружать только файлы PNG или JPG.");
                      e.target.value = ""; // Сбрасываем выбранный файл
                    }
                  }}
                  className="create-publication-form-input"
                />
              </div>
            </div>
            <div>
              <h3 className="publication-form-title">Description</h3>
              <textarea
                placeholder="description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value.slice(0, 200),
                  })
                }
                className="create-publication-form-text-area"
              />
            </div>

            <button
              type="submit"
              className={`${
                form.description.length == 0 ||
                form.title.length == 0 ||
                form.file == null
                  ? "unactive"
                  : ""
              }`}
            >
              Create
            </button>
          </form>
          <div className="create-publication-form-categories">
            <CategoriesList setSearchCategories={setCategories} />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default observer(CreatePublicationForm);
