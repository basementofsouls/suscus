import { useContext, useEffect, useState } from "react";
import "../css/Order/OrderPage.css";
import OrderService from "../services/order.service";
import { Context } from "../main";
import { Order } from "../types/types";
import ChatService from "../services/chat.service";
import { useNavigate } from "react-router-dom";
import OrderStatus from "../components/OrderStatus"


const OrdersPage = () => {
  const { store } = useContext(Context);
  const [artistOrders, setArtistOrders] = useState<Order[]>([]);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [editingOrderId, setEditingOrderId] = useState<number>(0);
  const [newStatus, setNewStatus] = useState("");
  const [orderStatuses, setOrderStatuses] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();
  const statuses = ["Новый","В работе",  "На удержании", "Готов", "Отказ"];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [myOrdersRes, artistOrdersRes] = await Promise.all([
          OrderService.getMyOrders(),
          OrderService.getArtistOrders(),
        ]);
  
        const sortedMyOrders = myOrdersRes.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        const sortedArtistOrders = artistOrdersRes.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  
        setMyOrders(sortedMyOrders);
        setArtistOrders(sortedArtistOrders);
  
        // ✅ Обновляем локальные статусы, чтобы изменения не откатывались
        const initialStatuses: { [key: number]: string } = {};
        [...sortedMyOrders, ...sortedArtistOrders].forEach(order => {
          initialStatuses[order.id] = order.status;
        });
        setOrderStatuses(initialStatuses);
      } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
      }
    };
    fetchOrders();
  }); // ✅ Запускаем только при первом рендере
  
  

  function getTimeAgo(updatedAt: Date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - updatedAt.getTime()) / 1000); // разница в секундах
  
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);
    const months = Math.floor(diffInSeconds / 2592000); // среднее количество секунд в месяце
    const years = Math.floor(diffInSeconds / 31536000); // среднее количество секунд в году
  
    if (years > 0) {
      return `${years} г.`;
    }
    if (months > 0) {
      return `${months} мес.`;
    }
    if (days > 0) {
      return `${days} дн.`;
    }
    if (hours > 0) {
      return `${hours} ч.`;
    }
    if (minutes > 0) {
      return `${minutes} мин.`;
    }
    return `${diffInSeconds} с.`;
  }

  const createChat = async (artistId: any, clientId: any) => {
    const { data } = await ChatService.createChat({
      clientId: parseInt(clientId),
      artistId: parseInt(artistId),
    });
    navigate(`/chat?chatId=${data.id}`);
  };

  useEffect(() => {
    // Инициализируем статусы заказов при первом рендере
    const initialStatuses: { [key: number]: string } = {};
    [...myOrders, ...artistOrders].forEach((order) => {
      initialStatuses[order.id] = order.status;
    });
    setOrderStatuses(initialStatuses);
  }, [myOrders, artistOrders]);

  const handleStatusClick = (orderId: number, currentStatus: string) => {
    setEditingOrderId(orderId);
    setNewStatus(currentStatus);
  };


  const handleStatusChange = async (orderId: number, selectedStatus: string) => {
    try {
      // Локально обновляем статус
      setArtistOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: selectedStatus } : order
        )
      );
      setNewStatus(selectedStatus);
      setOrderStatuses((prev) => ({
        ...prev,
        [orderId]: selectedStatus, // ✅ Обновляем статус в orderStatuses
      }));
  
      await OrderService.updateOrderStatus({ id: orderId, status: selectedStatus });
  
      setEditingOrderId(0); // Закрываем select после обновления
    } catch (error) {
      console.error("Ошибка обновления статуса:", error);
    }
  };
  
  
  const handleDeleteClick = async (id: number) => {
    const { data } = await OrderService.deleteOrder(id);
    if (data.id) {
      setMyOrders(myOrders.filter((e) => e.id !== data.id));
    }
  };

  return (
    <div className="order-page">
      <div className="order-page-container">
        <h2 className="page-title">Мои заказы</h2>
        <div className="order-sections">
          {store.user.role === "artist" && (
            <div className="order-column">
              <h3 className="section-title">Работник</h3>
              <div className="order-list">
                {artistOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-info">
                    <div className="labels-container">
                    <div className="label-group">
                      <p className="order-label">Заказ  №{order.id}</p>
                      <p>От {new Date(order.created_at).toLocaleString()}</p>
                      </div>
                    <div className="label-group">
                      <p className="order-label">Заказчик</p>
                      <p>{order.user?.username}</p>
                      </div>
                      <div className="label-group">
                      <p className="order-label">Описание</p>
                      <p>{order.description}</p>
                      </div>
                      <div className="label-group">
                      <p className="order-label">Статус заказа (Нажмите, чтобы изменить)</p>
                      {editingOrderId === order.id ? (
                        <select
                        className="custom-select"
                        value={newStatus}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      
                      ) : (
                        <span className="status-text" onClick={() => handleStatusClick(order.id, order.status)}>{order.status}</span>
                      )}
                      </div>
                      </div>
                      <button className="button-chat" onClick={() => createChat(order.user_id, store.user.id)}>Чат</button>
                    </div>
                    <img className="order-image" src={order.reference} />
                  </div>
                ))}
              </div>
            </div>
          )}
            
          <div className="order-column">
          <h3 className="section-title">Заказчик</h3>
            <div className="order-list">
            {myOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-info">
                    <div className="labels-container">
                      <div className="label-group">
                    <p className="order-label">Художник</p>
                    <p>{order.artist?.username}</p>
                      </div>
                      <div className="label-group">
                    <p className="order-label">Статус заказа</p>
                    <p><OrderStatus status={orderStatuses[order.id]} onStatusChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                          />
                    <br/> В текущем статусе: {getTimeAgo(new Date(order.updated_at))}</p>
                    </div>
                      <div className="label-group">
                    <p className="order-label">Описание</p>
                    <p>{order.description}</p>
                    </div>
                    </div>
                    <div className="order-buttons">
                      <button className="button-chat" onClick={() => createChat(store.user.id, order.artist_id)}>Чат</button>
                      <button className="button-delete" onClick={() => handleDeleteClick(order.id)}>Отменить</button>
                    </div>
                  </div>
                  <img className="order-image" src={order.reference}  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
