import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class PublicationService {
  static async createPublication(data: any): Promise<AxiosResponse<any>> {
    return $api
      .post<any>("publications/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response);
  }

  static async searchPublications(
    page: number,
    filter: { artist_id?: number; title?: string; categories: number[] }
  ): Promise<AxiosResponse<any>> {
    const params = new URLSearchParams();

    // Добавляем номер страницы
    params.append("page", page.toString());

    // Добавляем категории как запятую
    if (filter.categories?.length) {
      params.append("categories", filter.categories.join(","));
    }
    // Добавляем фильтры, если они присутствуют
    if (filter.artist_id) {
      params.append("artist_id", filter.artist_id.toString());
    }
    if (filter.title) {
      params.append("title", filter.title);
    }

    // Выполняем запрос с параметрами
    return $api.get<any>(`publications/search?${params.toString()}`);
  }

  static async getPublicationById(id: number): Promise<AxiosResponse<any>> {
    return $api
      .get<any>(`publications/search?id=${id}`)
      .then((response) => response);
  }

  static async updatePublication(data: any): Promise<AxiosResponse<any>> {
    return $api
      .put<any>(`publications/update`, { data })
      .then((response) => response);
  }

  static async deletePublication(id: string): Promise<AxiosResponse<any>> {
    return $api
      .delete<any>(`publications/delete?id=${id}`)
      .then((response) => response);
  }
}
