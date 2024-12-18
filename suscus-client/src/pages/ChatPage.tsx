import { useContext, useEffect } from "react";
import "../css/ChatPage.css";
import OrderService from "../services/order.service";
import { Context } from "../main";

const ChatPage = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await OrderService.getMyOrders();
      console.log(data);
    };

    fetchOrders();
  }, []);
  return (
    <div className="chat-page">
      <div className="chat-page-block">
        <div>chat Page</div>
        <div></div>
      </div>
    </div>
  );
};

export default ChatPage;
