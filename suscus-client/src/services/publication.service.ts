import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class PublicationService {
  static async createPublication(
    publication: any
  ): Promise<AxiosResponse<any>> {
    return $api
      .post<any>("publications/create", { publication })
      .then((response) => response);
  }

  static async searchPublications(
    page: number,
    filter: any
  ): Promise<AxiosResponse<any>> {
    return $api
      .get<any>(
        `publications/search?page=${page}
        ${filter.artist_id ? `&artist_id=${filter.artist_id}` : ""}
        ${filter.title ? `&title=${filter.title}` : ""}
        `
      )
      .then((response) => response);
  }

  static async getPublicationById(id: number): Promise<AxiosResponse<any>> {
    return $api
      .get<any>(`publications/search?id=${id}`)
      .then((response) => response);
  }
}
