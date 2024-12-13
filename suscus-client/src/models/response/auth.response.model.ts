import IUser from "../IUser";

export interface AuthResponse {
  access_token: string;
  refreshToken: string;
  user: IUser;
}
