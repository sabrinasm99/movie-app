import { BaseAPI } from "../../shared/infra/service/base-api";
import { IAuthService } from "./auth-service";

export class GuestService extends BaseAPI {
  constructor(authService: IAuthService) {
    super(authService);
  }

  async createGuestSession() {
    try {
      const apiKey = this.authService.getApiKey();
      const result = await this.get(
        "/authentication/guest_session/new",
        {
          api_key: apiKey,
        },
        null
      );

      this.authService.setGuestSessionId(result.data.guest_session_id);

      return result.data;
    } catch (error) {
      throw error;
    }
  }
}
