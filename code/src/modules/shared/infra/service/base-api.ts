import axios, { AxiosInstance } from "axios";
import { IAuthService } from "../../../auth/service/auth-service";
import { apiConfig } from "../../../../config/api";

export abstract class BaseAPI {
  protected baseUrl: string;
  private axiosInstance: AxiosInstance | any;
  public authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
    this.baseUrl = apiConfig.baseUrl;
    this.axiosInstance = axios.create({});
  }

  protected get(url: string, params?: any, headers?: any): Promise<any> {
    return this.axiosInstance({
      method: "GET",
      url: `${this.baseUrl}${url}`,
      params: params ? params : null,
      headers: headers ? headers : null,
    });
  }

  protected post(
    url: string,
    data?: any,
    params?: any,
    headers?: any
  ): Promise<any> {
    return this.axiosInstance({
      method: "POST",
      url: `${this.baseUrl}${url}`,
      data: data ? data : null,
      params: params ? params : null,
      headers: headers ? headers : null,
    });
  }

  protected delete(
    url: string,
    data?: any,
    params?: any,
    headers?: any
  ): Promise<any> {
    return this.axiosInstance({
      method: "DELETE",
      url: `${this.baseUrl}${url}`,
      data: data ? data : null,
      params: params ? params : null,
      headers: headers ? headers : null,
    });
  }
}
