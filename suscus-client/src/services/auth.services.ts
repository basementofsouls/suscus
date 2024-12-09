import axios from "axios";
import { User } from "../constants/models";

export async function authLogin(user: User) {
  try {
    const { data } = await axios.post("http://localhost:3000/auth/login", user);
    return data;
  } catch (e) {
    return e;
  }
}
