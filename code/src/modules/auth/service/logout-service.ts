import { BaseAPI } from "../../shared/infra/service/base-api";
import { IAuthService } from "./auth-service";

export class LogoutService extends BaseAPI {
  constructor(authService: IAuthService) {
    super(authService);
  }

  async logout() {
    try {
      const apiKey = this.authService.getApiKey();
      const sessionId = this.authService.getSessionId();
      const result = this.delete(
        "/authentication/session",
        null,
        {
          api_key: apiKey,
          session_id: sessionId,
        },
        null
      );
      this.authService.removeSessionId();
      this.authService.removeAccountId();
      this.authService.removeGuestSessionId();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
