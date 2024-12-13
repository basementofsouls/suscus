import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class PublicationService {
  static async getPublicationComments(
    id: number
  ): Promise<Promise<AxiosResponse<any>>> {
    return $api.get<any>(`comments/${id}`).then((response) => response);
  }
  static async createComment(
    id: number,
    comment: string
  ): Promise<Promise<AxiosResponse<any>>> {
    return $api
      .post<any>(`comments/${id}`, { comment })
      .then((response) => response);
  }
}
