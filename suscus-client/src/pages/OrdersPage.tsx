import { useContext, useEffect, useState } from "react";
import "../css/OrderPage.css";
import OrderService from "../services/order.service";
import { Context } from "../main";

const OrdersPage = () => {
  const { store } = useContext(Context);

  const [asritstOrders, setArtistOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const statuses = ["готов", "в работе", "новый", "отказ"];

  useEffect(() => {
    const fetchMyOrders = async () => {
      const { data } = await OrderService.getMyOrders();
      console.log(data);
      setMyOrders(data);
    };

    const fetchArtistOrders = async () => {
      const { data } = await OrderService.getArtistOrders();
      console.log(data);
      setArtistOrders(data);
    };

    fetchMyOrders();
    fetchArtistOrders();
  }, []);

  const handleStatusClick = (orderId: string, currentStatus: string) => {
    setEditingOrderId(orderId);
    setNewStatus(currentStatus);
  };

  const handleStatusChange = async (
    orderId: string,
    selectedStatus: string
  ) => {
    try {
      setArtistOrders((prevOrders: any) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: selectedStatus } : order
        )
      );
      await OrderService.updateOrderStatus({
        id: orderId,
        status: selectedStatus,
      });

      setEditingOrderId(null);
    } catch (error) {
      console.error("Ошибка обновления статуса:", error);
    }
  };

  const handleOutsideClick = () => {
    setEditingOrderId(null);
  };

  const handleDeleteClick = async (id: string) => {
    const { data } = await OrderService.deleteOrder(id);
    if (data.id) {
      setMyOrders(myOrders.filter((e) => e.id != data.id));
    }
  };

  return (
    <div className="order-page" onClick={handleOutsideClick}>
      <div className="order-page-block">
        <div className="order-list">
          <div>
            <h3>Работник</h3>
            <div className="order-list-column">
              {asritstOrders
                ? asritstOrders.map((e: any) => {
                    return (
                      <div
                        key={e.id}
                        className="order-list-item"
                        onClick={(event) => event.stopPropagation()} // Останавливаем всплытие клика
                      >
                        <div>
                          <p>User ID: {e.user_id}</p>
                          <p>Description</p>
                          <p>{e.description}</p>
                          <p>
                            Status:{" "}
                            {editingOrderId === e.id ? (
                              <select
                                value={newStatus}
                                onChange={(event) =>
                                  handleStatusChange(e.id, event.target.value)
                                }
                                onClick={(event) => event.stopPropagation()} // Останавливаем всплытие клика
                              >
                                {statuses.map((status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span
                                onClick={() =>
                                  handleStatusClick(e.id, e.status)
                                }
                              >
                                {e.status}
                              </span>
                            )}
                          </p>
                        </div>
                        <img
                          className="order-image"
                          src={e.reference}
                          alt="reference"
                        />
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          <div>
            <h3>Заказчик</h3>

            <div className="order-list-column">
              {myOrders
                ? myOrders.map((e: any) => {
                    return (
                      <div key={e.id} className="order-list-item">
                        <div className="order-list-item-info">
                          <div>
                            <p>Arsits ID: {e.artist_id}</p>
                            <p>Status: {e.status}</p>
                            <p>Description:</p>
                            <p className="order-list-item-description">
                              {e.description.slice(0, 200)}
                            </p>
                          </div>
                          <div
                            className="button-purple"
                            onClick={() => {
                              handleDeleteClick(e.id);
                            }}
                          >
                            Отменить
                          </div>
                        </div>
                        <img
                          className="order-image"
                          src={e.reference}
                          alt="reference"
                        />
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
