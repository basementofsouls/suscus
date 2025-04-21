import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class ChatService {
  // Получаем список чатов, включая данные о клиенте и художнике
  static async getChats(): Promise<AxiosResponse<any>> {
    return $api.get<any>("chat/my").then((response) => {
      response.data = response.data.map((chat: any) => ({
        ...chat,
        client: chat.client || {},  
        artist: chat.artist || {},
      }));
  
      return response; // Теперь возвращается полный AxiosResponse
    });
  }
  
  // Получаем историю сообщений, включая информацию об отправителе
  static async getChatHistory(id: number): Promise<AxiosResponse<any>> {
    return $api.get<any>(`chat/messages?chatId=${id}`);
  }

  // Создаем новый чат
  static async createChat(data: any): Promise<AxiosResponse<any>> {
    return $api.post<any>(`chat/create`, data).then((response) => response);
  }
    // Помечаем все непрочитанные входящие сообщения как прочитанные
    static async markMessagesAsRead(chatId: number, userId: number): Promise<AxiosResponse<any>> {
      return $api.post<any>('chat/messages/read', { chatId, userId });
    }
}
