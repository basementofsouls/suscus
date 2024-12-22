import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class CommentsService {
  static async getPublicationComments(
    id: string
  ): Promise<Promise<AxiosResponse<any>>> {
    return $api.get<any>(`comments/all?id=${id}`).then((response) => response);
  }
  static async createComment(data: any): Promise<Promise<AxiosResponse<any>>> {
    return $api
      .post<any>(`comments/create/`, { data })
      .then((response) => response);
  }
  static async updateComment(data: any): Promise<Promise<AxiosResponse<any>>> {
    return $api
      .put<any>(`comments/update/`, { data })
      .then((response) => response);
  }
  static async deleteComment(
    id: number | string
  ): Promise<Promise<AxiosResponse<any>>> {
    return $api
      .delete<any>(`comments/delete?id=${id}`)
      .then((response) => response);
  }
}
