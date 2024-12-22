import { User } from "../../types/types";

export interface AuthResponse {
  access_token: string;
  refreshToken: string;
  user: User;
}
