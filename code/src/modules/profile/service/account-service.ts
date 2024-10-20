import { IAuthService } from "../../auth/service/auth-service";
import { BaseAPI } from "../../shared/infra/service/base-api";

export class AccountService extends BaseAPI {
  constructor(authService: IAuthService) {
    super(authService);
  }

  async getAccountDetails() {
    try {
      const apiKey = this.authService.getApiKey();
      const sessionId = this.authService.getSessionId();

      if (!sessionId) {
        throw new Error("Session ID doesn't exist");
      }
      const result = await this.get(
        "/account",
        { api_key: apiKey, session_id: sessionId },
        null
      );

      const accountId = this.authService.getAccountId();
      if (!accountId) {
        this.authService.setAccountId(result.data.id); // set to localstorage
      }

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async getFavoriteMovies() {
    try {
      const apiKey = this.authService.getApiKey();
      const sessionId = this.authService.getSessionId();
      const accountId = this.authService.getAccountId();

      if (!sessionId) {
        return null;
      }

      if (!accountId) {
        return null;
      }

      const result = await this.get(
        `/account/${accountId}/favorite/movies`,
        {
          api_key: apiKey,
          session_id: sessionId,
        },
        null
      );

      return result.data.results;
    } catch (error) {
      throw error;
    }
  }

  async addFavorite(movieId: number) {
    try {
      const apiKey = this.authService.getApiKey();
      const sessionId = this.authService.getSessionId();
      const accountId = this.authService.getAccountId();

      if (!sessionId) {
        throw new Error("Session ID doesn't exist");
      }

      if (!accountId) {
        throw new Error("Account ID doesn't exist");
      }

      const result = await this.post(
        `/account/${accountId}/favorite`,
        {
          media_type: "movie",
          media_id: movieId,
          favorite: true,
        },
        {
          api_key: apiKey,
          session_id: sessionId,
        },
        null
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  async removeFavorite(movieId: number) {
    try {
      const apiKey = this.authService.getApiKey();
      const sessionId = this.authService.getSessionId();
      const accountId = this.authService.getAccountId();

      if (!sessionId) {
        throw new Error("Session ID doesn't exist");
      }

      if (!accountId) {
        throw new Error("Account ID doesn't exist");
      }

      const result = await this.post(
        `/account/${accountId}/favorite`,
        {
          media_type: "movie",
          media_id: movieId,
          favorite: false,
        },
        {
          api_key: apiKey,
          session_id: sessionId,
        },
        null
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
}
