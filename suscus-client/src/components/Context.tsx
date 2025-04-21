import { createContext, useState } from "react";
import { Order } from "../types/types";

interface StoreContextProps {
  artistOrders: Order[];
  setArtistOrders: (orders: Order[]) => void;
  updateOrderStatus: (orderId: number, newStatus: string) => void;
}

export const Context = createContext({} as StoreContextProps);


export const StoreProvider = ({ children }: any) => {
  const [artistOrders, setArtistOrders] = useState<Order[]>([]);

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setArtistOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <Context.Provider value={{ artistOrders, setArtistOrders, updateOrderStatus }}>
      {children}
    </Context.Provider>
  );
};
