import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class UserService {
  static async changeProfile(formData: any): Promise<AxiosResponse<any>> {
    return $api
      .post<any>("users/change", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response);
  }
  static async getUser(id: any): Promise<AxiosResponse<any>> {
    return $api
      .get<any>(`users/user/`, { params: { id } })
      .then((response) => response);
  }
}
