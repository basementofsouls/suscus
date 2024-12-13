export default class OrderService {
  static async getMyPublications(): Promise<AxiosResponse<any>> {
    return $api.get<any>("publications/my").then((response) => response);
  }
}
