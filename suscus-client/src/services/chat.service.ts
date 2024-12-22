import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class ChatService {
  static async getChats(): Promise<AxiosResponse<any>> {
    return $api.get<any>(`chat/my`).then((response) => response);
  }
  static async getChatHistory(id: streing): Promise<AxiosResponse<any>> {
    return $api
      .get<any>(`chat/messages?chatId=${id}`)
      .then((response) => response);
  }
  static async createChat(data): Promise<AxiosResponse<any>> {
    return $api.post<any>(`chat/create`, data).then((response) => response);
  }
}
