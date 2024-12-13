import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class UserService {
  static async changeProfile(profile: any): Promise<AxiosResponse<any>> {
    return $api
      .post<any>("users/change", { profile })
      .then((response) => response);
  }
}
