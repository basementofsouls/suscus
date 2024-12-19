import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class CategoryService {
  static async getPublicationCategory(id: any): Promise<AxiosResponse<any>> {
    return $api
      .get<any>(`categories/pub?id=${id}`)
      .then((response) => response);
  }

  static async getAllCategory(): Promise<AxiosResponse<any>> {
    return $api.get<any>("categories/all").then((response) => response);
  }

  static async createCategory(data: any): Promise<AxiosResponse<any>> {
    return $api
      .post<any>("categories/create", { data })
      .then((response) => response);
  }

  static async updateCategory(data: any): Promise<AxiosResponse<any>> {
    return $api
      .post<any>("categories/update", data)
      .then((response) => response);
  }

  static async deleteCategory(id: any): Promise<AxiosResponse<any>> {
    return $api
      .delete<any>(`categories/delete?id=${id}`)
      .then((response) => response);
  }
}
