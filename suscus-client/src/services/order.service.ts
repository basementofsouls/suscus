import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class OrderService {
  static async getMyOrders(): Promise<AxiosResponse<any>> {
    return $api.get<any>("orders/my", {
      params: { includeUser: true }, // добавляем параметр для получения данных пользователя
    }).then((response) => response);
  }
  
  static async getArtistOrders(): Promise<AxiosResponse<any>> {
    return $api.get<any>("orders/artist", {
      params: { includeArtist: true }, // добавляем параметр для получения данных художника
    }).then((response) => response);
  }

  static async createOrder(formData: any): Promise<AxiosResponse<any>> {
    return $api
      .post<any>("orders/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response);
  }

  static async getOrderById(id: number) {
    return $api.get(`/orders/${id}`);
  }

  static async updateOrderStatus(data: any): Promise<AxiosResponse<any>> {
    return $api.put<any>("orders/update", data).then((response) => response);
  }

  static async deleteOrder(id: any): Promise<AxiosResponse<any>> {
    return $api
      .delete<any>(`orders/delete?id=${id}`)
      .then((response) => response);
  }
}
