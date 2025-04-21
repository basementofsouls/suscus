import { useState, useRef } from "react";
import "../css/CreatePublicationForm.css";
import OrderService from "../services/order.service";

type OrderFormProto = {
  id: string | number | undefined;
};

const OrderForm: React.FC<OrderFormProto> = ({ id }) => {
  const [form, setForm] = useState({
    artistId: id,
    description: "",
    file: null as File | null, // Поле для файла
    preview: "", 
  });
  const [OpenPopUp, isOpenPopUp] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const initialForm = {
    artistId: id,
    description: "",
    file: null as File | null, // Поле для файла
    preview: "", 
  };
  


  const handleChangePopUpState = () => {
    if (OpenPopUp) {
      dialogRef.current?.close();
      setForm(initialForm);       // Сброс формы при закрытии
    } else {
      dialogRef.current?.showModal();
    }
    isOpenPopUp(!OpenPopUp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Формирование FormData для отправки файла и данных
    const formData = new FormData();
    if (form.artistId) formData.append("artist_id", form.artistId.toString());
    formData.append("description", form.description);
    if (form.file) {
      formData.append("file", form.file);
    }

    try {
      await OrderService.createOrder(formData);
      //const response = await OrderService.createOrder(formData);
      //console.log("Order created successfully:", response.data);
      //alert("Order created successfully!");
      handleChangePopUpState();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order.");
    }
  };

  return (
    <>
      <div className="button-purple" onClick={handleChangePopUpState}>
        Make an Order
      </div>
      <dialog className="create-order-popup" ref={dialogRef}>
        <div className="popup-header">
          <h3>Order</h3>
          <div onClick={handleChangePopUpState}>X</div>
        </div>
        <form onSubmit={handleSubmit} className="create-publication-form">
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="create-publication-form-input"
          ></textarea>
         <div>
                  <h3 className="publication-form-title">Image</h3>
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
                </div>
          <button
            type="submit"
            className={`${form.description.length == 0 ? "unactive" : ""}`}
          >
            Submit Order
          </button>
        </form>
      </dialog>
    </>
  );
};

export default OrderForm;
