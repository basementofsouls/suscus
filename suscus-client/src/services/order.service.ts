import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class OrderService {
  static async getMyOrders(): Promise<AxiosResponse<any>> {
    return $api.get<any>("orders/my").then((response) => response);
  }

  static async getArtistOrders(): Promise<AxiosResponse<any>> {
    return $api.get<any>("orders/artist").then((response) => response);
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

  static async updateOrderStatus(data: any): Promise<AxiosResponse<any>> {
    return $api.put<any>("orders/update", data).then((response) => response);
  }

  static async deleteOrder(id: any): Promise<AxiosResponse<any>> {
    return $api
      .delete<any>(`orders/delete?id=${id}`)
      .then((response) => response);
  }
}
