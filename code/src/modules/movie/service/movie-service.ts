import { IAuthService } from "../../auth/service/auth-service";
import { BaseAPI } from "../../shared/infra/service/base-api";

export class MovieService extends BaseAPI {
  constructor(authService: IAuthService) {
    super(authService);
  }

  async getPopularMovies(page: number) {
    try {
      const apiKey = this.authService.getApiKey();
      const result = await this.get(
        "/movie/popular",
        { api_key: apiKey, page },
        null
      );
      return result.data.results;
    } catch (error) {
      throw error;
    }
  }

  async getNowPlayingMovies() {
    try {
      const apiKey = this.authService.getApiKey();
      const result = await this.get(
        "/movie/now_playing",
        { api_key: apiKey },
        null
      );
      return result.data.results;
    } catch (error) {
      throw error;
    }
  }
}
