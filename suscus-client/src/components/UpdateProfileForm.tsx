import { useState, useContext,useEffect } from "react";
import "../css/UpdateProfileForm.css";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

const UpdateProfileForm: React.FC = () => {
  const { store } = useContext(Context);
  const [form, setForm] = useState({
    username: "",
    password: "",
    file: null as File | null,
    preview:''
  });

   useEffect(() => {
    const user = store.user;
    setForm((prev) => ({
      ...prev,
      username: user?.username || "",
      preview: user?.avatar || ""
    }));
  }, [store.user]);

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
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value.replace(" ", "").slice(0, 50),
            })
          }
          className="update-profile-form-input"
        />
        <input
          type="password"
          placeholder="password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value.replace(" ", "").slice(0, 50),
            })
          }
          className="update-profile-form-input"
        />
        <div className="image-upload-container">
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      id="file-upload"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (
                          file &&
                          (file.type === "image/png" || file.type === "image/jpeg")
                        ) {
                          setForm({
                            ...form,
                            file,
                            preview: URL.createObjectURL(file),
                          });
                        } else {
                          alert("Можно загружать только файлы PNG или JPG.");
                          e.target.value = "";
                        }
                      }}
                    />
                    <label htmlFor="file-upload" className="custom-upload">
                      {form.preview ? (
                        <img
                          src={form.preview}
                          alt="Preview"
                          className="image-preview"
                        />
                      ) : (
                        <div className="plus-icon">+</div>
                      )}
                    </label>
                  </div>
        <button
          type="submit"
          className={`${
            form.password.length > 0 && form.password.length < 6
              ? "unactive"
              : ""
          }`}
        >
          Сохранить
        </button>
      </form>
    </>
  );
};

export default observer(UpdateProfileForm);
