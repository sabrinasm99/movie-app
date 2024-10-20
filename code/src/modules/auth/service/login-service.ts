import { BaseAPI } from "../../shared/infra/service/base-api";
import { IAuthService } from "./auth-service";

export class LoginService extends BaseAPI {
  constructor(authService: IAuthService) {
    super(authService);
  }

  async requestToken() {
    try {
      const apiKey = this.authService.getApiKey();
      const result = await this.get(
        "/authentication/token/new",
        { api_key: apiKey },
        null
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createSession(requestToken: string) {
    try {
      const apiKey = this.authService.getApiKey();
      const result = await this.post(
        "/authentication/session/new",
        { request_token: requestToken },
        { api_key: apiKey },
        null
      );
      this.authService.setSessionId(result.data.session_id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
