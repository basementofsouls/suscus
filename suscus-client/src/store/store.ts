import { makeAutoObservable } from "mobx";
import IUser from "../models/IUser";
import axios from "axios";
import { AuthResponse } from "../models/response/auth.response.model";
import { API_URL } from "../http/http";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const resp = await AuthService.login(email, password);
      localStorage.setItem("access_token", resp.data.access_token);
      this.setAuth(true);
      this.setUser(resp.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async update(data: any) {
    try {
      const resp = await UserService.changeProfile(data);
      if (resp.data.access_token) {
        localStorage.setItem("access_token", resp.data.access_token);
        this.setUser(resp.data.user);
      }
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(email: string, password: string, username: string) {
    try {
      const resp = await AuthService.registration(email, password, username);
      localStorage.setItem("access_token", resp.data.access_token);
      this.setAuth(true);
      this.setUser(resp.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    this.setLoading(true);
    try {
      await AuthService.logout();
      localStorage.removeItem("access_token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const resp = await axios.get<AuthResponse>(
        `${API_URL}/auth/refresh-token`,
        {
          withCredentials: true,
        }
      );
      if (resp.data.access_token) {
        localStorage.setItem("access_token", resp.data.access_token);
        this.setAuth(true);
        this.setUser(resp.data.user);
      } else {
        this.setAuth(false);
      }
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
