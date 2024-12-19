import { useContext, useEffect, useState } from "react";
import "../css/OrderPage.css";
import OrderService from "../services/order.service";
import { Context } from "../main";

const OrdersPage = () => {
  const { store } = useContext(Context);

  const [asritstOrders, setArtistOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

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
  return (
    <div className="order-page">
      <div className="order-page-block">
        <div>Orders Page</div>
        <div className="order-list">
          <div className="order-list-column">
            <h3>Работник</h3>
            {asritstOrders
              ? asritstOrders.map((e: any) => {
                  return (
                    <div key={e.id} className="order-list-order">
                      <p>{e.artist_id}</p>
                      <p>{e.description}</p>
                      <p>{e.status}</p>
                      <img src={e.reference} />
                    </div>
                  );
                })
              : ""}
          </div>
          <div className="order-list-column">
            <h3>Заказчик</h3>
            {myOrders
              ? myOrders.map((e: any) => {
                  return (
                    <div key={e.id} className="order-list-order">
                      <p>Arsits ID: {e.artist_id}</p>
                      <p>Status: {e.status}</p>
                      <p>Description:</p>
                      <p>{e.description}</p>
                      <img src={e.reference} />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
