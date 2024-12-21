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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Формирование FormData для отправки файла и данных
    const formData = new FormData();
    if (form.artistId) formData.append("artistId", form.artistId.toString());
    formData.append("description", form.description);
    if (form.file) {
      formData.append("file", form.file);
    }

    try {
      const response = await OrderService.createOrder(formData);
      console.log("Order created successfully:", response.data);
      alert("Order created successfully!");
      handleChangePopUpState();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order.");
    }
  };

  return (
    <>
      <div className="button-purple" onClick={handleChangePopUpState}>
        Create Order
      </div>
      <dialog className="popup" ref={dialogRef}>
        <form onSubmit={handleSubmit} className="create-publication-form">
          <div onClick={handleChangePopUpState}>X</div>

          {/*
            <input
              type="text"
              placeholder="Artist ID"
              value={form.artistId}
              onChange={(e) => setForm({ ...form, artistId: e.target.value })}
              className="create-publication-form-input"
            />
          */}

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="create-publication-form-input"
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, file: e.target.files?.[0] || null })
            }
            className="create-publication-form-input"
          />
          <button type="submit">Submit Order</button>
        </form>
      </dialog>
    </>
  );
};

export default OrderForm;
