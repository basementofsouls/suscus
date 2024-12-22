import { AxiosResponse } from "axios";
import $api from "../http/http";
import { AuthResponse } from "../models/response/auth.response.model";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api
      .post<AuthResponse>("auth/login", { email, password })
      .then((response) => response);
  }

  static async registration(
    email: string,
    password: string,
    username: string
  ): Promise<any> {
    return $api
      .post<AuthResponse>("auth/register", { email, password, username })
      .then((response) => response)
      .catch((response) => response);
  }

  static async logout(): Promise<void> {
    $api.post<AuthResponse>("auth/logout");
  }
}
