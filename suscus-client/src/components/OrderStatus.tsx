import { useEffect, useState } from "react";
import { getStatusClass } from "../components/getstatusClass"; // Вынесенная функция
import "../css/Order/OrderPage.css";

interface OrderStatusProps {
  status: string; // Текущий статус из пропсов
  onStatusChange?: (newStatus: string) => void; // Функция для изменения статуса, если нужно
}

const OrderStatus = ({ status, onStatusChange }: OrderStatusProps) => {
  const [currentStatus, setCurrentStatus] = useState(status);


  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const handleStatusClick = () => {
    if (onStatusChange) {
      const newStatus = currentStatus; // Пример логики
      setCurrentStatus(newStatus); // Обновить локальный статус
      onStatusChange(newStatus); // Отправить новый статус в родительский компонент
    }
  };

  return (
    <span
      className={`order-stat ${getStatusClass(currentStatus)}`}
      onClick={handleStatusClick} // Обработчик клика, если нужно изменить статус
    >
      {currentStatus}
    </span>
  );
};

export default OrderStatus;
